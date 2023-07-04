import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "department",
    timestamps: false,
    underscored: true,
  }
);
