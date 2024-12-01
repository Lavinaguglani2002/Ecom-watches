import { NavLink } from 'react-router-dom';
import React from 'react';

const AdminMenu = () => {
  return (
    <div className='admin-menu text-center'>
      <div className="list-group">
        <h4 className="admin-panel-heading">Admin Panel</h4>
        {/* <NavLink 
          to="/" 
          className="list-group-item list-group-item-action"
          activeClassName="active-link"
        >
          Dashboard
        </NavLink> */}
        <NavLink 
          to="/dashboard/admin/create-category" 
          className="list-group-item list-group-item-action"
          activeClassName="active-link"
        >
          Create Category
        </NavLink>
        <NavLink 
          to="/dashboard/admin/create-product" 
          className="list-group-item list-group-item-action"
          activeClassName="active-link"
        >
          Create Product
        </NavLink>
        <NavLink 
          to="/dashboard/admin/products" 
          className="list-group-item list-group-item-action"
          activeClassName="active-link"
        >
           Products
        </NavLink>

        <NavLink 
          to="/dashboard/admin/users" 
          className="list-group-item list-group-item-action"
          activeClassName="active-link"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
