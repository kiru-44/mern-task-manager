// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../stylepage/Authpagestyle.css";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );

//       localStorage.setItem("token", res.data.token);
//       alert("Login Successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Login Failed");
//       console.log(err.response?.data);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/register",
//         { email, password }
//       );

//       alert("Registration Successful! Please login.");
//       setIsLogin(true);
//     } catch (err) {
//       alert("Registration Failed");
//       console.log(err.response?.data);
//     }
//   };

//   return (
//     <div className="container">
//       <div className={`form-container ${isLogin ? "" : "active"}`}>

//         {/* LOGIN FORM */}
//         <div className="form login">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <button type="submit">Login</button>
//           </form>

//           <p>
//             Don't have an account?{" "}
//             <span onClick={() => setIsLogin(false)}>
//               Register
//             </span>
//           </p>
//         </div>

//         {/* REGISTER FORM */}
//         <div className="form register">
//           <h2>Register</h2>
//           <form onSubmit={handleRegister}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <button type="submit">Register</button>
//           </form>

//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setIsLogin(true)}>
//               Login
//             </span>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../stylepage/Authpagestyle.css";
import loginImage from "../Assets/logo.jpg"

export default function AuthPage() {

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/dashboard");

    } catch (err) {
      alert("Login Failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {name, email, password }
      );

      alert("Registration Successful");
      setIsLogin(true);

    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (

    <div className="container">

      <div className={`auth-box ${isLogin ? "" : "active"}`}>

        {/* IMAGE PANEL */ }
      <div className="image-panel">
  <img src={loginImage} alt="Task Manager" />
</div>

        {/* LOGIN FORM */}
        <div className="form login">

          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            
  
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

          </form>

          <p>
            Don't have an account? 
            <span onClick={()=>setIsLogin(false)}> Register</span>
          </p>

        </div>


        {/* REGISTER FORM */}
        <div className="form register">

          <h2>Register</h2>

          <form onSubmit={handleRegister}>

            <input
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />


            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button type="submit">Register</button>

          </form>

          <p>
            Already have an account? 
            <span onClick={()=>setIsLogin(true)}> Login</span>
          </p>

        </div>

      </div>

    </div>
  );
}