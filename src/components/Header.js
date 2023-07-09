import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction';

const Header = (props) => {

  //hideHeader without login
  const [hideHeader, setHideHeader] = useState(false);

  const navigate = useNavigate();

  const user = useSelector(state => state.user.account);
  const dispatch  = useDispatch(); // use redux to handles

  const handleLogout = () => {
    dispatch(handleLogoutRedux());

  }
  useEffect(()  => {
    if(user && user.auth === false){
      navigate("/login");
      toast.success("You had been Logout!");
    }
  }, [user])

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
