// Global variables
let price = 19.5; // Example price
// let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
let cid=[["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
// Currency values
const currencyUnits = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};
// Function to handle the purchase
function handlePurchase(){
    let cash = parseFloat(document.getElementById('cash').value);
    let changeDueElement = document.getElementById('change-due');
    // Calculate the change due
    let changeDue = cash - price;
    
    if(cash < price){
        alert("Customer does not have enough money to purchase the item");
        return;
    }
    if (cash === price) {
        changeDueElement.innerText = "No change due - customer paid with exact cash";
        return;
    }

    // Function to calculate the change
    let change = calculateChange(changeDue, cid);
    
    // Display the change status
    if (change.status === "INSUFFICIENT_FUNDS") {
        changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (change.status === "CLOSED") {
        changeDueElement.innerText = `Status: CLOSED ${change.change.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(' ')}`;
    } else if (change.status === "OPEN") {
        changeDueElement.innerText = `Status: OPEN ${change.change.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(' ')}`;
    }
}

// Function to calculate change
function calculateChange(changeDue, cid) {
    let change = [];
    let totalCid = cid.reduce((acc, [_, amount]) => acc + amount, 0);

    // Round totalCid to fix any floating point precision issues
    totalCid = Math.round(totalCid * 100) / 100;
    
    // Check if the cash in drawer is less than the change due
    if (totalCid < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } 
    // Check if the total cash in drawer exactly equals the change due
    else if (totalCid === changeDue) {
        // All cash is returned, register is empty, hence status is "CLOSED"
        let reversedCid = [...cid].reverse(); // Reverse to get the highest to lowest order
        let change = [];
    
        for (let [unit, amount] of reversedCid) {
            if (amount !== 0) {
                change.push([unit, amount]); // Push unit and amount as a pair
            }
        }
    
        // Return "CLOSED" status with all the cash in the drawer
        return { status: "CLOSED", change: change };
    }
    
    // Otherwise, calculate the change to be returned
    else {
        for (let [unit, amount] of reversedCid) {
            let unitValue = currencyUnits[unit];
            let unitChange = 0;

            while (changeDue >= unitValue && amount > 0) {
                changeDue -= unitValue;
                changeDue = Math.round(changeDue * 100) / 100; // Fix floating point issues
                amount -= unitValue;
                unitChange += unitValue;
            }

            if (unitChange > 0) {
                change.push([unit, unitChange]);
            }
        }

        // If after calculating the change, there's still some amount left to be returned
        if (changeDue > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        }

        return { status: "OPEN", change };
    }
}

// Event listener for the purchase button
document.getElementById('purchase-btn').addEventListener('click', handlePurchase);
