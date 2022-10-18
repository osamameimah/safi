import { Fragment } from "react";

function ExpenseRow(props){

  let onDeleteExpenseHandler =() =>{
    props.onDeleteExpense(props.expense.id);
  }
    return (
      <Fragment>
        <tr>
          <td>{props.expense.title}</td>
          <td>{props.expense.date}</td>
          <td>{props.expense.value}</td>
          <td>{props.expense.description}</td>
          <td><a href="#" onClick={onDeleteExpenseHandler}>Delete</a></td>
        </tr>
      </Fragment>
    );
};

export default ExpenseRow;