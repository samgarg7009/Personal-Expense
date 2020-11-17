// ref to add btn
const btnEl = document.querySelector("#btnAddExpense");

// ref to input
const inputAmountEl = document.querySelector("#inputAmount");
const inputDescEl = document.querySelector("#inputItem");

// ref to item list
const expenseTableEl = document.querySelector("#itemList");

// ref to total amount
const totalAmountEl = document.querySelector("#totalAmount");

// adding click listener
btnEl.addEventListener("click", addToExpense, false);

// initializing the totalExpense
let totalExpense = 0;

totalAmountEl.textContent = totalExpense;

let allExpenses = [];

function addToExpense() {
    const expenseItem = {};
    const inputExpense = inputAmountEl.value;
    const desc = inputDescEl.value;
    const expense = parseInt(inputExpense, 10);
    expenseItem.desc = desc;
    expenseItem.expense = expense;
    expenseItem.moment = new Date();
    allExpenses.push(expenseItem);
    totalExpense = totalExpense + expense;

    const text = `total Expense: ${totalExpense}`;
    totalAmountEl.textContent = text;

    createListHTML();

    inputAmountEl.value = "";
    inputDescEl.value = "";

}

function createListHTML(){
    const allExpensesHTML = allExpenses.map(expense => createListItem(expense));
    const joinedAllExpenseHTML = allExpensesHTML.join(" ")
    expenseTableEl.innerHTML = joinedAllExpenseHTML;
}

function getDateString(moment) {
    return moment.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function deleteItem(dateValue) {
    const newArr = [];
    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].moment.valueOf() !== dateValue) {
            newArr.push(allExpenses[i]);
        }
    }

    allExpenses = newArr;
    createListHTML();
}

//view
function createListItem({
    expense,
    desc,
    moment
}) {
    return `<li class="list-group-item d-flex justify-content-between">
   <div class="d-flex flex-column">
       ${desc}
       <small class="text-muted">${getDateString(moment)}</small>
   </div>
   <div>
       <span class="px-5">
           ${expense}
       </span>
       <button type="button" class="btn btn-outline-danger" onclick="deleteItem(${moment.valueOf()})"><i class="fas fa-trash-alt"></i></button>
   </div>
</li>`
}