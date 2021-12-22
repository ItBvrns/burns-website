APP.UI = (function(){
    // VARIABLES

        var MENU_IS_OPEN = false;

        var DEFAULT_LANG = "en";
        var SUPPORTED_LANGS = ["es", "en"];

        var headerNav = document.getElementById("header-nav");
        var i18nStrings = document.getElementsByClassName("i18n");

        var modalLanguageSelector = document.getElementById("modal-language-selector");
        var modalDisclaimer = document.getElementById("modal-disclaimer");
        var modalBuy = document.getElementById("modal-buy");

        var maskLevel2 = document.getElementById("mask-level-2");

    // FUNCTIONS

        var translateTo = function(lang){
            if(!SUPPORTED_LANGS.includes(lang)){
                lang = DEFAULT_LANG;
            }
            for(var i=0; i<i18nStrings.length; i++){
                if(i18nStrings[i].dataset["i18n"]){
                    i18nStrings[i].innerText = APP.I18N[i18nStrings[i].dataset["i18n"]][lang];
                }
            }
            localStorage.setItem("lang", lang);
        }

        var openLanguageSelector = function(){
            maskLevel2.classList.add("ib-dark-mask-active");
            modalLanguageSelector.classList.add("ib-modal-active");
        }

        var closeLanguageSelector = function(){
            maskLevel2.classList.remove("ib-dark-mask-active");
            modalLanguageSelector.classList.remove("ib-modal-active");
        }

        var changeLanguage = function(lang){
            translateTo(lang);
            closeLanguageSelector();
        }

        var openDisclaimer = function(){
            fetch("https://raw.githubusercontent.com/ItBvrns/bvrns-website/main/app/data/disclaimer.txt").then(function(response) {
                response.text().then(function(text) {
                    document.getElementById("disclaimer-text").innerText = text;
                });
            });
            maskLevel2.classList.add("ib-dark-mask-active");
            modalDisclaimer.classList.add("ib-modal-active");
        }

        var closeDisclaimer = function(){
            maskLevel2.classList.remove("ib-dark-mask-active");
            modalDisclaimer.classList.remove("ib-modal-active");
        }

        var openMenu = function(){
            MENU_IS_OPEN = true;
            document.getElementById("button-menu-open").style.display = "none";
            document.getElementById("button-menu-close").style.display = "flex";
            document.getElementById("header-nav").style.display = "flex";
        }

        var closeMenu = function(){
            MENU_IS_OPEN = false;
            document.getElementById("button-menu-close").style.display = "none";
            document.getElementById("header-nav").style.display = "";
            document.getElementById("button-menu-open").style.display = "flex";
        }

        var openBuy = function(){
            maskLevel2.classList.add("ib-dark-mask-active");
            modalBuy.classList.add("ib-modal-active");
        }

        var closeBuy = function(){
            modalBuy.classList.remove("ib-modal-active");
            maskLevel2.classList.remove("ib-dark-mask-active");
        }

        var copyContractAddress = function(){
            var contractAddressElem = document.getElementById("contract-address");
            navigator.clipboard.writeText(contractAddressElem.innerText);
            var copiedTooltip = document.getElementById("tooltip-copied");
            copiedTooltip.style.animation = 'none';
            copiedTooltip.offsetHeight;
            copiedTooltip.style.animation = null;
            copiedTooltip.style.animationPlayState = "running";            
        }

    // EVENT LISTENERS

        var navigateTo = function(e){
            if(e.target.dataset["nav"]){
                if(MENU_IS_OPEN){
                    closeMenu();
                }
                document.getElementById(e.target.dataset["nav"]).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            }
        }
        headerNav.addEventListener("click", navigateTo ,false);

    // EXPOSE
    
        return {
            translateTo: translateTo,
            changeLanguage: changeLanguage,
            openLanguageSelector: openLanguageSelector,
            closeLanguageSelector: closeLanguageSelector,
            openDisclaimer: openDisclaimer,
            closeDisclaimer: closeDisclaimer,
            copyContractAddress: copyContractAddress,
            openMenu: openMenu,
            closeMenu: closeMenu,
            openBuy: openBuy,
            closeBuy: closeBuy
        }

})();