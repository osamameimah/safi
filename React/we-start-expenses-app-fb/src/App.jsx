import { useEffect, useState } from "react";
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
    saveExpense(expense);
    // setExpenses((prevState) => {
    //   return [expense, ...prevState];
    // });
    // console.log(expenses);
  };

  let saveExpense = (expense) => {
    fetch(
      "https://ws-expenses-react-4106d-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "post",
        body: JSON.stringify(expense),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        expense.firebase_id = jsonData["name"];

        // console.log(jsonData);
        setExpenses((prevState) => {
          return [expense, ...prevState];
        });
        console.log(expenses);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let onDeleteExpenseHandler = (firebaseId) => {
    // alert(id);
    // let filteredArray = expenses.filter((element) => element.id != id);
    // setExpenses(filteredArray);
        fetch(
          `https://ws-expenses-react-4106d-default-rtdb.firebaseio.com/expenses/${firebaseId}.json`,
          {
            method: "Delete",
            headers: {
              accept: "application/json",
            },
          }
        )
        .then(function(response){
          return response.json();
        })
        .then(function(jsonData){
          console.log(jsonData);
           let filteredArray = expenses.filter(
             (element) => element.firebase_id != firebaseId
           );
          setExpenses(filteredArray);
        })
        .catch(function(error){})
  };

  let fetchExpenses = () => {
    fetch(
      "https://ws-expenses-react-4106d-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "Get",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let expensesArray = [];
        console.log(jsonData);
        for (let key in jsonData) {
          // console.log(key);
          let expense = jsonData[key];
          expense.firebase_id = key;
          expensesArray.push(expense);
          console.log(jsonData[key]);
        }
        setExpenses(expensesArray);
      })
      .catch(function (error) {});
  };
  // expenses.push(expense);
  // };

  // fetchExpenses();

  useEffect(fetchExpenses, []);


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
        <ExpensesTable
          expenses={expenses}
          onDeleteExpense={onDeleteExpenseHandler}
        />
      </section>
    </div>
  );
};

export default App;
