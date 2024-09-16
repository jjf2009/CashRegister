const output = document.getElementById('output');
const amount = document.getElementById('price');
const input = parseFloat(document.getElementById('cash').value);
const pay = document.getElementById('purchase-btn');
const cash = document.getElementById('left');
let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

function checkCashDrawer(price, cashInput, cid) {
  let newcash = parseFloat(cashInput.value);
  if (cashInput.value === '') {
    alert('Please enter the cash amount');
    return;
  } else if (newcash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (newcash === price) {
    alert("No change due - customer paid with exact cash");
    return;
  }
  let changeDue = newcash - price;
  console.log(newcash);
  console.log(price);
  let totalInDrawer = cid.reduce((acc, curr) => acc + curr[1], 0);
  totalInDrawer = totalInDrawer.toFixed(2);

  if (changeDue > totalInDrawer) {
    output.innerText = "Status: INSUFFICIENT_FUNDS";
  } else if (changeDue === parseFloat(totalInDrawer)) {
    output.innerText = "Status: CLOSED";
  } else {
    output.innerText = `Change Due: ${changeDue.toFixed(2)}`;
  }
}

// Add event listener, and pass the correct arguments
pay.addEventListener("click", function() {
  output.innerText='';
  checkCashDrawer(price, input, cid);
  document.getElementById("change-due").innerText = `Status: ${result.status} ${result.change.map(c => `${c[0]}: $${c[1]}`).join(', ')}`;
});
