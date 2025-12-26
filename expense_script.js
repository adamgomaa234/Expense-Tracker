// 1. SELECTORS
const total_expense = document.querySelector(".amount p");
const total_income = document.querySelector("#totalIncome");
const total = document.querySelector("#total");
const formElement = document.querySelector("#form");
const history = document.querySelector('.history-list'); 

// Set initial balance
let currentBalance = 1200;
total.textContent = `$${currentBalance}`;

// Variables to track running totals (Better than reading from HTML)
let currentIncome = 0;
let currentExpense = 0;

formElement.addEventListener('submit', function(event){
    event.preventDefault(); 
    
    const type = event.target.type.value;     
    const amount = event.target.Amount.value; 
    const date = event.target.Date.value;      
    const category = event.target.Category.value; 

    // VALIDATION
    if (type.trim() === "" || amount.trim() === "" || date === "" || category.trim() === "") {
        alert("kml ya 3el2");
    }
    else {
        updateList(type, amount, date, category);
        formElement.reset(); // Clears the form
    }
});

function updateList(type, amount, date, category){
   const historyItem = document.createElement("div");
   historyItem.classList.add('history-item');

   const transInfoEl = document.createElement("div");
   transInfoEl.classList.add('trans-info'); 

   const categoryEl = document.createElement("h4");
   const dateEl = document.createElement("span");
   const transEl = document.createElement("div");
   
   transEl.classList.add('trans-amount');

   // --- NEW: Create Delete Button ---
   const deleteBtn = document.createElement("button");
   deleteBtn.innerText = "x";
   deleteBtn.classList.add("delete-btn"); // Add css for this class later
   
   // --- LOGIC: Delete Item & Update Totals ---
   deleteBtn.addEventListener('click', function() {
       // 1. Remove from screen
       historyItem.remove();

       // 2. Subtract value back from totals
       const val = parseFloat(amount);
       if(type === "income") {
           currentIncome -= val;
           currentBalance -= val;
           total_income.innerText = `$${currentIncome}`;
       } else {
           currentExpense -= val;
           currentBalance += val; // Expense removed means money comes back
           total_expense.innerText = `$${currentExpense}`;
       }
       total.textContent = `$${currentBalance}`;
   });

   // --- LOGIC: Add Item ---
   // Convert string to number for math
   const val = parseFloat(amount); 

   if(type === "income"){
       historyItem.classList.add('income');
       transEl.textContent = `+$${amount}`; 
       
       // MATH FIX: Add numbers, don't combine strings
       currentIncome += val;
       currentBalance += val;
       total_income.innerText = `$${currentIncome}`;
   }
   else{
       historyItem.classList.add('expense');
       transEl.textContent = `-$${amount}`; 
       
       // MATH FIX: Add numbers
       currentExpense += val;
       currentBalance -= val; // Expenses subtract from balance
       total_expense.innerText = `$${currentExpense}`;
   }
   
   // Update the main balance text
   total.textContent = `$${currentBalance}`;

   categoryEl.innerText = category;
   
   const dateObj = new Date(date);
   dateEl.innerText = dateObj.toLocaleDateString("en-US", {
       month: "short", day: "numeric", year: "numeric",
   });

   transInfoEl.appendChild(categoryEl); 
   transInfoEl.appendChild(dateEl);
   
   historyItem.appendChild(transInfoEl);
   historyItem.appendChild(transEl);
   
   // Append the delete button to the item
   historyItem.appendChild(deleteBtn);

   history.prepend(historyItem); 
}