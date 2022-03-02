import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import Signup from "../modules/auth/views/Signup";
import Home from "../modules/user/views/Home";
import Signin from "../modules/auth/views/Signin";
import ForgotPassword from "../modules/auth/views/ForgotPassword";
export const history = createBrowserHistory();

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/reset-password" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
