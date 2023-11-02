import dbconection from '../dbconfig/config';
import { DataTypes } from 'sequelize';

const Usuario = dbconection.define('Usuario', {
    // Model attributes are defined here
    id: {
      type:DataTypes.INTEGER,
      autoIncrement: true,
      allowNull:false,
      primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    edad:{
        type:DataTypes.INTEGER
    }
  }, {
    // Other model options go here
    // I don't want createdAt
  createdAt: false,

  // I want updatedAt to actually be called updateTimestamp
  updatedAt: false
  });

  export default Usuario;