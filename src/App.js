import { useEffect, useState } from "react";
import ExpenseItem from "./components/Expenses/ExpenseItem";
import useFetch from "./components/helpers/useFetch/useFetch";
import Modal from "./components/Modal/Modal";
import AddExpense from "./components/NewExpense/AddExpense";
import bg from ".//images/bg.jpg";
import styled from "styled-components";

function App() {
  const [expensesData, setExpensesData] = useState([]);
  const [active, setActive] = useState(false);

  const { postHandler, getHandler } = useFetch();
  async function saveDatatoArrayHandler(formData) {
    await postHandler("/data-base.json", formData);
    setActive(true);
    getDataFromBackend();
  }

  async function getDataFromBackend() {
    const data = await getHandler("/data-base.json");

    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        amount: data[key].amount,
        id: key,
        title: data[key].title,
        date: data[key].date,
      });
    }

    setExpensesData(loadedData);
    setActive(false);
  }

  useEffect(() => {
    getDataFromBackend();
  }, []);

  return (
    <Box className="app-main-block">
      <AddExpense onSaveDtaToArray={saveDatatoArrayHandler} />
      <Modal setActive={setActive} active={active} />
      {expensesData.map((element) => {
        return (
          <ExpenseItem
            key={element.id}
            date={element.date}
            text={element.title}
            amount={element.amount}
          />
        );
      })}
    </Box>
  );
}

export default App;

const Box = styled.div`
  background-image: url("${bg}");
  background-repeat: no-repeat;
  background-size: cover;
`;
