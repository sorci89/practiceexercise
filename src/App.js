import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sales from "./pages/Sales";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </div>
  );
}

export default App;
