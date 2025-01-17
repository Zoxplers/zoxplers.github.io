async function loadPortfolio()
{
    let colorsContent;

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
                                    <img src="${skillitem["localimg"] ? "/assets" : "https://simpleicons.org/icons"}/${skillitem["img"]}">
                                </imgcontainer>
                                ${skillitem["text"]}
                            </skillitem>`;
                        })
                        div.style.setProperty("--r", colorsContent["colors"][skillsetName]["r"]);
                        div.style.setProperty("--g", colorsContent["colors"][skillsetName]["g"]);
                        div.style.setProperty("--b", colorsContent["colors"][skillsetName]["b"]);
                    })
                });
            });
        }
    });
}
loadPortfolio();