import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/data").then((res) =>
      res.json().then((data) => {
        setdata({
          name: data.Name,
          age: data.Age,
          date: data.Date,
          programming: data.programming,
        });
      })
    );
  }, []);

  return (
    <>
      <header className="App-header">
        <h1>React and flask</h1>
        <p>{data.name}</p>
        <p>{data.age}</p>
        <p>{data.date}</p>
        <p>{data.programming}</p>
      </header>
    </>
  );
}

export default App;
