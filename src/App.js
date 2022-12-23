import "./App.css";
import Register from "./Components/Register/Register";
import SignIn from "./Components/SignIn/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePage from "./Components/CreatePage/CreatePage";
import ProductList from "./Components/ProductList/ProductList";
import PastOrder from "./Components/PastOrder/PastOrder";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createHome" element={<CreatePage />} />
          <Route path="/createOrder" element={<ProductList />} />
          <Route path="/pastOrder" element={<PastOrder />} />
        </Routes>
      </BrowserRouter>
      {/* <CreatePage /> */}
    </div>
  );
}

export default App;
