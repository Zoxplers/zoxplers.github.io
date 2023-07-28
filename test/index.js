/*Made by Zoxplers - zoxplers.com*/
Array.from(document.getElementsByTagName("pages")[0].children).forEach(page =>{
    //Navmenu items
    let button = document.createElement("navitem");
    button.innerHTML = "<span class = \"material-symbols-rounded\">" + page.getAttribute("icon") + "</span><text>" + page.getAttribute("name") + "</text>";
    document.getElementsByTagName("navmenu")[0].appendChild(button);
});