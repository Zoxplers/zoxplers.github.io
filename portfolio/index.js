let colorsContent;

function setColor(element, colorTag)
{
    try
    {
        element.style.setProperty("--r", colorsContent["colors"][colorTag][0]);
        element.style.setProperty("--g", colorsContent["colors"][colorTag][1]);
        element.style.setProperty("--b", colorsContent["colors"][colorTag][2]);
    }
    catch(err)
    {
        console.log(`Color not found for ${element.tagName}: ${colorTag}`)
        element.style.setProperty("--r", 255);
        element.style.setProperty("--g", 255);
        element.style.setProperty("--b", 255);
    }
}

async function loadPortfolio()
{
    await fetch("colors.json").then(response => {
        if(response.ok)
        {
            response.json().then(content => {
                colorsContent = content;
            });
        }
    });

    fetch("skills.json").then(response => {
        if(response.ok)
        {
            response.json().then(content => {
                // console.log(content);
                Object.keys(content["skills"]).forEach(key => {
                    let skillset = document.getElementById(key).getElementsByTagName("skillset")[0];
                    content["skills"][key].forEach(skillsetData => {
                        let skillsetName = Object.keys(skillsetData)[0];
                        skillset.innerHTML +=
                        `<div>
                            <label>${skillsetName}</label>
                            <skillitems></skillitems>
                        </div>`;
                        let div = skillset.lastElementChild;
                        skillsetData[skillsetName].forEach(skillitem =>
                        {
                            div.getElementsByTagName("skillitems")[0].innerHTML +=
                            `<skillitem>
                                <imgcontainer>
                                    <img src="${skillitem["localimg"] ? "/assets/portfolio" : "https://simpleicons.org/icons"}/${skillitem["img"]}">
                                </imgcontainer>
                                ${skillitem["text"]}
                            </skillitem>`;
                        })
                        setColor(div, "skillset_"+skillsetName);
                    })
                });
            });
        }
    });

    fetch("projects.json").then(response => {
        if(response.ok)
        {
            response.json().then(content => {
                let projectsElem = document.getElementsByTagName("projects")[0].getElementsByTagName("div")[0];
                content["projects"].forEach(project => {
                    let key = Object.keys(project)[0];
                    projectsElem.innerHTML += `
                    <div>
                        <imgcontainer>
                            <img src="${project[key]["headerimg"]}"/>
                        </imgcontainer>
                        <header>${key}</header>
                        <description>${project[key]["description"]}</description>
                        <languages></languages>
                        <links></links>
                    </div>`;

                    let languagesElem = projectsElem.lastElementChild.getElementsByTagName("languages")[0];
                    project[key]["languages"].forEach(language => {
                        languagesElem.innerHTML += `<span>${language}</span>`;
                        setColor(languagesElem.lastElementChild, "language_"+language);
                    });

                    project[key]["links"].forEach(link => {
                        projectsElem.lastElementChild.getElementsByTagName("links")[0].innerHTML += `<a href="${link["href"]}">${link["label"]}</a>`
                    });
                    console.log(project);
                });
            });
        }
    });
}
loadPortfolio();