import { DataTypes } from "sequelize";
import { client } from "../utils/database.js";

export const user = client.define('user', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    },
  },

  last_name: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  phoneNumber: {
    type: DataTypes.STRING,
    validate: {
      is: /^[0-9]+$/i,
      len: [7, 15],
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6,]
    }
  }
})