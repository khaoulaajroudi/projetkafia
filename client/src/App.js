import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, userCurrent } from "./JS/userSlice/userSlice";
import Profil from "./components/Profil";
import PrivateRoute from "./routes/PrivateRoute";
import List from "./components/ListStudents/List";
import { getcontact } from "./JS/contactSlice";
function App() {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      dispatch(userCurrent());
    }
    dispatch(getcontact())
  }, []);
  return (
    <div className="App">
{/* <List /> */}
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/list" element={<List />} />
        </Route>{" "}
      </Routes>
    </div>
  );
}

export default App;
