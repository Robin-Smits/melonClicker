const waterMelon = document.getElementById("watermelonClick");
const melonHitbox = document.getElementById("melonHitbox");
const melonAmount = document.getElementById("melonAmount");
const melonPerSecHTML = document.getElementById("melonPerSec");
const building1 = document.getElementById("building1");
const building2 = document.getElementById("building2");
const upgrade1 = document.getElementById("upgrade1");
const upgrade2 = document.getElementById("upgrade2");
const addedMelonPerSec = document.getElementById("addedMelonsPerSec")
building1.addEventListener("click", firstBuilding);
building2.addEventListener("click", secondBuilding);


melonHitbox.addEventListener("click", clickMelon);
let melons = 3000;
let melonPerSec = 0;
melonSecUpdate();
let floorMelons = 0;
const secondDivider = 100;

let price1 = 10;
let buildingCount1 = 0;
let mult1 = 1;
let building1Income = 0.5;
let building1Added = 0.5;
let building1Total = 0
const plantPrice = document.getElementById("plantPrice");
const plantCount = document.getElementById("plantCount");
const addedPlant = document.getElementById("addedPlant");
function firstBuilding() {
  if(melons >= price1){
    melons -= price1;
    price1 = Math.floor(price1 * 1.15);
    if(price1 > 10000){
      let price1Display = Math.round(price1 / 100) / 10;
      plantPrice.innerHTML = `price: ${price1Display}k`;
    }
    else{
      plantPrice.innerHTML = `price: ${price1}`;
    }
    buildingCount1 += 1;
    building1Income = buildingCount1 * building1Added * mult1;
    building1Total = building1Income;
    melonSecUpdate();
    plantCount.innerHTML = buildingCount1;
    addedPlant.innerHTML = `${building1Income} Melons/s`;
  }
  
}

let price2 = 300;
let buildingCount2 = 0;
let mult2 = 1;
let building2Income = 10;
let building2Added = 10;
let building2Total = 0
const farmPrice = document.getElementById("farmPrice");
const farmCount = document.getElementById("farmCount");
const addedFarm = document.getElementById("addedFarm");
function secondBuilding() {
  if(melons >= price2){
    melons -= price2;
    price2 = Math.floor(price2 * 1.15);
    if(price2 > 10000){
      let price2Display = Math.round(price2 / 100) / 10;
      farmPrice.innerHTML = `price: ${price2Display}k`;
    }
    else{
      farmPrice.innerHTML = `price: ${price2}`;
    }
    buildingCount2 += 1;
    building2Income = buildingCount2 * building2Added * mult2;
    building2Total = building2Income;
    melonSecUpdate();
    farmCount.innerHTML = buildingCount2;
    addedFarm.innerHTML = `${building2Income} Melons/s`;
  }
  
}

function numberToDisplay(prijs, prijsDisplay, buildingPrice, buildingCount, buildingNumber){
  if(melons >= price2){
    melons -= price2;
    price2 = Math.floor(price2 * 1.15);
    if(price2 > 10000){
      let price2Display = Math.round(price2 / 100) / 10;
      farmPrice.innerHTML = `price: ${price2Display}k`;
    }
    else{
      farmPrice.innerHTML = `price: ${price2}`;
    }
    melonPerSec += 1000;
    buildingCount2 += 1;
    
    farmCount.innerHTML = buildingCount2;
  }
}

let clickingPower = 1;
function clickMelon() {
  melons += clickingPower;
  melonAmount.innerHTML = melons;
  audio.currentTime = 0;
  const origAudio = document.getElementById("clickSound")
    const newAudio = origAudio.cloneNode()
    newAudio.play()
}

if (melons === 0) {
  floorMelons += 1;
}
//vragen

for (let i = 0; i < 1000000; i++) {
  task(i);
}



function task(i) {
  setTimeout(function () {
    melonSecUpdate()
    melonPerSec = buildingCount1 * building1Added * mult1 + buildingCount2 * building2Added * mult2;
    melons = melons + melonPerSec / secondDivider;
    const floorMelons = Math.floor(melons);
    const kDecimal = Math.floor((floorMelons % 1000) / 100);
    const kMelon = Math.floor(floorMelons / 1000);
    const milDecimal = Math.floor((kMelon % 1000) / 100);
    const milMelon = Math.floor(kMelon / 1000);
    if (melons > 1000 && melons <= 1000000) {
      melonAmount.innerHTML = kMelon + "," + kDecimal + "K";
    } else if (kMelon > 1000) {
      melonAmount.innerHTML = milMelon + "," + milDecimal + "Mil";
    } else {
      melonAmount.innerHTML = `${floorMelons}`;
    }
  }, (1000 * i) / secondDivider);
  
}

function melonSecUpdate() {
  const floorMelons = Math.floor(melonPerSec);
  const kDecimal = Math.floor((melonPerSec % 1000) / 100);
  const kMelon = Math.floor(melonPerSec / 1000);
  const milDecimal = Math.floor((kMelon % 1000) / 100);
  const milMelon = Math.floor(kMelon / 1000);
  if (melonPerSec >= 1000 && melonPerSec <= 1000000) {
    const thousandPerSec = kMelon + "," + kDecimal + "K";
    melonPerSecHTML.innerHTML = `${thousandPerSec} melons / second`;
  } else if (kMelon >= 1000) {
    const milionPerSec = milMelon + "," + milDecimal + "Mil";
    melonPerSecHTML.innerHTML = `${milionPerSec} melons / second`;
  } else {
    melonPerSecHTML.innerHTML = `${melonPerSec} melons / second`;
  }
}

function mouseDown() {
  waterMelon.style.bottom = "18px";
}

function mouseUp() {
  waterMelon.style.bottom = "40px";
}



// Add a click event listener to the element
upgrade1.addEventListener("click", function() {
  upgrader1(upgrade1, mult1, 2, 1000);
});

upgrade2.addEventListener("click", function() {
  upgrader2(upgrade2, mult2, 3, 300);
})

function upgrader1(building, multname, mult, price) {
  if(price < melons) {
    melons -= price
    // Get the parent element of "upgrade1"
    let upgrades = document.getElementById("upgrades");
    // Remove "upgrade1" from the parent element
    upgrades.removeChild(building);

    mult1 *= mult
    addedPlant.innerHTML = `${buildingCount1 * building1Added * mult1}  Melons/s`;
    melonSecUpdate() 
  }
};

function upgrader2(building, multname, mult) {
  // Get the parent element of "upgrade1"
  let upgrades = document.getElementById("upgrades");
  // Remove "upgrade1" from the parent element
  upgrades.removeChild(building);

  mult2 *= mult
  addedFarm.innerHTML = `${buildingCount2 * building2Added * mult2}  Melons/s`;
  melonSecUpdate() 
};




