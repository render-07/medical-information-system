import ChooseUser from "./components/ChooseUser";
import Landing from "./components/Landing";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ChooseUser />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cases" element={<Home />}></Route>
          <Route path="/profile" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
