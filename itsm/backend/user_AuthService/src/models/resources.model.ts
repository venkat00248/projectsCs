import { Sequelize, Model, DataTypes, Association } from 'sequelize';
import {sequelize} from '../database';
import { QueryTypes } from 'sequelize';
import { UpdateOptions } from 'sequelize/types';
import listResponse from "../helpers/listResponse.helper";
import queryGenerator from "../helpers/queryGenerator.helper";
import { rbac } from './rbacs.model';

const resources = sequelize.define('resources', {
    
    resource_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{

  tableName: 'resources',
  timestamps: false
});
resources.hasMany(rbac, { foreignKey: 'role_id'});

const resourcesList = async (query = {}) => {
  let resp: any;
  await sequelize.authenticate();
  resp = await resources.findAll();
  return listResponse(resp);
};

 
const resourcesAdd = async (body: any) => {
  let resp: any;
  resp = await resources.create(body);
  return { success: true, data: resp };
};

const resourcesUpdate = async (body: any, id: number) => {
  let resp:any;
  resp = await resources.update({ ...body } as UpdateOptions,
      {
        where: {
          id: id,
        },
    });
    return {success: true, id: id, updated_on : new Date()};
};

export default {resourcesList, resourcesAdd, resourcesUpdate }
