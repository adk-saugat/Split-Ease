import "./AddExpense.scss"

const AddExpense = ({ setTab }) => {
  return (
    <div className="add-expense-container">
      <form className="add-expense-form">
        <label className="desc-label">Enter a description</label>
        <input
          className="desc-field"
          type="text"
          placeholder="eg. Groceries"
          required
        />
        <label className="expense-label">Enter expense</label>
        <input
          className="expense-field"
          type="number"
          placeholder="$0.00"
          required
        />
        <h2 className="paid-text">Paid by you and split equally.</h2>
        <button className="add-expense-btn" onClick={() => setTab("groups")}>
          Save
        </button>
      </form>
    </div>
  )
}

export default AddExpense
