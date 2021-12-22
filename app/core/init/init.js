// Translate Website to user browser language
if(localStorage.getItem("lang")){
    APP.UI.translateTo(localStorage.getItem("lang"));
}
else{
    APP.UI.translateTo(navigator.language.split("-")[0]);
}

document.body.style.visibility = "visible";