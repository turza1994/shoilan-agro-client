import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import './Header.css';
import firebase from "firebase/app";
import "firebase/auth";

const Header = () => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const handleSignout = ()=>{
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      setLoggedInUser(signedOutUser);
    }).catch(err => {
      // An error happened.
    });
  }

  return (
    <Navbar className="shadow-sm" bg="light" expand="lg">
      <Navbar.Brand><Link to="/"><h3>Shoilan Valley</h3></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/orders">Orders</Link>
          <Link className="link" to="/admin">Admin</Link>
          { loggedInUser.displayName ? 
            <div>
              <span className="fw-bold me-3 fs-5">{loggedInUser.displayName}</span>
              <button onClick={handleSignout} className="btn btn-warning">Signout</button>
            </div>
            :
            <Link className="link" to="/login"><button className="btn btn-warning">Login</button></Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
