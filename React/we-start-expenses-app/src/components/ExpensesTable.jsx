import ExpenseRow from "./ExpenseRow";

function ExpensesTable(props){
return (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Value</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.expenses.map((element) => (
        <ExpenseRow key={element.id} expense = {element} onDeleteExpense={props.onDeleteExpense}/>
      ))}
      
    </tbody>
  </table>
);
};
export default ExpensesTable;