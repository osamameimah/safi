import axios from "axios";
import React from "react";
import ExpensesForm from "./components/ExpensesForm";
import ExpensesTable from "./components/ExpensesTable";
import "./resources/css/style.css";
import MainImage from "./resources/images/m1.png";
class App extends React.Component {
  constructor() {
    super();
    this.state = { expenses: [] };
  }
  onNewExpenseHandler = (newExpense) => {
    console.log(newExpense);
    axios
      .post(
        "https://ws-expenses-react-4106d-default-rtdb.firebaseio.com/expenses.json",
        newExpense,
        {
          headers: { accept: "application/json" },
        }
      )
      .then((response) => {
        console.log(response);
        newExpense.firebase_id = response.data.name;
        console.log(newExpense);
        this.setState((prevState) => ({
          expenses: [newExpense, ...prevState.expenses],
        }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});

    // this.setState((prevState) => ({
    //   expenses: [newExpense, ...prevState.expenses],
    // }));
    // this.setState({expenses:[newExpense,...this.state.expenses]});
    // console.log(newExpense);
  };
  onDeleteExpenseHandler = (firebaseId) => {
axios
  .delete(`https://ws-expenses-react-4106d-default-rtdb.firebaseio.com/expenses/${firebaseId}.json `, {
    headers: { accept: "application/json" },
  })
  .then((response) => {
    let filteredExpenses = this.state.expenses.filter(
      (element) => element.firebase_id != firebaseId
    );
    this.setState({ expenses: filteredExpenses });
  });
  };

  componentDidMount(){
    console.log("componentDidMount");
    this.fetchExpenses();
  }

  fetchExpenses = () =>{
    axios.get(`https://ws-expenses-react-4106d-default-rtdb.firebaseio.com/expenses.json`,
    {
        headers:{
            accept:"application/json",
        },
    }
    
    )
    .then((response)=>{
let expensesArray = [];
for(let key in response.data){
    let expense = response.data[key];
    expense.firebase_id = key;
    expensesArray.push(expense);
} 
this.setState({expenses:expensesArray});       
     })
    .catch((error) =>{});
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="top-section">
          <img src={MainImage} alt="image-title" />
          <section>
            <span>Welcome to Expenses Manager</span>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Architecto autem, ab suscipit nam ipsum consectetur obcaecati
              libero, quidem unde, saepe eligendi qui perferendis. Nisi
              architecto doloribus corporis a perspiciatis quod?
            </p>

            <ExpensesForm onNewExpense={this.onNewExpenseHandler} />
          </section>
        </section>

        <ExpensesTable
          expenses={this.state.expenses}
          onDeleteExpense={this.onDeleteExpenseHandler}
        />
      </div>
    );
  }
}

export default App;
