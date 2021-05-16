import "primeflex/primeflex.css";
import "./App.css";
import CardTodo from "./components/CardTodo";

function App() {
  return (
    <div className="App p-grid p-align-start vertical-container">
      <div className="p-col">
        <CardTodo />
      </div>
    </div>
  );
}

export default App;
