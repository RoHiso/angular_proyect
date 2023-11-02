import dbconection from '../dbconfig/config';
import { DataTypes } from 'sequelize';

const Producto = dbconection.define('Producto', {
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
    descripcion:{
        type:DataTypes.STRING
    },
    precio:{
        type:DataTypes.DOUBLE
    },
    cantidad:{
        type:DataTypes.INTEGER
    }
  }, {
    // Other model options go here
    // I don't want createdAt
  createdAt: false,

  // I want updatedAt to actually be called updateTimestamp
  updatedAt: false
  });

  export default Producto;