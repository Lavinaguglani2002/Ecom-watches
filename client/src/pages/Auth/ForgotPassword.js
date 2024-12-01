
import Layout from '../../components/Layout/Layout'
import React,{useState} from 'react'

import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../styles/AuthStyles.css'



const ForgotPassword= () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:8080/api/v1/auth/forgot-password", {
            email, newPassword,answer
          });
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            
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
    <Layout title="ForgotPassword-Ecommerce App">
        <div className='form-container'>
    <h1>Reset Password</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" placeholder='Enter your email' />
      </div>
      <div className="mb-3">
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="form-control" placeholder='Enter your password' />
      </div>
      <div className="mb-3">
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required className="form-control" placeholder='Enter your favourite sports name' />
      </div>

      <div className='mb-3'>
      <button style={{"width":"200px"}} type="submit" className="btn btn-primary">RESET</button>
      </div>
    </form>
  </div>
        
    </Layout>
  )
}

export default ForgotPassword