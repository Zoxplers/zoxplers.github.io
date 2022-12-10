/*Made by Matthew Amurao*/

//Change all id to tagname patch
document.body.querySelectorAll('*').forEach(function(node) {
    node.id = node.tagName.toLowerCase();
});

subheaders = ["omgitsasubheader","verycoolsubheader","subheadergoeshere","justanotherpersonalsite"];
page = 0;
lockHeading = true;

if(lockHeading)
{
    document.body.insertBefore(document.getElementById("heading"), document.getElementById("main"));
    document.body.insertBefore(document.getElementById("navbar"), document.getElementById("main"));
}

document.getElementById("heading2").innerHTML = subheaders[Math.floor(Math.random() * subheaders.length)]
Array.from(document.getElementById("pages").children).forEach(element => {
    element.innerHTML = element.innerHTML.replace("\\n", "<br />");
    page = document.createElement("a");
    page.onclick = function(){pageSelect(Array.from(document.getElementById("navbar").children).indexOf(this))};
    page.innerHTML = "<span style = 'padding: initial' class = 'material-symbols-rounded'>" + element.getAttribute("icon") + "</span> " + element.getAttribute("name");
    document.getElementById("navbar").appendChild(page);
});

function pageSelect(page)
{
    Array.from(document.getElementById("navbar").children).forEach(element => {
        element.style.backgroundColor = "initial";
    });
    Array.from(document.getElementById("pages").children).forEach(element => {
        element.style.display = "none";
    });
    document.getElementById("pages").children.item(page).style.display = "initial";
    document.getElementById("navbar").children.item(page).style.backgroundColor = "var(--minjudarkT)";
}

pageSelect(page);
