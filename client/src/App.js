import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/Admin";
import { ToastContainer } from 'react-toastify';
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/user/Search";
import ProductDetail from "./pages/user/ProductDetail";
import Categories from "./pages/Categories";
import CategoriesProduct from "./pages/CategoriesProduct";
import CartPage from "./pages/CartPage";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/cart" element={<CartPage/>}/>

        <Route path='/register' element={<Register />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/product/:slug" element={<ProductDetail/>}/>

        <Route path="/categories" element={<Categories/>}/>
        <Route path="/category/:slug" element={<CategoriesProduct/>}/>


        {/* Private Route for User Dashboard */}
        <Route  path="/dashboard" element={<PrivateRoute />}>
          <Route path='/dashboard/user' element={<Dashboard />} />
          <Route path='/dashboard/user/order' element={<Orders />} />
          <Route path='/dashboard/user/profile' element={<Profile />} />


        </Route>

        {/* Admin Route for Admin Dashboard */}
        <Route element={<AdminRoute />}>
          <Route path='/dashboard/admin' element={<AdminDashboard />} />
          <Route path='/dashboard/admin/create-category' element={<CreateCategory />} />
          <Route path='/dashboard/admin/create-product' element={<CreateProduct />} />
          <Route path='/dashboard/admin/product/:slug' element={<UpateProduct />} />

          <Route path='/dashboard/admin/products' element={<Products />} />


          <Route path='/dashboard/admin/users' element={<Users />} />



        </Route>

        <Route path='/*' element={<Pagenotfound />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
