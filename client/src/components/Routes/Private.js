import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log("Sending request with token:", auth?.token);
        const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        console.log("Response:", res.data);

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate('/login'); // Redirect to login page if authentication fails
        }
      } catch (error) {
        console.error("Authorization check failed", error);
        setOk(false);
        navigate('/login'); // Redirect to login page on error
      } finally {
        setLoading(false); // Set loading to false once the check is done
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false); // Set loading to false if no token
      navigate('/login'); // Redirect to login page if no token
    }
  }, [auth?.token, navigate]);

  // Show spinner while loading
  if (loading) {
    return <Spinner />;
  }

  return ok ? <Outlet /> : <Spinner />; // Show outlet if ok, otherwise show spinner
};

export default PrivateRoute;
