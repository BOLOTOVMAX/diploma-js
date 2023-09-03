let tickets = JSON.parse(sessionStorage.getItem(sessionStorage.getItem("data-seance-id")));
let infoWrapper   = document.getElementsByClassName("ticket__info-wrapper")[0];
infoWrapper.getElementsByClassName("ticket__details ticket__title")[0].textContent = tickets.currentBuy["data-film-name"];

let seatTickets = infoWrapper.getElementsByClassName("ticket__details ticket__chairs")[0];
seatTickets.textContent = "";
Object.keys(tickets.currentBuy["chair"]).forEach((row,index) => {
    tickets.currentBuy["chair"][row].forEach((place,index) => {
        seatTickets.textContent += `${row}/${place}`;
        if(tickets.currentBuy["chair"][row].length - 1 > index){
            seatTickets.textContent += ", ";
        }  
    })
    if(Object.keys(tickets.currentBuy["chair"]).length - 1 > index){
        seatTickets.textContent += ", ";
    }
})
infoWrapper.getElementsByClassName("ticket__details ticket__hall")[0].textContent = tickets.currentBuy["data-hall-name"].substr(tickets.currentBuy["data-hall-name"].length - 1);
infoWrapper.getElementsByClassName("ticket__details ticket__start")[0].textContent = tickets.currentBuy["data-seance-time"];
infoWrapper.getElementsByClassName("ticket__details ticket__cost")[0].textContent = tickets.currentBuy["cost"];

document.getElementsByClassName("acceptin-button")[0].addEventListener("mouseenter",function () {
    this.style.cursor = "pointer";
})