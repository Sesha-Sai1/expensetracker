import React, { useState } from "react";

const ExpenseTraker = () => {
  const [balance, setBalance] = useState(0);
  const [description, setDescription] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    const parseAmount = parseFloat(amount);
    if (isNaN(parseAmount) || parseAmount < 0) {
      alert("Please enter a valid amount");
      return;
    }
    setBalance((prevBal) => prevBal + parseAmount);

    //add transaction

    setTransaction((prevTrans) => [
      ...prevTrans,
      { description, amount: parseAmount },
    ]);

    //clear form
    setDescription("");
    setAmount("");
  };
  let availableBalance;
  const handleList = (ind) => {
    const updatedData = transaction.filter((val, index) => {
      availableBalance = (balance) => {
        return balance - val.amount;
      };

      return index !== ind;
    });
    setTransaction(updatedData);
    setBalance(availableBalance);
  };
  return (
    <div>
      <div className="container">
        <h1>ExpenseTraker</h1>
        <div className="balance">
          <h2>
            Total Balance:$ <span id="balance">{balance.toFixed(2)}</span>
          </h2>
        </div>
        <div className="transaction">
          <h2>Transaction</h2>
          <ul>
            {transaction.map((trans, index) => {
              return (
                <>
                  <li key={index}>
                    {`${trans.description}:$${trans.amount.toFixed(2)}`}
                    <button
                      onClick={() => {
                        handleList(index);
                      }}
                      style={{
                        marginLeft: "20px",
                        border: "none",
                        color: "red",
                        padding: "5px",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="main-form">
          <div className="add-expense">
            <h2>Add Expense</h2>
            <form>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                placeholder="Add Description"
                id="Add-description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                placeholder="Add Amount"
                id="Add-Amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                required
              />
              <button type="button" onClick={addExpense}>
                Add Expense
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTraker;
