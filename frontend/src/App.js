import "./App.css";
import CreateOrderTable from "./Components/Create/createOrderTable";
import CreateOrderMain from "./Components/CreateOrderMain/CreateOrderMain";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <Main /> */}
      {/* <Proceed /> */}
      <BrowserRouter>
          <CreateOrderMain/>
      </BrowserRouter>
    </div>
  );
}

export default App;
