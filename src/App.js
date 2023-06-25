import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import TableUsers from "./components/TableUser";
import Login from "./components/Login";
import Container from "react-bootstrap/Container";
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Link, Router } from "react-router-dom";

function App() {
  

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
