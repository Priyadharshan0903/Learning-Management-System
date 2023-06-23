import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["STUDENT", "STAFF"],
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        max: 50,
        min: 3,
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid E-mail",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
    underscored: true,
  }
);
