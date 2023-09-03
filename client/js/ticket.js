let wrapTicket = document.getElementsByClassName("ticket__info-wrapper")[0];

let tickets = JSON.parse(sessionStorage.getItem(sessionStorage.getItem("data-seance-id")));
wrapTicket.getElementsByClassName("ticket__details ticket__title")[0].textContent = tickets.currentBuy["data-film-name"];

let ticketChairs = wrapTicket .getElementsByClassName("ticket__details ticket__chairs")[0];
ticketChairs.textContent = "";
Object.keys(tickets.currentBuy["chair"]).forEach((row,index) => {
    tickets.currentBuy["chair"][row].forEach((place,index) => {
        ticketChairs.textContent += `${row}/${place}`;
        if(tickets.currentBuy["chair"][row].length - 1 > index){
            ticketChairs.textContent += ", ";
        }  
    })
    if(Object.keys(tickets.currentBuy["chair"]).length - 1 > index){
        ticketChairs.textContent += ", ";
    }
})
wrapTicket.getElementsByClassName("ticket__details ticket__hall")[0].textContent = tickets.currentBuy["data-hall-name"].substr(tickets.currentBuy["data-hall-name"].length - 1);
wrapTicket.getElementsByClassName("ticket__details ticket__start")[0].textContent = tickets.currentBuy["data-seance-time"];


let childElement = wrapTicket.children[3];

let div = document.createElement("div");

document.getElementsByClassName("ticket__info-qr")[0].remove(); ;

let sheetQr = `Фильм: ${tickets.currentBuy["data-film-name"]}\nРяд/Место: ${ticketChairs.textContent}\nЗал: ${tickets.currentBuy["data-hall-name"].substr(tickets.currentBuy["data-hall-name"].length - 1)}\nНачало: ${tickets.currentBuy["data-seance-time"]}`;
JSON.stringify(sheetQr);

let qr = QRCreator(sheetQr,
{ mode: 4,
  eccl: 0,
  version: 8,
  mask: 3,
  image: 'png',
  modsize: 4,
  margin: 0
});
const content = (qrcode) =>{
  return qrcode.error ?
    `недопустимые исходные данные ${qrcode.error}`:
    qrcode.result;
};
div.classList.add("ticket__info-qr");
let qrCanvas = content(qr);
qrCanvas.style.padding = "5px";
qrCanvas.style.background = "white";
div.appendChild(qrCanvas);
wrapTicket.insertBefore(div, childElement.nextSibling);
