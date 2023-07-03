import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import TableUsers from "../components/TableUser";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
            path="/users"
            element={
                <PrivateRoute>
                    <TableUsers />
                </PrivateRoute>
            }
        />
      </Routes>
        {/* <PrivateRoute path="/users">
            <TableUsers />
        </PrivateRoute> */}
        
    </>
  );
};

export default AppRoutes;
