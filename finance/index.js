const URL = `https://script.google.com/macros/s/AKfycbyc7-ZCJlP4dXty-sO64NzBePz2M9xkZNRcYzuDtKr7fVXqb_EInTZ1xgcrM5tV_JESGw/exec${window.location.search}`;

fetch(URL)
.then(response => {
    response.json().then(data => {
        data = data[0];
        console.log(data);
        document.getElementsByTagName("main")[1].getElementsByTagName("div")[0].innerHTML = `<div>${data[0]} Account</div>`;
        data[1].forEach(node => {
            document.getElementsByTagName("main")[1].getElementsByTagName("div")[0].innerHTML += `<div class="${isNaN(Number(node)) ? "str" : "num"}">${isNaN(Number(node)) ? node : Math.round(node * 100000)/100000}</div>`;
        });
    });
})