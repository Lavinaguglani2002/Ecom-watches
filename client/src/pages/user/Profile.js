import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [auth, setAuth] = useAuth(); // Use the auth hook to get the context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  // Get user data
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name || "");
      setPhone(phone || "");
      setAddress(address || "");
      setEmail(email || "");
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("http://localhost:8080/api/v1/auth/profile", {
        name, email, password, phone, address
      });
      if (data?.error) {
        toast.error(data?.error)
      }
      else{ 
         setAuth({...auth,user:data?.updatedUser })
         let ls=localStorage.getItem("auth")
         ls=JSON.parse(ls)
         ls.user=data.updatedUser
         localStorage.setItem('auth',JSON.stringify(ls))
         toast.success('profile updated successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <div className='form-container'>
              <h1>Your Profile</h1>
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
                    disabled
                    placeholder='Enter your email'
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    className="form-control"
                    placeholder='Enter your password'
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    
                    className="form-control"
                    placeholder='Enter your phone no'
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    
                    className="form-control"
                    placeholder='Enter your address'
                  />
                </div>

                <button type="submit" className="btn btn-primary">UPDATE</button>
                <Link style={{ fontSize: "12px" }} to="/login">If Register then login</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
