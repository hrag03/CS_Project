// Welcome to my Vending Machine code,
// Enter 0 to commit your coins.
const userInput = require("readline-sync");
const fs = require('fs');
const data = require("./snack.json");
const snacks = JSON.parse(JSON.stringify(data))['snacks'];
const allowedCoins = [500, 200, 100, 50, 1000, 2000, 5000];

let coins = [];

// This function is to push the allowed coins in the array
function inputCoin(coin) {
    if (allowedCoins.includes(coin)) {
        coins.push(coin);
        console.log("Current amount: " + totalCoins());
    } else {
        console.log(coin + " not allowed!");
    }
}

// This function is to calculate the sum of coins inserted (pushed in an array).
function totalCoins() {
    if (coins) {
        return coins.reduce((a, b) => a + b, 0);
    } else {
        return 0;
    }
}

// This function is to call the data of the snack inputted.
function getSnack(snackId) {
    let snack;
    snacks.forEach(a => {
        if (snackId == a.id) {
            snack = a;
        }
    });
    return snack;
}

// This function is to sort the coins in the array in a descending form.
function sortDesc() {
    allowedCoins.sort(function (a, b) {
        return b - a;
    });
}

// This function is to sort the coins in the array in a Ascending form.
function sortAsc() {
    allowedCoins.sort(function (a, b) {
        return a - b;
    });
}

// This function is to update the JSON file with the new data.
function buySnack(snack) {
    snacks.forEach(s => {
        if (s.id == snack.id) {
            s.quantity--;
        }
    });
    let newSnacks = { "snacks": snacks }
    fs.writeFileSync("snack.json", JSON.stringify(newSnacks));
}

// This function starts the machine, so the user can make actions.
function startMachine() {
    sortAsc();
    console.log(snacks);
    const snackId = userInput.question("\nPlease enter the product number from the list: ");
    let snack = getSnack(snackId);
    if (snack == null) {
        console.log("Snack not found!");
    } else if (snack.quantity < 1) {
        console.log(snack.name + " is not available!");
    } else {
        console.log("\n\n" + snack.name + " price is " + snack.price + "!");
        while (true) {
            // if (coin == 0) {
            //     break;
            if (totalCoins() >= snack.price) { 
                break;
            }
            const coin = userInput.questionInt("\nInsert coins: " + allowedCoins + "\n:");
            inputCoin(coin);
        }
        vendingMachine(snack);
    }
}

// This function is for the Vending Machine to run correctly.
function vendingMachine(snack) {
    if (totalCoins() < snack.price) {
        console.log("Insufficient amount.");
    } else {
        if (totalCoins() % 50 != 0) {
            console.log("Insert allowed coins: 50, 100, 200, 500");
        } else {
            let change = totalCoins() - snack.price;
            let changeAmount = [];
            // To give as fewer coins as possible, it starts the loop from the higher coin.
            sortDesc();
            allowedCoins.forEach(coin => {
                while (change >= coin) {
                    changeAmount.push(coin);
                    change = change - coin;
                }
            });
            console.log("\nHere is your change: " + changeAmount);
            // Emptying the coins for the next run.
            coins = [];
            buySnack(snack);
            console.log("Thank you for buying " + snack.name + "! Amount left: " + snack.quantity + "\n_______________________________________________\n\n");
        }
    }
}

while (true) {
    startMachine();
}