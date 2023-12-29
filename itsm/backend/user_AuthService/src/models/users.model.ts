 import { Model, DataTypes, Association  } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {sequelize} from '../database';

import listResponse from "../helpers/listResponse.helper";
import { role } from './roles.model';
import { rbac, rbacsInfo } from './rbacs.model';
interface roles extends Model<roles> {
  belongsTo: Association<roles, UserModel>;
}
export interface UserModel extends Model {
  email: string;
  password: string;
}
export const user = sequelize.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
},
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 }, {
    tableName: 'users',
    timestamps: false,
  });
  role.belongsTo(user);

  user.hasMany(role, { foreignKey: 'user_id' });
  user.hasMany(rbac, { foreignKey: 'user_id'});
  rbac.belongsTo(user);

const usersList = async (query = {}) => {
  let resp: any = {};
  await sequelize.authenticate();
  resp = await user.findAll({
    include: [
      {
        model: role,
        attributes: ['role_id', 'name']
      }
     ]
  });
  return listResponse(resp);
};
  export const userSignUp = async (body: { email: string; password: string }): Promise<{ success: boolean; data?: any; message?: string; status: number }> => {
    await sequelize.authenticate();
    let resp: { success: boolean; data?: any; message?: string; status: number };
    let enc_password = '';
    let { email, password } = body;
    let mailCheck = await user.findAll({
      where: {
        email: email,
      },
    });
  
    if (mailCheck.length === 0) {
      const saltRounds = 10;
      const myPlaintextPassword = password;
      enc_password = await bcrypt.hash(myPlaintextPassword, saltRounds);
      let dataResp = await user.create({ email: body.email, password: `${enc_password}` });
      resp = {
        success: true,
        data: dataResp,
        status: 201,
      };
      return resp;
    } else {
      resp = {
        success: false,
        message: "mail already exists",
        status: 400,
      };
      return resp;
    }
  };
  
  const userLogin = async (body: { email: string; password: string; user_id:number}) => {
    let { email, password, user_id} = body;
    let jwt_token: string | undefined;
    let mailCheck: any= await user.findAll({
      where: {
        email: email,
      },
    });
   if(!mailCheck || !mailCheck.length) throw new Error('user details not found')
    let details = await rbacsInfo(mailCheck[0].dataValues.user_id);
    let detailsRoles: { role_name: string };
    let detailsResources: { resource_name: string} ;
    let isRecordPresent = mailCheck?.length === 1 ? mailCheck[0] : {};
    if ((isRecordPresent as UserModel).email) {
      let pass_dec = await bcrypt.compare(password, (isRecordPresent as UserModel).password || '');
      if (pass_dec) {
        jwt_token = jwt.sign(
          { email, password: (isRecordPresent as UserModel).password,  details, detailsRoles,detailsResources },
          "qcbjsbjkjcibsewdkbdjka7uhjnbvyuiok",
          { expiresIn: '24h' }
        );
        return { success: true, token: jwt_token };
      } else {
        return { success: false, message: "Invalid Password" };
      }
    } else {
      return { success: false, message: "No record found with given credentials" };
    }
  };

  export default { usersList, userSignUp , userLogin };
