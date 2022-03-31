import Login from "./Login.js";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import Paperbase from "./template/Paperbase.js";

function App() {

  return (
    <div className="App">
     <Routes>
        <Route exact path="/home" element={<Paperbase/>} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
 
    </div>
  );
}

export default App;
