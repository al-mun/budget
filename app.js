class UI {
  constructor(){
  //income varbiables
    this.income = document.getElementById("income");
    this.incomeOutput = document.getElementById("income-output");
    this.difference = document.getElementById("difference");
    this.incomeMessage = document.querySelector(".income-message");
    //expenses variables
    this.title = document.getElementById("expense-title");
    this.expenseAmount = document.getElementById("expense-amount");
    this.outputTitle = document.getElementById("output-title");
    this.outputAmount = document.getElementById("output-amount");
    this.totalExpenses = document.getElementById("total-expenses");
    this.selected = document.getElementById("category");   //get the categories
    this.outputCategory = document.getElementById("category-output");
    this.expenseMessage = document.querySelector(".expense-message");
    this.billsTotal = document.getElementById("bills-total");
    this.groceryTotal = document.getElementById("grocery-total");
    this.funTotal = document.getElementById("fun-total");
    this.emergencyTotal = document.getElementById("emergency-total");
    this.deleteButton = document.getElementById("deleteButton");
    this.expenseList = [];
    this.billsList = [];
    this.groceryList = [];
    this.funList = [];
    this.emergencyList = [];
    this.expenseID = 1;
    this.billsCat = document.getElementById("bills");
    this.groceryCat = document.getElementById("grocery")
    this.funCat = document.getElementById("fun");
    this.emergencyCat = document.getElementById("emergency");
  }
  //Get the difference between income and expenses
  showTotal(){
    const expense = this.totalExpense();  //totalExpense adds everything & returns a number 
    const total = parseFloat(this.incomeOutput.textContent) - expense;
    difference.innerHTML = `$${total.toFixed(2)}`; //display difference
  
    if (total > 0 ){
      difference.classList.add("good");
      difference.classList.remove("bad");
    }
    else if (total <= 0 ){
      difference.classList.add("bad");
      difference.classList.remove("good");
    }
  } 
  outputIncome(){
    const value = this.income.value;     //assigned a variable to the user's input
    if(value ==="" || value <= 0){
        this.incomeMessage.classList.add("show-message");
        this.incomeMessage.innerHTML = `Please enter an income.`;
        setTimeout(()=>{
            this.incomeMessage.classList.remove("show-message");
        }, 3000);
    }
    else{
    this.incomeOutput.innerHTML = `${value}`;
    this.income.value = "";      //clear income field after enter
    this.showTotal();
    }
  }
  //add an expense
  /////////////////////////////////////////////////////////////////////////////////////////////
  outputExpense(){
    //first the user's inputs are assigned values
    let title = this.title.value;
    this.amountValue = this.expenseAmount.value;
    this.value = this.selected.value;               //get values of options
    this.option = this.selected.options[this.selected.selectedIndex].text;  //get text of selected option and selected value
    if(title === "" || this.amountValue <=0 || this.option === "" || this.value === ""){
        //if any fields are empty add the class show message
        this.expenseMessage.classList.add("show-message");
        this.expenseMessage.innerHTML = `Please complete all sections.`;
        setTimeout(()=>{
            this.expenseMessage.classList.remove("show-message");
        }, 3000);   //then remove it after 3 seconds
    }
    //if everything is filled out
    else{
        this.title.value="";
        let amount = parseFloat(this.amountValue);   //turn amount into an integer
        let expense = {
            id: this.expenseID,
            title: title,
            amount: amount,
            category: this.option
        };
        this.expenseID++;        //increment the id everytime this loops
        this.expenseList.push(expense);  //add to the array  
        if (this.option === "Bills"){
            const billsDiv = document.createElement('div');   //initialize here to allow creation of multiple lines
            billsDiv.innerHTML = `<div class="bill-item">
            <p> -${expense.title} $${expense.amount}</p>
            <div class="buttons">
            <a class="delete-button" data-id="${expense.id}"><i id="deleteButton">Delete</i></a>
            <a class="modify-button" data-id="${expense.id}"><i id="modifyButton">Modify</i></a>
            </div>
            </div>`;
            this.billsCat.appendChild(billsDiv);
            this.billsList.push(expense);
            this.billsExpenses();
            
         }
        else if (this.option === "Grocery/Household"){
          const groceryDiv = document.createElement('div');
          groceryDiv.innerHTML = `<div class="bill-item">
          <p> -${expense.title} $${expense.amount}</p>
          <div class="buttons">
          <a class="delete-button" data-id="${expense.id}"><i id="deleteButton">Delete</i></a>
          <a class="modify-button" data-id="${expense.id}"><i id="modifyButton">Modify</i></a>
          </div>
          </div>`;
          this.groceryCat.appendChild(groceryDiv);
          this.groceryList.push(expense);
          this.groceryExpenses();
         }
        else if (this.option === "Fun"){
          const funDiv = document.createElement("div");
          funDiv.innerHTML = `<div class="bill-item">
          <p> -${expense.title} $${expense.amount}</p>
          <div class="buttons">
          <a class="delete-button" data-id="${expense.id}"><i id="deleteButton">Delete</i></a>
          <a class="modify-button" data-id="${expense.id}"><i id="modifyButton">Modify</i></a>
          </div>
          </div>`;
          this.funCat.appendChild(funDiv);
          this.funList.push(expense);
          this.funExpenses();
         }
        else if (this.option === "Emergency"){
          const emergencyDiv = document.createElement("div");
          emergencyDiv.innerHTML = `<div class="bill-item">
          <p> -${expense.title} $${expense.amount}</p>
          <div class="buttons">
          <a class="delete-button" data-id="${expense.id}"><i id="deleteButton">Delete</i></a>
          <a class="modify-button" data-id="${expense.id}"><i id="modifyButton">Modify</i></a>
          </div>
          </div>`;
          this.emergencyCat.appendChild(emergencyDiv);
          this.emergencyList.push(expense);
          this.emergencyExpenses();
          }
          this.totalExpense();
          this.showTotal();
          this.expenseAmount.value = this.selected.value = "";
    }
  }
//functions for adding up sections
  billsExpenses(){  
    let totalBills = 0;
    if(this.billsList.length > 0){
    totalBills = this.billsList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  this.billsTotal.innerHTML = `<h4>Total: $${totalBills}</h4>`;
  return totalBills;
  }
  groceryExpenses(){
    let totalGrocery = 0;
    if(this.groceryList.length > 0){
    totalGrocery = this.groceryList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
    this.groceryTotal.innerHTML = `<h4>Total: $${totalGrocery}</h4>`;
    return totalGrocery;
  }
  funExpenses(){
    let totalFun = 0;
    if(this.funList.length > 0){
    totalFun = this.funList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  this.funTotal.innerHTML = `<h4>Total: $${totalFun}</h4>`;
  return totalFun;
  }
  emergencyExpenses(){
    let totalEmergency = 0;
    if(this.emergencyList.length > 0){
    totalEmergency = this.emergencyList.reduce(function(acc,curr){
         acc +=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  this.emergencyTotal.innerHTML = `<h4>Total: $${totalEmergency}</h4>`;
  return totalEmergency;
  }
  /////////////////////////////////////////////////////////////////////////////////
  //calculate the total of the exepenses
  totalExpense(){
    let total = 0;
    if(this.expenseList.length > 0){
    total = this.expenseList.reduce(function(acc,curr){
         acc+=curr.amount;
        return acc; 
    }, 0);
    }
    //Show the total on the output
  this.totalExpenses.innerHTML = `$${total}`;
  return total.toFixed(2);
  }
  //Calculate left over money!
  modifyBills(element){
    let id = parseFloat(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from the dom
    this.billsCat.removeChild(parent);
    //remove from the list
    let expense = this.billsList.filter(function(item){
      return item.id === id;
    });
    //show value back on the input boxes
    this.title.value = expense[0].title;
    this.expenseAmount.value = expense[0].amount; 

    //remove from the list
    let tempList = this.expenseList.filter(function(expense) {
      return expense.id !== id;
    });
    this.expenseList = tempList;
    let billTemp = this.billsList.filter(function(expense){
       return expense.id !==id;
    });
    this.billsList = billTemp;
    //console.log(expenseList);
    this.showTotal();
    this.billsExpenses();
  }
  modifyGrocery(element){
    let id = parseFloat(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from the dom
    this.groceryCat.removeChild(parent);
    //remove from the list
    let expense = this.groceryList.filter(function(item){
      return item.id === id;
    });
    //show value back on the input boxes
    this.title.value = expense[0].title;
    this.expenseAmount.value = expense[0].amount;      
    //remove from the list
    let tempList = this.expenseList.filter(function(expense) {
      return expense.id !== id;
    });
    this.expenseList = tempList;
    let groceryTemp = this.groceryList.filter(function(expense){
       return expense.id !==id;
    });
    this.groceryList = groceryTemp;
    //console.log(expenseList);
    this.showTotal();
    this.groceryExpenses();
  }
  modifyFun(element){
    let id = parseFloat(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from the dom
    this.funCat.removeChild(parent);
    //remove from the list
    let expense = this.funList.filter(function(item){
      return item.id === id;
    });
    //show value back on the input boxes
    this.title.value = expense[0].title;
    this.expenseAmount.value = expense[0].amount;      

    //remove from the list
    let tempList = this.expenseList.filter(function(expense) {
      return expense.id !== id;
    });
    this.expenseList = tempList;
    let funTemp = this.funList.filter(function(expense){
       return expense.id !==id;
    });
    this.funList = funTemp;
    //console.log(expenseList);
    this.showTotal();
    this.funExpenses();
  }
  modifyEmergency(element){
    let id = parseFloat(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from the dom
    this.emergencyCat.removeChild(parent);
    //remove from the list
    let expense = this.emergencyList.filter(function(item){
      return item.id === id;
    });

    //show value back on the input boxes
    this.title.value = expense[0].title;
    this.expenseAmount.value = expense[0].amount;      

    //remove from the list
    let tempList = this.expenseList.filter(function(expense) {
      return expense.id !== id;
    });
    this.expenseList = tempList;
    let emergencyTemp = this.emergencyList.filter(function(expense){
       return expense.id !==id;
    });
    this.emergencyList = emergencyTemp;
    //console.log(expenseList);
    this.showTotal();
    this.emergencyExpenses();
  }
  deleteBills(element){
    let result = confirm("Really? Delete?");
    if(result){
      let id = parseFloat(element.dataset.id);
      let parent = element.parentElement.parentElement.parentElement;
      //remove from the dom
      this.billsCat.removeChild(parent);
  
      //remove from the list
      let tempList = this.expenseList.filter(function(expense) {
        return expense.id !== id;
      });
      this.expenseList = tempList;
      let billTemp = this.billsList.filter(function(expense){
         return expense.id !==id;
      });
      this.billsList = billTemp;
      //console.log(expenseList);
      this.showTotal();
      this.billsExpenses();
    }
  }

  deleteGrocery(element){
    let result = confirm("Really? Delete?");
    if(result){
    let id = parseFloat(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from the dom
    this.groceryCat.removeChild(parent);

    //remove from the list
    let tempList = this.expenseList.filter(function(expense) {
      return expense.id !== id;
    });
    this.expenseList = tempList;
    let groceryTemp = this.groceryList.filter(function(expense){
       return expense.id !==id;
    });
    this.groceryList = groceryTemp;
    //console.log(expenseList);
    this.showTotal();
    this.groceryExpenses();
  }
  }
  deleteFun(element){
    let result = confirm("Really? Delete?");
    if(result){
    let id = parseFloat(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from the dom
    this.funCat.removeChild(parent);
    //remove from the list
    let tempList = this.expenseList.filter(function(expense) {
      return expense.id !== id;
    });
    this.expenseList = tempList;
    //remove from the funList
    let funTemp = this.funList.filter(function(expense){
       return expense.id !==id;
    });
    this.funList = funTemp;
    //console.log(expenseList);
    this.showTotal();
    this.funExpenses();
  }
  }
  deleteEmergency(element){
    let result = confirm("Really? Delete?");
    if(result){
    let id = parseFloat(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from the dom
    this.emergencyCat.removeChild(parent);

    //remove from the list
    let tempList = this.expenseList.filter(function(expense) {
      return expense.id !== id;
    });
    this.expenseList = tempList;
    let emergencyTemp = this.emergencyList.filter(function(expense){
       return expense.id !==id;
    });
    this.emergencyList = emergencyTemp;
    //console.log(expenseList);
    this.showTotal();
    this.emergencyExpenses();
  }
  }
}

function eventListeners(){
  const expenseForm = document.getElementById("expense-form");
  const incomeForm = document.getElementById("income-form");
  const ui = new UI()
  incomeForm.addEventListener("submit",function(event){
    event.preventDefault();
    ui.outputIncome();
  } )

  expenseForm.addEventListener("submit", function(event){
    event.preventDefault();
    ui.outputExpense();
  })
  const billsCat = document.getElementById("bills");
  const groceryCat = document.getElementById("grocery");
  const funCat = document.getElementById("fun");
  const emergencyCat = document.getElementById("emergency");

  billsCat.addEventListener("click", function(event){
    if(event.target.parentElement.classList.contains("modify-button")){
      ui.modifyBills(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains("delete-button")){
      ui.deleteBills(event.target.parentElement)
  }
  });
  groceryCat.addEventListener("click", function(event){
    if(event.target.parentElement.classList.contains("modify-button")){
      ui.modifyGrocery(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains("delete-button")){
      ui.deleteGrocery(event.target.parentElement)
  }
  });
  funCat.addEventListener("click", function(event){
    if(event.target.parentElement.classList.contains("modify-button")){
      ui.modifyFun(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains("delete-button")){
      ui.deleteFun(event.target.parentElement)
  }
  });
  emergencyCat.addEventListener("click", function(event){
    if(event.target.parentElement.classList.contains("modify-button")){
      ui.modifyEmergency(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains("delete-button")){
      ui.deleteEmergency(event.target.parentElement)
  }
  });
}
  document.addEventListener("DOMContentLoaded", ()=>{
    eventListeners();
  })
