import { INTEGER, Sequelize } from 'sequelize';
import {sequelize} from '../database/index';
import { QueryTypes } from 'sequelize';
import listResponse from "../helpers/listResponse.helper";
import {DataTypes } from 'sequelize';
import { user } from './users.model';

 export const rbac = sequelize.define('rabcs', {
    id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true,
     allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    resource_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},  {
    tableName: 'rbacs',
     timestamps: false
   });
   
   const rbacsList = async (query = {}) => {
    let resp: any = {};
    await sequelize.authenticate();
    resp = await rbac.findAll({
      include: [
        {
          model: user,
          attributes: ['user_id', 'email', 'password']
        }
       ]
    });
    return listResponse(resp);
  };
   const rbacsAdd = async (body: any) => {
    let resp: any;
    resp = await rbac.create(body);
    return { success: true, data: resp };
  };
  
   export const rbacsInfo = async (userId: unknown) => {
    let sql = `
      SELECT u.email, rl.name as role_name, rs.name as resource_name
      FROM users u
      INNER JOIN rbacs r ON r.user_id = u.user_id
      INNER JOIN roles rl ON rl.role_id = r.role_id
      INNER JOIN resources rs ON rs.resource_id = r.user_id
      WHERE  u.user_id = ${userId};`;
    
    const [result] = await sequelize.query(sql, {
      replacements: { userId },
      type: QueryTypes.SELECT
    });
    
    return { success: true, result };
  };
  
export default {rbacsList, rbacsAdd, rbacsInfo};