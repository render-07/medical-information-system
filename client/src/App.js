import ChooseUser from "./components/ChooseUser";
import Landing from "./components/Landing";
import Physician from "./components/Physician";
import Patient from "./components/Patient";
import ResetPassword from "./components/ResetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ChooseUser />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/physician" element={<Physician />}></Route>
          <Route path="/patient" element={<Patient />}></Route>
          <Route
            path="/reset-password/updateYourPassword"
            element={<ResetPassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
