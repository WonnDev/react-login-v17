import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo192.png';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Header = (props) => {
  //useState
  const { logout, user } = useContext(UserContext);

  //hideHeader without login
  const [hideHeader, setHideHeader] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem("token");
    logout();
    navigate("/login");
    toast.success("You had been Logout!");
  }

  return (
    <>
      <Navbar bg="light" expand="lg" >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30" 
              className="d-inline-block align-top"
            />
            <span>  ReactJS's App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavLink to="/" className="nav-link">Home</NavLink>
                {user && user.auth && 
                <NavLink to="/users" className="nav-link">Manage Users</NavLink> }
            </Nav>
            <Nav>
              { user && user.email && <span className='nav-link'>Welcome <b>{user.email}</b></span> }
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                { user && user.auth === true
              ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
              : <NavLink to="/login" className="dropdown-item">Login</NavLink>
              }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
