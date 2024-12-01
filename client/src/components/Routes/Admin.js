import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log("Sending request with token:", auth?.token);

        // Send request to server to verify admin access
        const res = await axios.get("http://localhost:8080/api/v1/auth/admin-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        console.log("Response:", res.data);

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate('/'); // Redirect to dashboard if not authorized
        }
      } catch (error) {
        console.error("Authorizadtion check failed", error);
        setOk(false);
        navigate('/'); // Redirect to home page on error
      } finally {
        setLoading(false); // Set loading to false once the check is done
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false); // Set loading to false if no token
      navigate('/'); // Redirect to home page if no token
    }
  }, [auth?.token, navigate]);

  // Show spinner while loading
  if (loading) {
    return <Spinner />;
  }

  return ok ? <Outlet /> : <Spinner />; // Show outlet if ok, otherwise show spinner
};

export default AdminRoute;
