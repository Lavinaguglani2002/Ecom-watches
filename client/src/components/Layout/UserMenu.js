import { NavLink } from 'react-router-dom';
import React from 'react';

const UserMenu = () => {
  return (
    <div className='admin-menu text-center'>
      <div className="list-group">
        <h4 className="admin-panel-heading">Dashboard</h4>
        <NavLink 
          to="/dashboard/user/profile" 
          className="list-group-item list-group-item-action"
          activeClassName="active-link"
        >
          Profile
        </NavLink>
        <NavLink 
          to="/dashboard/user/order" 
          className="list-group-item list-group-item-action"
          activeClassName="active-link"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
