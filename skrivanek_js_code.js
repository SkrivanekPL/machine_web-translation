// Tablica obiektów językowych
var langs = [{
        "flag": "en",
        "img": "https://skrivanek.pl/skrivanek-static/translator-bar/flags/gb.svg",
        "name": "English",
        "alt": "English"
    }, {
        "flag": "de",
        "img": "https://skrivanek.pl/skrivanek-static/translator-bar/flags/de.svg",
        "name": "Deutsch",
        "alt": "German"
    }, {
        "flag": "pl",
        "img": "https://skrivanek.pl/skrivanek-static/translator-bar/flags/pl.svg",
        "name": "Polski",
        "alt": "Polish"
    }, {
        "flag": "fr",
        "img": "https://skrivanek.pl/skrivanek-static/translator-bar/flags/fr.svg",
        "name": "Français",
        "alt": "French"
    }, {
        "flag": "ua",
        "img": "https://skrivanek.pl/skrivanek-static/translator-bar/flags/ua.svg",
        "name": "українська",
        "alt": "Ukrainian"
    }, {
        "flag": "ru",
        "img": "https://skrivanek.pl/skrivanek-static/translator-bar/flags/ru.svg",
        "name": "русский",
        "alt": "Russian"
    }
];

// Tablica zawierająca dostępne kody języków.
var dostepneJezyki = ["en", "de", "pl", "fr", "ua", "ru"];
var domyslnyJezyk = "pl";
var dostawca = "google"; // bing usunięty
var trMenuPosition = "right"; // pozycja paska wyboru języka
var SkrivanekLnk = 1; // Czy wyświetlać nasz link 1 = tak, 0 = nie

// Poniżej nie zmieniać wartości (składnia wyrażenia)
var translator = {
    google: {
        url: "https://translate.google.com/translate?&sl=auto",
        to: "&tl=",
        website: "&u=",
        pageLang: '&hl=',
        iframeParent: 'https://translate.googleusercontent.com'
    }
}
//console.log("dostawca, domyslnyJezyk, dostepneJezyki, langs", dostawca, domyslnyJezyk, dostepneJezyki, langs);
var firstRun = 1;
var pageLang = domyslnyJezyk;
domyslnyJezyk = domyslnyJezyk ? domyslnyJezyk : document.documentElement.lang.split("-")[0];
if (inIframe() && window.location.href.indexOf(translator[dostawca].iframeParent) > -1) {
    domyslnyJezyk = document.documentElement.lang.split("-")[0];
    // console.log('domyslnyJezyk', domyslnyJezyk);
};

//console.log(domyslnyJezyk);
var domyslnyJezykMore;
langs.forEach(function (item) {
    if (item.flag == domyslnyJezyk) {
        domyslnyJezykMore = item;
    }
});
SkrivanekLnk = SkrivanekLnk ? '<div class="utworz-jezyk"><a href="https://skrivanek.pl/" target="_blank" style="color: white;">Biuro Tłumaczeń Skrivanek</a></div>' : ''; // odnośnik // klasa 'utworz-jezyk' do CSS
var btn1 = '<div class="translate_wrapper ' + trMenuPosition + '"> <div class="translate_wrapper1 " id="trans-btn"> <div class="more_lang" id="trans-btn-more"> </div> <div onclick="showLangs()" class="current_lang"><div class="lang"> <img src="' + domyslnyJezykMore.img + '"> <span class="lang-txt">' + domyslnyJezykMore.flag + '</span><div class="lang-arrow"></div></div> </div> </div>' + SkrivanekLnk + '</div>';

document.addEventListener("DOMContentLoaded", function () {
    // Utwórz i dodaj przycisk wyboru języka oraz link do Skrivanek.
    var elem = document.createElement('div');
    elem.innerHTML = btn1;
    var myElem = document.getElementById('skrivanek-test');
    if (myElem !== null) {
        elem.setAttribute("id", "skrivanek-test-btn");
        var referenceNode = document.querySelector('#skrivanek-test');
        referenceNode.parentNode.insertBefore(elem, referenceNode.nextSibling);
    } else {
        document.body.appendChild(elem);
    }
});

// Funkcja do przełączania widoczności menu wyboru języka.
function showLangs() {
    if (firstRun == 1) {
        createLangs();
        firstRun = 0;
    }
    var element = document.getElementById("trans-btn");
    var element_more = document.getElementById("trans-btn-more");
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        element_more.classList.remove("active");
    } else {
        element.classList.add("active");
        setTimeout(function () {
            element_more.classList.add("active");
        }, 5);
    }
}

// console.log('domyslnyJezyk', domyslnyJezyk);
// Funkcja do tworzenia opcji językowych w menu wyboru.
function createLangs() {
    var currentUrl = window.location.href;
    // console.log('inIframe() && window.location.href.indexOf(translator[dostawca].iframeParent) > -1', inIframe() && window.location.href.indexOf(translator[dostawca].iframeParent) > -1, window.location.href);
    if (inIframe() && window.location.href.indexOf(translator[dostawca].iframeParent) > -1) {
        currentUrl = document.getElementsByTagName('iframe')[0].baseURI;
    };
    var diver = document.createElement("div");
    diver.innerHTML = '';
    var engine = translator[dostawca];
    langs.forEach(function (item) {
        if (dostepneJezyki.indexOf(item.flag) !== -1) {
            //console.log(domyslnyJezyk == item.flag, domyslnyJezyk, item.flag)
            if (domyslnyJezyk == item.flag)
                item.className = 'selected';
            var url = pageLang !== item.flag ? (engine.url + engine.to + item.flag + engine.pageLang + item.flag + engine.website + currentUrl) : currentUrl;
            diver.innerHTML += '<a href="' + url + '"  target="_top" class="lang ' + item.className + '" data-value="' + item.flag + '"> <img src="' + item.img + '" alt="' + item.alt + '"> <span class="lang-txt">' + item.name + '</span> </a>';
        }
    });
    document.getElementById("trans-btn-more").appendChild(diver);
}

// Funkcja do sprawdzania, czy skrypt jest uruchomiony wewnątrz elementu Iframe.
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}