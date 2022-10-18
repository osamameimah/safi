import { Fragment } from "react";
import { useRef } from "react";

let ExpenseForm = (props) => {
  let titleRef = useRef();
  let dateRef = useRef();
  let valueRef = useRef();
  let descriptionRef = useRef();

  let onSubmitHandler = (event) => {
    event.preventDefault();

    if (checkData()) {
      saveExpense();
    }
  };
  let checkData = () => {
    if (
      titleRef.current.value != "" &&
      dateRef.current.value != "" &&
      valueRef.current.value != "" &&
      descriptionRef.current.valu != ""
    ) {
      return true;
    }
    alert("Enter Require info");
    return false;
  };
  let saveExpense = () => {
    let expense = {
      id:Date.now(),
      title: titleRef.current.value,
      date: dateRef.current.value,
      value: valueRef.current.value,
      description: descriptionRef.current.value,
    };
    console.log(expense);
    props.onNewExpense(expense);
    clear();
  };

  let clear = () =>{
    titleRef.current.value =  "" ;
    dateRef.current.value =  "" ;
    valueRef.current.value =  "" ;
    descriptionRef.current.value =  "" ;
    
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title" ref={titleRef} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" placeholder="Date" ref={dateRef} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input type="number" id="value" placeholder="Value" ref={valueRef} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            ref={descriptionRef}
          />
        </div>
      </div>
      <button className="save-btn" type="submit">
        Save
      </button>
    </form>
  );
};

export default ExpenseForm;
