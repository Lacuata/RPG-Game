let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
// monster
let monsterHealth;
let inventory = ["stick"];

// This is the CSX CSS selector for ID and its going to have the id of el and going to store html element called el

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power:5
    },
    {
        name: "dagger",
        power:30
    },
    {
        name: "claw hammer",
        power:50
    },
    {
        name: "sword",
        power:100
    },
];
// function object array for monster
const monsters = [ 
    // index array of monster 0-2
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];
// const for location [this is used to store all data for location in the game] to access data object throught properties we add empty object use curly braces {}

// location array 1 element which an object
const locations =[
    // create a function value townsquare
    {
name: "town square",
    "button text": ["Go to Store", 
    // to access specific element in an object use button text then we can access the certain element 0[go to store] 1[go to cave] 2[fight dragon]
    "Go to Cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    // then add property text 
    text: "You are in the town square. You see a sign that says \"store\"."
    },
    // contain information from the go store function this array
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions" :[buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave", 
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions" : [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text" : ["Go to town square", "Go to town square", "Found Easter egg"],
        "button functions" : [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and gold.' 
        
    },
    {
        name: "lose", 
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions" : [restart, restart, restart],
        text: "You die."
    },
    {
        name: "win", 
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions" : [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! ."
    },
    // location object 7
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
]


// initialize buttons
// button.onclick = openStore
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// create a generic function so see you always start with the word keyword function then do a space and then put the function name

// put the code when you call to run when you call the function so right now instead of creating a function called function name we're going to create function called go  store 

// create an empty function above goTown named update(location)
function update(location) {
// lets display the monster style none
monsterStats.style.display = "none";

// copy the go town function then paste it here 
button1.innerText = location["button text"][0];
// this is how you use the location array in specific place or element --go to store
button2.innerText = location["button text"][1];
// go to cave
button3.innerText = location["button text"][2];
// fight dragon
button1.onclick = location["button functions"][0];
// buy health
button2.onclick = location["button functions"][1];
// buy weapon
button3.onclick = location["button functions"][2];
// go town

// change the innertext of Welcome to you enter the store
text.innerText = location.text;
}


// We dont need  this code now
function goTown() {
//   so we use update function inside of go town function we call update function soto call a function call the name then parenthesis update(); This is it
update(locations[0]); 
// 0 means 1st location 1 2nd 2 3rd location in array   
// pass in the location array inside update(location)
// the locations array contain 2 location the townsquare and store
}
// we dont need this code also
function goStore() {
// console.log its going to log it to web console

// This is how you update the text of a button
// button:innerText = "Click Me"; 
// button1.innerText = "Buy 10 health (10 gold)";
// button2.innerText = "Buy weapon (30 gold)";
// button3.innerText = "Go to town square";
// button1.onclick = buyHealth;
// button2.onclick = buyWeapon;
// button3.onlick = goTown;
// // change the innertext of Welcome to you enter the store
// text.innerText = "You enter the store.";



// console.log("Going to store.");
// when you click going to store it's going to store function
update(locations[1]);
}


function goCave() {
   update(locations[2]);
}


// Create 3 new empty function csalled buy health weapon go town
function buyHealth() {
// gold = gold - 10;
// health = health + 10
// compound assignment gold -= 10 health += 10
if (gold >= 10) {
    gold -= 10;
health += 10;
goldText.innerText = gold;
healthText.innerText = health;
text.innerText = "You buy health.";
} else {
    text.innerText = "You do not have enough gold to buy health.";
}

}
function buyWeapon() {
    // wrap all buy weapon function inside another if statement inside if statement called necessif statement also called outer statement condition should check if current weapons is lessthan 3 which is index of the last weapon we can use also weapon.length to check if the weapons is 
    if (currentWeapon < weapons.length - 1) {
 if (gold >= 30) {
   gold -= 30;
   currentWeapon ++;
   goldText.innerText = gold;
   let newWeapon = weapons
   [currentWeapon].name;
//    newWeapon to dagger then weapons[currentWeapon].name
   text.innerText = "You now have a " + newWeapon + ".";
   inventory.push(newWeapon);
   text.innerText += " In your inventory you have: " + inventory;
 } else {
    text.innerText = "You do not have enough gold to buy weapon.";
 }
}
else {
    text.innerText = "You already have the most powerful weapon!";
    
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
 }
}
function sellWeapon() {
 if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    // dot shift method
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    // add in inventory to have
    text.innerText += " In your inventory you have: " + inventory;
    // add code if the length of inventory is not morethan 1  text message appear says dont sell your only weapon
 } else {
    text.innerText = "Don't sell your only Weapon!";
 }
}

function fightSlime() {
fighting = 0;
goFight();
}

function fightBeast() {
fighting = 1;
goFight();
}

function fightDragon() {
    
    fighting = 2;
    goFight();
}

function goFight() {
update(locations[3]);
monsterHealth = monsters[fighting].health;
// to display monster stat because in css display is none
monsterStats.style.display = "block";
monsterNameText.innerText = monsters[fighting].name;
monsterHealthText.innerText = monsterHealth;
}


function attack() {
text.innerText = "The " + monsters[fighting].name + " attacks.";
// the monster fighting w/name attack
text.innerText += " you attack it with your " + weapons[currentWeapon].name + ".";
// you attack it with your currentweapon name of weapon
if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
} else {
    text.innerText += "You miss.";
}
// health of monster your fighting w/level
monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
// dmage to monster using your weapon power
healthText.innerText = health;
monsterHealthText.innerText = monsterHealth;
if (health <= 0) {
    lose();
} else if (monsterHealth <= 0) {
    // attack function we're going to update the content of the else if
fighting === 2 ? winGame() : defeatMonster();
    // if fighting === 2 meaning dragon winGame else defeatmonsters
}
if (Math.random() <= .1 && inventory.length !== 1) {
    // if weapon breaks
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
}

}
function getMonsterAttackValue(level) {
    // multiply the lvl of monster to 5 then subtract then * xp then round it down
 let hit = (level * 5) - (Math.floor(Math.random() * xp));   
 console.log(hit);
 return hit;
}
function isMonsterHit() {
    // if ismonsterHit is > .2 ||(OR) monster health < 20;
    // either 1 is this true will return true
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    // loot gold from monster round by floor the nearest number
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
// function lose game
function lose() {
 update(locations[5]);   
}
// a function for restart function if you lose and want to restart back to beginning
// function win game
function winGame() {
    update(locations[6]);
}

// function restart game
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg(){
update(locations[7]);
}

function pickTwo() {
pick(2);
}

function pickEight() {
    pick(8);
    }

    function pick(guess){
let numbers = [];
// while loop keep looping if the condition is true
    while(numbers.length < 10){
numbers.push(Math.floor(Math.random() * 11));
    }
text.innerText = "You picked " + guess + ". Here are the random numbers: \n";

// for Loop 3 item parenthesis seperate semicolon; 1st initialize variable then put condition we're looking for the variable then change the variable
for (let i = 0; i < 10; i++) {
    // and we are going to loop until i is < 10 then out of loop na because i is no longer less than 10 loop will be stopped
    text.innerText += numbers[i] + "\n";

}
// final section if elsestatement 
// if the number is not in thearray or index of guess it's return -1   if indexofguess is not equal to -1 means you guess a correct number then set right you win 20gold
if (numbers.indexOf(guess) !== -1) {
text.innerText += "Right! You win 20 gold!";
gold += 20;
goldText.innerText = gold;
} else {
    text.innerText += "wrong! You lose 10 health!"
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
        lose();
    }
}
    }
