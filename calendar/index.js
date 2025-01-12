// /*Made by Zoxplers*/

// URL Parse
let listMode = false;
let showHidden = false;
let URLParams = document.URL.includes("?") ? document.URL.substring(document.URL.indexOf("?")+1).replaceAll("?","&").split("&") : [];
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
// URL Parse End

// Data Handling
let calendarDB = "https://script.google.com/macros/s/AKfycbw0SksuJ1su75zfo7DLwwmdYiqK2k1l318_BYcSK4VaUprqAsPQdxAEqpjYVBp2vCUp/exec?"+document.URL.substring(document.URL.indexOf('?')+1);
let data = [[],[],[],[],[],[],[],[],[],[],[],[]];

fetch(calendarDB).then(response => {
    response.json().then(data => {
        if(data[0] != null)
        {
            console.log(data)
            // rawData.forEach(sheet => {
            //     sheet[1].forEach(birthday => {
            //         if(Number.isInteger(birthday[7]))
            //         {
            //             data[parseInt(birthday[2].substring(5,7))-1].push(birthday);
            //         }
            //     });
            // });
        }
    });
});
// Data Handling End

// Load Month
let currentDate = new Date();

function loadMonth(date)
{
    document.getElementsByTagName("calendar")[0].getElementsByTagName("th")[1].innerHTML = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    document.getElementsByTagName("calendar")[0].getElementsByTagName("tbody")[0].innerHTML = ``;
    let currentDay = new Date(date.getFullYear(), date.getMonth());
    currentDay.setDate(currentDay.getDate() - currentDay.getDay());
    for(let i = 0; i < 6; i++)
    {
        let weekHtml = `<tr>`;
        for(let j = 0; j < 7; j++)
        {
            weekHtml += `<td>${currentDay.getDate()}</td>`;
            currentDay.setDate(currentDay.getDate() + 1);
        }
        weekHtml += `</tr>`;
        document.getElementsByTagName("calendar")[0].getElementsByTagName("tbody")[0].innerHTML += weekHtml;
    }
    document.getElementById("foreground").innerHTML = document.getElementById("background").innerHTML;

}

function prevMonth()
{
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadMonth(currentDate);
}

function nextMonth()
{
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadMonth(currentDate);
}

function prevYear()
{
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    loadMonth(currentDate);
}

function nextYear()
{
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    loadMonth(currentDate);
}

loadMonth(currentDate);
// Load Month End