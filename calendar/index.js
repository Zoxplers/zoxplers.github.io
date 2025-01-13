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
let database = [[],[],[],[],[],[],[],[],[],[],[],[]];


function CalendarEvent(eventName, eventMonth, eventDay, eventYear, firstName, middleName, lastName, age, category)
{
    this.eventName = eventName;
    this.eventMonth = eventMonth;
    this.eventDay = eventDay;
    this.eventYear = eventYear;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.age = age;
    this.category = category;
}

fetch(calendarDB).then(response => {
    response.json().then(data => {
        if(data[0] != null)
        {
            data.forEach(sheet => {
                sheet[1].forEach(calendarEvent => {
                    if(Number.isInteger(calendarEvent[7]))
                    {
                        let date = calendarEvent[2];
                        let year = date.substring(0,date.indexOf("-"));
                        date = date.slice(date.indexOf("-")+1);
                        let month = date.substring(0,date.indexOf("-"));
                        date = date.slice(date.indexOf("-")+1);
                        let day = date.substring(0,date.indexOf("T"));
                        database[parseInt(month)-1].push(new CalendarEvent(calendarEvent[1], month, day, year, calendarEvent[4], calendarEvent[5], calendarEvent[6], calendarEvent[3], sheet[0]));
                    }
                })
            })
        }
        database = sortDatabase();
        console.log(database);
        loadMonth(currentDate);
    });
});

function sortDatabase()
{
    let tempDatabase = [[],[],[],[],[],[],[],[],[],[],[],[]];
    for(let i = 0; i < tempDatabase.length; i++)
    {
        database[i].forEach(calendarEvent => {
            if(tempDatabase[i].length == 0 || parseInt(calendarEvent.eventDay) <= parseInt(tempDatabase[i][0].eventDay))
            {
                tempDatabase[i].unshift(calendarEvent);
            }
            else
            {
                tempDatabase[i].splice(((function() {
                    for(let j = 0; j < tempDatabase[i].length; j++)
                    {
                        if(tempDatabase[i][j].eventDay > calendarEvent.eventDay)
                        {
                            return j;
                        }
                    }
                    return tempDatabase[i].length;
                })()),0,calendarEvent);
            }
        });
    }
    return tempDatabase;
}
// Data Handling End

// Load Month
let currentDate = new Date();

function loadMonth(date)
{
    document.getElementsByTagName("calendar")[0].getElementsByTagName("th")[1].innerHTML = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    document.getElementsByTagName("calendar")[0].getElementsByTagName("tbody")[0].innerHTML = ``;
    let currentDay = new Date(date.getFullYear(), date.getMonth());
    currentDay.setDate(currentDay.getDate() - currentDay.getDay());
    let monthStarted = currentDay.getDate() == 1 ? true : false;
    for(let i = 0; i < 6; i++)
    {
        let weekHtml = `<tr>`;
        for(let j = 0; j < 7; j++)
        {
            weekHtml += `<td name="${monthStarted ? currentDay.getDate() : ""}" style="color: ${monthStarted ? "white" : "rgb(120,120,120)"};">
                <div>${currentDay.getDate()}</div>
            </td>`;
            currentDay.setDate(currentDay.getDate() + 1);
            if(currentDay.getDate() == 1)
            {
                monthStarted = !monthStarted;
            }
        }
        weekHtml += `</tr>`;
        document.getElementsByTagName("calendar")[0].getElementsByTagName("tbody")[0].innerHTML += weekHtml;
    }
    
    foreground.innerHTML = background.innerHTML;

    let monthdata = database[date.getMonth()];
    Array.from(background.getElementsByTagName("td")).forEach(backgroundtd => {
        backgroundtd.innerHTML = "";
        if(backgroundtd.style.color == "white")
        {
            monthdata.forEach(calendarEvent => {
                if(parseInt(calendarEvent.eventDay) == backgroundtd.getAttribute("name"))
                {
                    backgroundtd.innerHTML += `<div>${calendarEvent.eventName}</div>`;
                }
                Array.from(foreground.getElementsByTagName("td")).forEach(foregroundtd => {
                    if(foregroundtd.style.color == "white" && foregroundtd.getAttribute("name") == parseInt(calendarEvent.eventDay))
                    {
                        foregroundtd.style.cursor = "pointer";
                        foregroundtd.onclick = function() {
                            loadEvent(getEvent(parseInt(calendarEvent.eventDay)));
                        }
                    }
                });
            });
            Array.from(backgroundtd.getElementsByTagName("div")).forEach(div => {
                div.classList.add("hidden");
            });
            if(backgroundtd.getElementsByTagName("div")[0])
            {
                backgroundtd.getElementsByTagName("div")[0].classList.remove("hidden");
            }
        }
    });

    if(date.getMonth() == (new Date()).getMonth())
    {
        Array.from(foreground.getElementsByTagName("td")).forEach(foregroundtd => {
            if(parseInt(foregroundtd.getElementsByTagName("div")[0].innerHTML) == (new Date()).getDate() && foregroundtd.style.color == "white")
            {
                foregroundtd.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }
        })
        loadUpcoming();
    }
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
document.getElementsByTagName("upcominginfo")[1].innerHTML = "Loading upcoming info...";
// Load Month End

// Get Event
function getEvent(day)
{
    let event;
    let currentdiv;
    Array.from(foreground.getElementsByTagName("td")).forEach(foregroundtd => {
        if(foregroundtd.style.color == "white" && foregroundtd.getAttribute("name") == parseInt(day))
        {
            Array.from(background.getElementsByTagName("td")).forEach(backgroundtd => {
                if(backgroundtd.style.color == "white" && backgroundtd.getAttribute("name") == parseInt(day))
                {
                    Array.from(backgroundtd.getElementsByTagName("div")).forEach(div => {
                        if(!div.classList.contains("hidden"))
                        {
                            database[currentDate.getMonth()].forEach(e => {
                                if(e.eventName == div.innerText)
                                {
                                    event = e;
                                    currentdiv = div;
                                }
                            })
                        }
                    })
                }
            });
        }
    });

    Array.from(currentdiv.parentElement.children).forEach(div => {
        if(!div.classList.contains("hidden"))
        {
            div.classList.add("hidden");
        }
    })

    if(currentdiv.nextElementSibling)
    {
        currentdiv.nextElementSibling.classList.remove("hidden");
    }
    else
    {
        currentdiv.parentElement.firstElementChild.classList.remove("hidden");
    }
    return event;
}
// Get Event End

// Load Event
function loadEvent(event)
{
    if(event != null)
    {
        document.getElementsByTagName("eventinfo")[0].innerHTML = `
        <p>Event: ${event.eventName}</p>
        <p>Date: ${event.eventMonth}/${event.eventDay}/${event.eventYear}</p>
        <p>First Name: ${event.firstName}</p>
        <p>Middle Name: ${event.middleName}</p>
        <p>Last Name: ${event.lastName}</p>
        <p>Age: ${event.age.toString().slice(0,5)}</p>
        <p>Category: ${event.category}</p>`;
    }
    document.getElementsByTagName("eventinfo")[1].innerHTML = document.getElementsByTagName("eventinfo")[0].innerHTML;
}
// Load Event End

// Upcoming
function loadUpcoming()
{
    document.getElementsByTagName("upcominginfo")[0].innerHTML = "";
    Array.from(document.getElementsByTagName("td")).forEach(td => {
        if(td.style.backgroundColor == "rgba(255, 255, 255, 0.1)")
        {
            let i = 6;
            database[(new Date()).getMonth()].forEach(event => {
                if(i > 0 && event.eventDay >= (new Date()).getDate())
                {
                    document.getElementsByTagName("upcominginfo")[0].innerHTML += `<p>${event.eventName} - ${event.eventMonth}/${event.eventDay}</p>`;
                    i--;
                }
            });
            if(i > 0)
            {
                database[(new Date()).getMonth() + 1 == database.length ? 0 : (new Date()).getMonth() + 1].forEach(event => {
                    if(i > 0)
                    {
                        document.getElementsByTagName("upcominginfo")[0].innerHTML += `<p>${event.eventName} - ${event.eventMonth}/${event.eventDay}</p>`;  
                        i--;
                    }
                });
            }
        }
    })
    document.getElementsByTagName("upcominginfo")[1].innerHTML = document.getElementsByTagName("upcominginfo")[0].innerHTML;
}
// Upcoming End