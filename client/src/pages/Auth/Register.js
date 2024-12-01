// import React, { useState } from 'react';
// import Layout from '../../components/Layout/Layout';
// import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../../styles/AuthStyles.css';

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [answer, setAnswer] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
//         name, email, password, phone, address, answer
//       });
//       if (res && res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     }
//   };

//   return (
//     <Layout title="Register - Ecommerce App">
//       <div className='form-container'>
//         <h1 className='text-center mb-4'>Register Page</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" placeholder='Enter your name' />
//           </div>
//           <div className="mb-3">
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" placeholder='Enter your email' />
//           </div>
//           <div className="mb-3">
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" placeholder='Enter your password' />
//           </div>
//           <div className="mb-3">
//             <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="form-control" placeholder='Enter your phone no' />
//           </div>
//           <div className="mb-3">
//             <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="form-control" placeholder='Enter your address' />
//           </div>
//           <div className="mb-3">
//             <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required className="form-control" placeholder='What is your favorite sports?' />
//           </div>

//           <button type="submit" className="btn-primary">REGISTER  </button>
//           <Link to="/login" className="link-style">Already have an account? Login here</Link>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/AuthStyles.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState("0"); // Default role is User
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
        name, email, password, phone, address, answer, role
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className='form-container'>
        <h1 className='text-center mb-4'>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="form-control" 
              placeholder='Enter your name' 
            />
          </div>
          <div className="mb-3">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="form-control" 
              placeholder='Enter your email' 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="form-control" 
              placeholder='Enter your password' 
            />
          </div>
          <div className="mb-3">
            <input 
              type="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              className="form-control" 
              placeholder='Enter your phone no' 
            />
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
              className="form-control" 
              placeholder='Enter your address' 
            />
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)} 
              required 
              className="form-control" 
              placeholder='What is your favorite sport?' 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select 
              id="role" 
              className="form-select" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required
            >
              <option value="0">User</option>
              <option value="2">Moderator</option>
              <option value="1">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">REGISTER</button>
          <Link to="/login" className="link-style">Already have an account? Login here</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
