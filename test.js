//income varbiables
let income = document.getElementById("income");
let incomeEnter = document.getElementById("income-enter");
let incomeOutput = document.getElementById("income-output");
let difference = document.getElementById("difference");
let incomeMessage = document.querySelector(".income-message");
//expenses variables
let title = document.getElementById("expense-title");
let expenseAmount = document.getElementById("expense-amount");
let outputTitle = document.getElementById("output-title");
let outputAmount = document.getElementById("output-amount");
let totalExpenses = document.getElementById("total-expenses");
const selected = document.getElementById("category");   //get the categories
let outputCategory = document.getElementById("category-output");
let expenseEnter = document.getElementById("expense-enter");
let expenseMessage = document.querySelector(".expense-message");
let billsTotal = document.getElementById("bills-total");
let groceryTotal = document.getElementById("grocery-total");
let funTotal = document.getElementById("fun-total");
let emergencyTotal = document.getElementById("emergency-total");
let deleteButton = document.getElementById("deleteButton");
let expenseList = [];
let billsList = [];
let groceryList = [];
let funList = [];
let emergencyList = [];
let expenseID = 1;
//add income 
function outputIncome(){
    const value = income.value;     //assigned a variable to the user's input
    if(value ==="" || value <= 0){
        incomeMessage.classList.add("show-message");
        incomeMessage.innerHTML = `Please enter an income.`;
        setTimeout(()=>{
            incomeMessage.classList.remove("show-message");
        }, 3000);
    }
    else{
    incomeOutput.innerHTML = `${value}`;
    income.value = "";      //clear income field after enter
    showTotal();
    }
}
//add an expense
/////////////////////////////////////////////////////////////////////////////////////////////
function outputExpense(){
    //first the user's inputs are assigned values
    let expenseTitle = title.value; 
    let amountValue = expenseAmount.value;
    let value = selected.value;               //get values of options
    let option = selected.options[selected.selectedIndex].text;  //get text of selected option and selected value
    if(expenseTitle === "" || amountValue <=0 || option === "" || value === ""){
        //if any fields are empty add the class show message
        expenseMessage.classList.add("show-message");
        expenseMessage.innerHTML = `Please complete all sections.`;
        setTimeout(()=>{
            expenseMessage.classList.remove("show-message");
        }, 3000);   //then remove it after 3 seconds
    }
    //if everything is filled out
    else{
        let amount = parseFloat(amountValue);   //turn amount into an integer
        let expense = {
            id: expenseID,
            title: expenseTitle,
            amount: amount,
            category: option
        };
        expenseID++;        //increment the id everytime this loops
        expenseList.push(expense);  //add to the array  
        //console.log(expenseList);
        if (option === "Bills"){
            let billsDiv = document.createElement('div');
            billsDiv.innerHTML = `<div class="bill-item">
            <p> -${expense.title} $${expense.amount}</p>
            <div class="buttons">
            <a class="delete-button" data-id="${expense.id}"><i id="deleteButton">delete</i></a>
            <a class="modify-button" data-id="${expense.id}"><i id="modifyButton">modify</i></a>
            </div>
            </div>`;
            document.querySelector(".bills").appendChild(billsDiv);
            billsList.push(expense); 
            billsExpenses();
         }
        else if (option === "Grocery/Household"){
            let groceryDiv = document.createElement('div');
            groceryDiv.innerHTML = `<div class="bill-item">
            <p> -${expense.title} $${expense.amount}</p>
            <div class="buttons">
            <a class="delete-button" data-id="${expense.id}"><i id="deleteButton">delete</i></a>
            <a class="modify-button" data-id="${expense.id}"><i id="modifyButton">modify</i></a>
            </div>
            </div>`;
            document.querySelector(".grocery").appendChild(groceryDiv);
            groceryList.push(expense);
            groceryExpenses();
         }
         else if (option === "Fun"){
            let funDiv = document.createElement('div');
            funDiv.innerHTML = `<div class="bill-item">
            <p> -${expense.title} $${expense.amount}</p>
            <div class="buttons">
            <a class="delete-button" data-id="${expense.id}"><i id="deleteButton">delete</i></a>
            <a class="modify-button" data-id="${expense.id}"><i id="modifyButton">modify</i></a>
            </div>
            </div>`;
            document.querySelector(".fun").appendChild(funDiv);
            funList.push(expense);
            funExpenses();
         }
         else if (option === "Emergency"){
            let emergencyDiv = document.createElement('div');
            emergencyDiv.innerHTML = `<div class="bill-item">
            <p> -${expense.title} $${expense.amount}</p>
            <div class="buttons">
            <a class="delete-button" data-id="${expense.id}"><i id="deleteButton">delete</i></a>
            <a class="modify-button" data-id="${expense.id}"><i id="modifyButton">modify</i></a>
            </div>
            </div>`;
            document.querySelector(".emergency").appendChild(emergencyDiv);
            emergencyList.push(expense);
            emergencyExpenses();
         }
         totalExpense();
         showTotal();
         title.value = expenseAmount.value = selected.value = "";
    }
}

function billsExpenses(){
    let totalBills = 0;
    if(billsList.length > 0){
    totalBills = billsList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  billsTotal.innerHTML = `<h4>Total: $${totalBills}</h4>`;
  return totalBills;
}
function groceryExpenses(){
    let totalGrocery = 0;
    if(groceryList.length > 0){
    totalGrocery = groceryList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  groceryTotal.innerHTML = `<h4>Total: $${totalGrocery}</h4>`;
  return totalGrocery;
}
function funExpenses(){
    let totalFun = 0;
    if(funList.length > 0){
    totalFun = funList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  funTotal.innerHTML = `<h4>Total: $${totalFun}</h4>`;
  return totalFun;
}
function emergencyExpenses(){
    let totalEmergency = 0;
    if(emergencyList.length > 0){
    totalEmergency = emergencyList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  emergencyTotal.innerHTML = `<h4>Total: $${totalEmergency}</h4>`;
  return totalEmergency;
}
/////////////////////////////////////////////////////////////////////////////////

//calculate the total of the exepenses
function totalExpense(){
    let total = 0;
    if(expenseList.length > 0){
    total = expenseList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  totalExpenses.innerHTML = `$${total}`;
  return total;
}
//Calculate left over money!
function showTotal(){
    const expense = totalExpense();             
    const total = parseFloat(incomeOutput.textContent) - expense;
    difference.innerHTML = `$${total}`;
    
    if (total > 0 ){
        difference.classList.add("good");
        difference.classList.remove("bad");
    }
    else if (total <= 0 ){
        difference.classList.add("bad");
        difference.classList.remove("good");
    }
    //console.log(expense);
}

//event listeners
incomeEnter.addEventListener("click", ()=>{
    outputIncome();         
});
expenseEnter.addEventListener("click", ()=>{   
    outputExpense();    //run function when enter is clicked
    console.log(expenseList);
});

function deleteExpense(element){
    let id = parseFloat(element.dataset.id);
    //console.log(id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from the dom
    //console.log(parent);
    billItem.removeChild(parent);

    //remove from the list
    let tempList = expenseList.filter(function(expense) {
      return expense.id !== id;
     });
     expenseList = tempList;
     console.log(expenseList);
     showTotal();
  }
function modifyExpense(){
    console.log("you clicked modify");
}

billItem = document.getElementById("bill-line");
expenseCategories = document.getElementById("expense-categories");
expenseCategories.addEventListener("click", function(event){
    if(event.target.parentElement.classList.contains("modify-button")){
      modifyExpense(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains("delete-button")){
      deleteExpense(event.target.parentElement)
  }
  });
