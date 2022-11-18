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
// weapon array
const weapons = [
    {
    name: "stick",
    power: 5
    },
    {
    name: "dagger",
    power: 30
    },
    {
    name: "claw hammer",
    power: 50
    },
    {
    name: "sword",
    power: 100
    }
];
// create new array for monster
const monsters = [
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
// locations array which is an object with array
const locations = [
    {
        name: "town square",
        // button text represent array of 3 element
        "button text" : ["Go to store", "Go to cave", "Fight dragon"],
        // button functions should be array containing the 3 onclick
        "button functions" : [goStore, goCave, fightDragon],
        // next text
        text: "You are in the town square. You see a sign that says \"Store.\"."
    },
    {
        // element on this array that object caontaining information from go store
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy Weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    // 3rd object is name to fight dodge run
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    // 4th object location
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    // 5th location lose
    {
        name: "lose",
        "button text": ["REPLAY", "REPLAY", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "You die."
    },
    // 6th location winGame
    {
        name: "win",
        "button text": ["REPLAY", "REPLAY", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME!. CONGRATULATIONS !!"
    }


]

// initialize buttons
// button.onclick = openStore
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    // change the button1 inner text to location button text
    button1.innerText = location["button text"][0];
    // location["button.text"] to access specific element in an object array and [0] to put index number of go to store 
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
    text.innerText = location.text;
}

function goTown() {
    // update(location) array to call goTown function
  update(locations[0]);
//   this is the locations array sa taas 0 is the 1st element of location array 
}


function goStore() {
   update(locations[1]);
}

function goCave() {
   update(locations[2]);
}



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
    if (currentWeapon < weapons.length - 1) {
 if (gold >= 30) {
    gold -= 30;
    currentWeapon++;
    goldText.innerText = gold;
    let newWeapon = weapons[currentWeapon].name;
    text.innerText = "You now have a " + newWeapon + ".";
    inventory.push(newWeapon); 
    text.innerText += " In your inventory you have:" + inventory + "."
 }   else {
    text.innerText = "You don't have enough gold to buy a weapon.";  
   }
 } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
 }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerTextt = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
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
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    // attacking monster name
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    // you attack monster w/your weapon
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose(); 
    }else if (monsterHealth <= 0) {
        // if fighting === 2 win Game else defeatMonster shorcut ? for if : for else 
       fighting === 2 ? winGame() : defeatMonster();
    }

}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
update(locations[5]);    
}

function winGame() {
    update(locations[6]);
}

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

