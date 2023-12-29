import { Button, Card } from "react-bootstrap";
import "./UserProfile.scss";
import { useState } from "react";
import {UserData} from './UserData';

export const UserProfile = () => {
  const data = JSON.parse(sessionStorage.userDetails);
const userobj=[{
  "FullName":data.fullname,
  "Email":data.email_id,
  "Company":data.company,
  "Employee ID":data.employee_no,
  "Department":data.department,
  "Level":data.level,
  "BU ID":data.buid,
  "Staffid":data.staffid,
  "UserName":data.username,
 "BU Name":data.buname
}]
  return (
    <div>
      <Card>
        
        <Card.Body > 
        <div className="userIcon">
        <Card.Img src="https://jira.cloud4c.com/secure/useravatar?avatarId=11408" variant="left" 
        style={{height:"150px" , 
                position:"absolute",
                margin:"20px"    
             }}>
            </Card.Img> 
            </div>
          <div className="userprofile">
          <UserData data={userobj}/>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default UserProfile;
