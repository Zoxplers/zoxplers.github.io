/*Made by Zoxplers*/

//URL Parse
listMode = false;
showHidden = false;
URLParams = document.URL.includes("?") ? document.URL.substring(document.URL.indexOf("?")+1).replaceAll("?","&").split("&") : [];
URLParams.forEach(function(i)
{
    if(i.toLowerCase() === "list=true" || i.toLowerCase() === "list")
    {
        listMode = true;
    }
    else if(i.toLowerCase() === "showhidden=true" || i.toLowerCase() === "showhidden")
    {
        showHidden = true;
    }
});
//URL Parse End

//LoadMonth
calendarDB = "https://script.google.com/macros/s/AKfycbw0SksuJ1su75zfo7DLwwmdYiqK2k1l318_BYcSK4VaUprqAsPQdxAEqpjYVBp2vCUp/exec?"+document.URL.substring(document.URL.indexOf('?')+1);
currentDate = new Date();
data = [[],[],[],[],[],[],[],[],[],[],[],[]];

function loadMonth(year, month)
{
    currentDay = new Date(year, month);
    document.getElementById("background").innerHTML = document.getElementsByTagName("temp")[0].innerHTML;
    document.getElementsByClassName("titlerow")[0].firstElementChild.innerHTML = currentDay.toLocaleString("default", { month: "long" }) + " " + year;
    document.getElementById("foreground").innerHTML = document.getElementById("background").innerHTML;
    document.getElementsByClassName("titlerow")[1].innerHTML = "<prevmonthbutton onclick=\"loadMonth("+(month < 1 ? year-1 : year)+","+(month < 1 ? 11 : month-1)+")\"><<</prevmonthbutton>" + document.getElementsByClassName("titlerow")[1].innerHTML + "<nextmonthbutton onclick=\"loadMonth("+(month > 10 ? year+1 : year)+","+(month > 10 ? 0 : month+1)+")\">>></nextmonthbutton>";
    document.getElementsByClassName("titlerow")[1].children[1].setAttribute("colspan", "5");
    currentDay.setDate(currentDay.getDate() - currentDay.getDay());
    gray = true;
    bg = "";
    fg = "";

    Array.from(document.getElementsByClassName("hidden")).forEach(hiddenElem => {
        hiddenElem.classList.remove("hidden");
    });
    
    for(week = 0; week < 6; week++)
    {
        fg += "<tr>";
        bg += "<tr>";
        for(day = 0; day < 7; day++)
        {
            hasBday = 0;

            if(currentDay.getDate() == 1)
            {
                gray = !gray;
            }
            fg += gray ? "<td current=\"0\" style=\"color: rgb(180, 180, 180); text-shadow: 0 0 2px rgb(80, 80, 80)\">" : "<td>";
            bg += "<td>";

            fg += currentDay.getDate();

            if(!gray && currentDay.getDate() == (new Date()).getDate() && month == (new Date()).getMonth())
            {
                temp = fg.toLowerCase().lastIndexOf("<td");
                fg = fg.slice(0, temp) + fg.slice(temp).replace(new RegExp("<td", 'i'), "<td style=\"background: rgba(255,255,255,0.125);\"");
            }

            data[month].forEach(birthday => {
                if(!gray && birthday[2].split('-')[2].substring(0,2) == currentDay.getDate() && (birthday[7] >= 0 || (birthday[7] < 0 && showHidden)))
                {
                    bg += hasBday > 0 ? "<text class=\"hidden\">" : "<text>";
                    bg += birthday[1] + "<br/>";
                    bg += "</text>";
                    hasBday++;
                }
            });
            if(hasBday > 1)
            {
                code = String(month+1).padStart(2, "0") + String(currentDay.getDate()).padStart(2, "0");
                temp = bg.toLowerCase().lastIndexOf("<td");
                bg = bg.slice(0, temp) + bg.slice(temp).replace(new RegExp("<td", 'i'), "<td class=\"" + code + "\"style=\"box-shadow: inset 0 0 7px 3px white; cursor: pointer;\"");
                temp = fg.toLowerCase().lastIndexOf("<td");
                fg = fg.slice(0, temp) + fg.slice(temp).replace(new RegExp("<td", 'i'), "<td onhover=\"\" onclick=\"changeEvent(this)\" class=\"click " + code + "\"");
            }

            currentDay.setDate(currentDay.getDate() + 1);
            fg += "</td>";
            bg += "</td>";
        }
        fg += "</tr>";
        bg += "</tr>";
    }
    
    document.getElementById("background").getElementsByTagName("tbody")[0].innerHTML = bg;
    document.getElementById("foreground").getElementsByTagName("tbody")[0].innerHTML = fg;
    if(listMode)
    {
        toggleListMode();
    }
}
//LoadMonth End

//Database
fetch(calendarDB).then(response => {
    response.json().then(rawData => {
        if(rawData[0] != null)
        {
            rawData.forEach(sheet => {
                sheet[1].forEach(birthday => {
                    if(Number.isInteger(birthday[7]))
                    {
                        data[parseInt(birthday[2].substring(5,7))-1].push(birthday);
                    }
                });
                
                loadMonth(currentDate.getFullYear(), currentDate.getMonth());
            });
        }
    });
});
//Database End

//ToggleListMode
function toggleListMode()
{
    document.getElementById("background").innerHTML = "";
    document.getElementById("foreground").innerHTML = "<br/>List Mode<br/><br/>Event Name, Date, Age, First Name, Middle Name, Last Name, Generation<br/>";
    data.forEach(month => {
        month.forEach(birthday => {
            document.getElementById("foreground").innerHTML += birthday[1] + ", " + birthday[2].split("-")[1] + "/" + birthday[2].split("-")[2].substring(0,2) + "/" + parseInt(birthday[2]) + ", " + birthday[3].toFixed(2) + ", " + birthday[4] + ", " + birthday[5] + ", " + birthday[6] + ", " + birthday[7] + "<br/>";
        });
    });
}
//ToggleListMode End

//ChangeEvent
function changeEvent(element)
{
    Array.from(document.getElementsByClassName(element.className.slice(-4))).forEach(td => {
        if(td != element)
        {
            node = td.firstElementChild;
            while(node != null && (node.classList.contains("hidden") || node.tagName.toLowerCase() != "text"))
            {
                node = node.nextElementSibling;
            }
            node = node.nextElementSibling;
            if(node == null)
            {
                node = td.firstElementChild;
            }
            console.log(node);
            Array.from(td.children).forEach(child => {
                child.classList.add("hidden");
            });
            node.classList.remove("hidden");
        }
    });
}
//ChangeEvent End