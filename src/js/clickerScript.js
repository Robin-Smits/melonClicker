const waterMelon = document.getElementById("watermelonClick");
const melonHitbox = document.getElementById("melonHitbox");
const melonAmount = document.getElementById("melonAmount");
const melonPerSecHTML = document.getElementById("melonPerSec");
const building1 = document.getElementById("building1");
const building2 = document.getElementById("building2");
const upgrade1 = document.getElementById("upgrade1");
const upgrade2 = document.getElementById("upgrade2");
const addedMelonPerSec = document.getElementById("addedMelonsPerSec")

//building 1
let price1 = 10;
let buildingCount1 = 0;
let mult1 = 1;
let building1Income = 0.5;
let building1Added = 0.5;
const plantPrice = document.getElementById("plantPrice");
const plantCount = document.getElementById("plantCount");
const addedPlant = document.getElementById("addedPlant");

//building 2
let price2 = 300;
let buildingCount2 = 0;
let mult2 = 1;
let building2Income = 10;
let building2Added = 10;
const farmPrice = document.getElementById("farmPrice");
const farmCount = document.getElementById("farmCount");
const addedFarm = document.getElementById("addedFarm");

//set base values
let melons = 3000;
let melonPerSec = 0;
let floorMelons = 0;
const secondDivider = 100;
let clickingPower = 1;
melonSecUpdate();

// event listener that updates the building and it's values
building1.addEventListener("click", function () {
 [price1, buildingCount1, building1Income] = updateBuilding(price1, plantPrice, buildingCount1, building1Added, mult1, building1Income, plantCount, addedPlant);
});

// event listener that updates the building and it's values
building2.addEventListener("click", function () {
  [price2, buildingCount2, building2Income] = updateBuilding(price2, farmPrice, buildingCount2, building2Added, mult2, building2Income, farmCount, addedFarm);
})
melonHitbox.addEventListener("click", clickMelon);
// Add a click event listener to the element
upgrade1.addEventListener("click", function () {
  upgrader1(upgrade1, mult1, 2, 1000);
});

upgrade2.addEventListener("click", function () {
  upgrader2(upgrade2, mult2, 3, 300);
})

/**
 * Function that updates the values of the building and displays them on screen
 * @param {*} price price to upgrade the building
 * @param {*} priceDisplay element to display the price
 * @param {*} buildingCount level of the building
 * @param {*} buildingAdded the mount of melons the building adds
 * @param {*} multiplier multiplier for the melons that he building produces
 * @param {*} buildingIncome amount of melons the building produces
 * @param {*} buildingCountDisplay element to display the level of the building
 * @param {*} buildingIncomeDisplay  element to display the amount of melons the building produces
 * @returns 
 */
function updateBuilding(price, priceDisplay, buildingCount, buildingAdded, multiplier, buildingIncome, buildingCountDisplay, buildingIncomeDisplay) {
  if (melons >= price) {
    melons -= price;
    price = Math.floor(price * 1.15);
    if (price > 10000) {
      let priceToDisplay = Math.round(price / 100) / 10;
      priceDisplay.innerHTML = `price: ${priceToDisplay}k`;
    }
    else {
      priceDisplay.innerHTML = `price: ${price}`;
    }
    buildingCount += 1;
    buildingIncome = buildingCount * buildingAdded * multiplier;
    melonSecUpdate();
    buildingCountDisplay.innerHTML = buildingCount;
    buildingIncomeDisplay.innerHTML = `${buildingIncome} Melons/s`;
  }
  return [price, buildingCount, buildingIncome]
}

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

function upgrader1(building, multname, mult, price) {
  if (price < melons) {
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




