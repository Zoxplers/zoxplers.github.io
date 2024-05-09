/*Made by Zoxplers*/

calendarDB = "https://script.google.com/macros/s/AKfycbw0SksuJ1su75zfo7DLwwmdYiqK2k1l318_BYcSK4VaUprqAsPQdxAEqpjYVBp2vCUp/exec";
currentDate = new Date();
data = [[],[],[],[],[],[],[],[],[],[],[],[]];

//LoadMonth

function loadMonth(year, month)
{
    currentDay = new Date(year, month);
    document.getElementsByClassName("titlerow")[0].firstElementChild.innerHTML = currentDay.toLocaleString("default", { month: "long" }) + " " + year;
    document.getElementById("background").innerHTML = document.getElementsByTagName("temp")[0].innerHTML;
    document.getElementById("foreground").innerHTML = document.getElementsByTagName("temp")[0].innerHTML;
    currentDay.setDate(currentDay.getDate() - currentDay.getDay());
    gray = true;
    bg = "";
    fg = "";
    
    for(week = 0; week < 6; week++)
    {
        fg += "<tr>";
        bg += "<tr>";
        for(day = 0; day < 7; day++)
        {
            if(currentDay.getDate() == 1)
            {
                gray = !gray;
            }
            fg += gray ? "<td style=\"color: rgb(222, 222, 222); text-shadow: 0 0 2px rgb(160, 160, 160)\">" : "<td>";
            bg += "<td> ";

            fg += currentDay.getDate();
            data[month].forEach(birthday => {
                if(!gray && birthday[3].split('-')[2].substring(0,2) == currentDay.getDate())
                {
                    bg += birthday[1] + "<br/>";
                }
            });

            currentDay.setDate(currentDay.getDate() + 1);
            fg += "</td>";
            bg += "</td>";
        }
        fg += "</tr>";
        bg += "</tr>";
    }
    
    document.getElementById("background").getElementsByTagName("tbody")[0].innerHTML = bg;
    document.getElementById("foreground").getElementsByTagName("tbody")[0].innerHTML = fg;
}

//LoadMonth End

//Database

fetch(calendarDB).then(response => {
    response.json().then(rawData => {
        rawData[0][1].forEach(birthday => {
            if(Number.isInteger(birthday[2]))
            {
                data[parseInt(birthday[3].substring(5,7))-1].push(birthday);
            }
        });
        
        loadMonth(currentDate.getFullYear(), currentDate.getMonth());
        Array.from(document.getElementsByClassName("hidden")).forEach(hiddenElem => {
            hiddenElem.classList.remove("hidden");
        });
    });
});

//Database End