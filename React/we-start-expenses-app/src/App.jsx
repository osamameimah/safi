import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesTable from "./components/ExpensesTable";
import "./resources/css/style.css";
import MainImage from "./resources/images/m1.png";

let App = () => {
  // let expenses = [];
  // let onNewExpenseHandler = (expense) =>{
  // alert(`Expense Title : ${expense.title}`);
  let [expenses, setExpenses] = useState([]);
  let onNewExpenseHandler = (expense) => {
    setExpenses((prevState) => {
      return [expense, ...prevState];
    });
    console.log(expenses);
  };

  let onDeleteExpenseHandler = (id) =>{
    // alert(id);
    let filteredArray = expenses.filter((element) =>element.id !=id);
    setExpenses(filteredArray);
  } 
  // expenses.push(expense);
  // };
  return (
    <div className="content-wrapper">
      <section className="top-section">
        <img src={MainImage} alt="image-title" />
        <section>
          <span>Welcome to Expenses Manager</span>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            autem, ab suscipit nam ipsum consectetur obcaecati libero, quidem
            unde, saepe eligendi qui perferendis. Nisi architecto doloribus
            corporis a perspiciatis quod?
          </p>
          <ExpenseForm onNewExpense={onNewExpenseHandler} />
        </section>
      </section>
      <section className="bottom-section">
        
        <ExpensesTable expenses={expenses} onDeleteExpense={onDeleteExpenseHandler}/>
      </section>
    </div>
  );
};

export default App;
