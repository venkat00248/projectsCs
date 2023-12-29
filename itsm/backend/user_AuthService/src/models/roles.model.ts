import { Sequelize } from "sequelize";
import {DataTypes } from 'sequelize';
import {sequelize} from '../database/index';
import listResponse from "../helpers/listResponse.helper";
import queryGenerator from "../helpers/queryGenerator.helper";
import  { user } from "../models/users.model";
import { UpdateOptions } from 'sequelize/types';
import { rbac } from "./rbacs.model";
export const role = sequelize.define('roles', {
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  },
     {
     tableName: 'roles',
      timestamps: false
    });
    role.hasMany(rbac, { foreignKey: 'role_id'});
const rolesList = async (query = {}) => {
  let resp: any = {};
  await sequelize.authenticate();
 resp = await role.findAll({
    include: [
    {
      model: user,
      attributes: ['user_id', 'email','password']
    }
   ]
  });

return listResponse(resp);
};

const rolesAdd = async (body: any) => {
    let resp: any;
    resp = await role.create(body);
    return { success: true, data: resp };
  };

  const updateUserRole = async (body: any, user_id: number, role_id: number) => {
    let resp: any;
    resp = await role.update({ user_id: user_id } ,

      {
        where: {
          role_id: role_id,
        },
      });
    return { success: true, user_id: user_id, role_id: role_id, updated_on: new Date() };
  };
  
export default  { 
  rolesList, 
  rolesAdd, 
  updateUserRole
 };
      

