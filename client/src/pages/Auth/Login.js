import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
                email, password,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title="Login - Ecommerce App">
            <div className='form-container'>
                <h1 className='text-center mb-4'>Login Page</h1>
                <form onSubmit={handleSubmit}>
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
                    <div className='mb-3'>
                        <button style={{width:"250px"}}
                            type="button"
                            className="btn-primary"
                            onClick={() => { navigate('/forgot-password') }}
                        >
                            Forgot Password
                        </button>
                    </div>
                    <div className='mb-3'>
                        <button style={{"width":"250px"}}
                            type="submit"
                            className="btn-primary"
                        >
                            LOGIN
                        </button>
                    </div>
                    <div className='text-center'>
                        <p>Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link></p>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
