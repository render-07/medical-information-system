import ChooseUser from "./components/ChooseUser";
import Landing from "./components/Landing";
import MainPage from "./components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ChooseUser />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/home" element={<MainPage />}></Route>
          <Route path="/cases" element={<MainPage />}></Route>
          <Route path="/profile" element={<MainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
