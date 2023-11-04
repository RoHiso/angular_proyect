import dbconection from '../dbconfig/config';
import { DataTypes } from 'sequelize';

const Usuario = dbconection.define('Usuario', {
    // Model attributes are defined here
    id_user: {
      type:DataTypes.INTEGER,
      autoIncrement: true,
      allowNull:false,
      primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING
    }
  }
  );

  export default Usuario;