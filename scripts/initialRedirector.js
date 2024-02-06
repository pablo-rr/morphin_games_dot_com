window.onload = () => {
    if(navigator.language.split("-")[0].toLowerCase() == "es"){
        window.open("es/index", "_self");
    } else {
        window.open("en/index", "_self");
    }
}