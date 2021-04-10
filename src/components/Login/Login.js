import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });
    const [isNewUser, setIsNewUser] = useState(true)

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
          setLoggedInUser(res.user)
          history.replace(from);
        })
        .catch(err => {
          console.log(err);
          console.log(err.message);
        })
      }

      const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(isNewUser && user.email && user.password && user.confirmPassword && user.name){
            user.password===user.confirmPassword && firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                firebase.auth().currentUser.updateProfile({
                displayName: user.name
                }).then(function() {
                    setLoggedInUser(res.user);
                    history.replace(from);
                }).catch(function(error) {
                    console.log(error)
                });
              
            })
            .catch(err =>{
                console.log(err);
                console.log(err.message);
            })
          }

          if(!isNewUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                setLoggedInUser(res.user);
                history.replace(from);
            })
            .catch(err =>{
                console.log(err);
                console.log(err.message);
            })
          }
      }

      const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 6;
          const passwordHasNumber =  /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
        console.log(user);
      }

    return (
        <div className="login container my-5">
            <div className="custom-account d-flex justify-content-center">
                <form onSubmit={handleFormSubmit} >
                    {
                        isNewUser ?
                        <div className="border d-flex flex-column justify-content-center align-content-center px-5 pt-4 pb-2">
                            <h5 className="mb-4 text-start">Create an account</h5>
                            <input required type="text" name="name" onBlur={handleBlur} placeholder="Name"/>
                            <input required type="email" name="email" onBlur={handleBlur} placeholder="Email"/>
                            <input required type="password" name="password" onBlur={handleBlur} placeholder="Password"/>
                            <input required type="password" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm Password"/>
                            <input type="submit" className="btn btn-danger mt-3 fs-5" value="Create an account" />
                            <p className="mt-3">already have an account <span className="text-primary" onClick={()=>setIsNewUser(false)}>Sign in</span> </p>    
                        </div>
                        :
                        <div className="border d-flex flex-column justify-content-center align-content-center px-5 pt-4 pb-2">
                            <h5 className="mb-4 text-start">Login</h5>
                            <input required type="email" name="email" onBlur={handleBlur} placeholder="Email"/>
                            <input required type="password" name="password" onBlur={handleBlur} placeholder="Password"/>
                            <input type="submit" className="btn btn-danger mt-3 fs-5" value="Login" />
                            <p className="mt-3">Don't have an account <span className="text-primary" onClick={()=>setIsNewUser(true)}>Signup</span> </p>    
                        </div>
                    }
                </form>
            </div>

            <div className="divider d-flex justify-content-center mt-3">
                <hr/> <p className="mx-3"> or </p> <hr/>
            </div>

            <div className="social-account d-flex justify-content-center">
                <button className="btn border rounded-pill fw-bold" onClick={handleGoogleSignIn}><FontAwesomeIcon className="icon me-5 text-danger" icon={faGoogle} />Continue with google</button>
            </div>
        </div>
    );
};

export default Login;