//defining our variables
let inches, paperclips,price,demand,sold,unsold,fund,cost,autoclickers,clickerscost;

//getting documents that we will use
const makePaperClips = document.querySelector('.make');
const totalPaperClips = document.querySelector('.allpaps');
const totalInches = document.querySelector('.inches') 
const totalPrice = document.querySelector('.price');
const customDemand = document.querySelector('.demand');
const lowerPrice = document.querySelector('.lower');
const increasePrice = document.querySelector('.increase');
const unsoldPaperClips = document.querySelector('.unsold');
const avaliableFunds = document.querySelector('.avaliable-funds');
const wire = document.querySelector('.wire');
const totalCost = document.querySelector('.cost');
const totalAutoClickers = document.querySelector('.autoclick');
const showClickers = document.querySelector(".show-clickers");
const totalClickersCost = document.querySelector('.clickers-cost');
// Defining our local storage variable to keep the number of the paperclips
if (!localStorage.getItem('paperclips')){
    paperclips = 0;
    localStorage.setItem('paperclips',paperclips);
}
if (!localStorage.getItem('inches')){
    inches = 1000;
    localStorage.setItem('inches',inches);
}
if (!localStorage.getItem('price')){
    price = 0.20;
    localStorage.setItem('price',price);
}
if (!localStorage.getItem('sold')){
    sold = 0;
    localStorage.setItem('sold',sold);
}
if (!localStorage.getItem('fund')){
    fund = 0;
    localStorage.setItem('fund',fund);
}
if (!localStorage.getItem('demand')){
    price = localStorage.getItem('price');
    demand = parseInt(GoodDemand(price));
    localStorage.setItem('demand',demand);
}
if (!localStorage.getItem('cost')){
    cost = 10;
    localStorage.setItem('cost',10);
}
if (!localStorage.getItem('autoclickers')){
    autoclickers = 0;
    localStorage.setItem('autoclickers',autoclickers);
}
if (!localStorage.getItem('clickerscost')){
    clickerscost = 10;
    localStorage.setItem('clickerscost',clickerscost);
}

//our variable after adding to local storage
paperclips = localStorage.getItem('paperclips');
inches = parseInt(localStorage.getItem('inches'));
sold = localStorage.getItem('sold');
price = parseFloat(localStorage.getItem('price'));
demand = localStorage.getItem('demand');
unsold =  (parseInt(localStorage.getItem('paperclips')) - parseInt(localStorage.getItem('sold')))
fund = parseFloat(localStorage.getItem('fund'));
cost = parseInt(localStorage.getItem('cost'));
autoclickers = parseInt(localStorage.getItem('autoclickers'));
clickerscost = parseInt(localStorage.getItem('clickerscost'));

// our html contents
totalPaperClips.innerHTML = "PaperClips" + ": " + String(localStorage.getItem('paperclips'));
totalInches.innerHTML = String(localStorage.getItem('inches')) + ": inches left";
totalPrice.innerHTML = "Price: " + String(price) + "$"; 
customDemand.innerHTML = "Demand: " + String(parseInt(demand)) + "%";
unsoldPaperClips.innerHTML = "Unsold Inverntory: " + String(unsold);
avaliableFunds.innerHTML = "Avaliable Funds: " + String(fund);
totalCost.innerHTML = "Cost: " + String(cost) + "$";
showClickers.innerHTML = autoclickers;
totalClickersCost.innerHTML = "Cost: " + String(clickerscost) + "$";

// A function for calculate our paperclips when we clicked or bought a clicker.
function calculatePaperClips(){
    if (inches > 0){
        paperclips++;
        inches--;
        
        localStorage.setItem('paperclips',paperclips);
        localStorage.setItem('inches',inches);
    
        
        totalPaperClips.innerHTML ='PaperClips' + ": " + String(localStorage.getItem('paperclips'));
        totalInches.innerHTML =String(inches) + ": inches left" ;

        unsold++;
        unsoldPaperClips.innerHTML = "Unsold Inverntory: " + String(unsold);

    }
}

// Autoclickment
function AutoClickment(){
    if (parseInt(autoclickers)>=1){
        calculatePaperClips();
    }
    // we used to setTimeOut function for updating.
    autoclickers = localStorage.getItem('autoclickers');
    setTimeout(AutoClickment,2000/autoclickers);

}
// call back our function.
AutoClickment();

//click event to update our papaerclicps and inches
makePaperClips.addEventListener('click',calculatePaperClips);

//click event to decrease the price and update the demand
lowerPrice.addEventListener('click',()=>{
    if (demand<90){
        price -= 0.01;
        price = price.toFixed(2)
        localStorage.setItem('price',price);
        demand = parseInt(GoodDemand(price));
        localStorage.setItem('demand',demand);
        totalPrice.innerHTML = "Price: " + String(price) + "$"; 
        customDemand.innerHTML = "Demand: " + String(demand) + "%";
    }
});

increasePrice.addEventListener('click',()=>{
    if (demand>10){
        //for some reason that i cant solve,first we have to reassign the type of  price.
        price = parseFloat(price)
        price += 0.01;
        price = parseFloat(price).toFixed(2)
        localStorage.setItem('price',price);
        demand = parseInt(GoodDemand(price));
        localStorage.setItem('demand',demand);
        totalPrice.innerHTML = "Price: " + String(price) + "$"; 
        customDemand.innerHTML = "Demand: " + String(demand) + "%";
    }
});

// A function to calculate  a basic demand.
function GoodDemand(price){
    /* Normally demand will be 50% but if price is increase then demand will decrease or vice versa.
       formula is: newdemand = ((initialPrice-normalPrice)*factor)% + 50%
    */
    const normal = 0.20;
    let factor = 250;
    let demand = 50;
    let realPrice = (price-normal);
    return (demand - realPrice*factor)
}



// A function for sold our paperclips automatically.
function def(){

    if (sold<paperclips){

        sold++;
        localStorage.setItem('sold',sold);
        unsold--;
        unsoldPaperClips.innerHTML = "Unsold Inverntory: " + String(unsold);
        fund += parseFloat(price);
        localStorage.setItem('fund',fund.toFixed(2));
        avaliableFunds.innerHTML = "Avaliable Funds: " + String(fund.toFixed(2));
        
    }
    

    demand = localStorage.getItem('demand');
    setTimeout(def,(100/demand)*1000);
    
}
def();

wire.addEventListener('click',()=>{

    if (fund>=cost){

        inches += 100;
        fund -= cost;
        cost += 2;

        localStorage.setItem('inches',inches);
        localStorage.setItem('cost',cost);
        localStorage.setItem('fund',fund.toFixed(2));

        totalInches.innerHTML = String(localStorage.getItem('inches')) + ": inches left";
        avaliableFunds.innerHTML = "Available Funds: " + String(fund.toFixed(2)); 
        totalCost.innerHTML = "Cost: " + String(cost) + "$";

    }
    
});

totalAutoClickers.addEventListener('click',()=>{

    if (fund>=clickerscost){
        autoclickers += 1;
        fund -= clickerscost;
        clickerscost += 10;

        localStorage.setItem('autoclickers',autoclickers);
        localStorage.setItem('clickerscost',clickerscost);
        localStorage.setItem('fund',fund.toFixed(2));


        showClickers.innerHTML = autoclickers;
        totalClickersCost.innerHTML = "Cost: " + String(clickerscost) + "$"
        avaliableFunds.innerHTML = "Available Funds: " + String(fund.toFixed(2)); 

    }
});

