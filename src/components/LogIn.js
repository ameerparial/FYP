import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {app} from "./Firebase/FirebaseConfig";
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setMyEmail } from "./student/StudentNavbarData";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleGmailLogin=(e)=>{}

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // Signed in 
        // alert(response.user.email+" is login");
        navigate("/student/dashboard");
        setMyEmail(response.user.email);
      
        //set email to the studentNavBar:
        


        // navigate("/AfterLogin", {state:{email:email}});
      })
      .catch((error) => {
        if(error.code === 'auth/wrong-password'){
          setErrorMessage('Please check the Password');
        }
        if(error.code === 'auth/user-not-found'){
          setErrorMessage('Please check the Email');
        }
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-green-500">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-green-500 ">Finance for Education</h1>
          <p className="text-xl font-semibold mt-2 mb-8 text-gray-500">Login to your account</p>
        </div>
        <button
  onClick={handleGmailLogin}
  className="flex items-center justify-center w-full mt-6 h-12 mb-2 rounded-lg shadow-md bg-green-500 text-white hover:bg-green-700"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18.533 7.678H10v4.644h4.149a4.376 4.376 0 01-1.896 2.864v2.381h3.072c1.797-1.659 2.835-4.098 2.835-6.809a6.764 6.764 0 00-.712-3.48zM9.999 8.134v3.445l-2.74 1.756a6.736 6.736 0 01-.24-2.042c0-1.815.702-3.542 1.976-4.834L9.999 8.134zm0-7.678a6.76 6.76 0 015.304 2.604l-2.441 2.428a3.877 3.877 0 00-2.863-1.301c-2.14 0-3.897 1.743-3.897 3.897 0 .44.076.865.209 1.266l-2.245 1.399A6.751 6.751 0 019.999.456z" clipRule="evenodd" />
  </svg>
  Log in with Gmail
</button>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <label htmlFor="email" className="text-gray-600 font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600 font-medium">Remember me</label>
            </div>
            <Link to="/ForgotPassword" className="text-green-500 font-medium hover:text-green-700">Forgot password?</Link>
          </div>

          {errorMessage &&  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {/* <strong class="font-bold">Error!</strong> */}
            <span class="block sm:inline">{errorMessage}</span>
          </div>
          }

          <button 
          type="submit"
          className="w-full h-12 font-bold text-green-500 border border-green-100 rounded-lg hover:text-white-500 hover:bg-green-600 hover:text-white">
            Log In
          </button>          
        </form>
        <div className="flex justify-center items-center mt-6">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/SignUp" className="text-green-500 font-medium ml-2 hover:text-green-700">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
