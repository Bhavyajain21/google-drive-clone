var theme = document.getElementById("theme");
var icon = document.getElementById("icon");

theme.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.style.backgroundImage = url(moon.png);
    }else{
        icon.style.backgroundImage = url(sun.png);
    }
}