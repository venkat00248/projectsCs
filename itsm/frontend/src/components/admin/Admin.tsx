import React from 'react';
import { SideNav } from './SideNav';
import RouteModal from '../molecules/routeModal/RouteModal';

export const AdminDashboard = () => {
  const userDetailsJSON:any = sessionStorage?.getItem('userDetails');
  const userDetails = JSON?.parse(userDetailsJSON);
  return (
    <div>
      {
        (userDetails?.isAdmin == 1)? 
        <SideNav/>:
        <RouteModal isAdmin= {false}/>
      }
      
    </div>
  )
}

export default AdminDashboard;