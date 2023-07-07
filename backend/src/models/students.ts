import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Department } from "./department";

export class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        max: 50,
        min: 3,
      },
      allowNull: false,
    },
    rollNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    regNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    deptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "student",
    timestamps: false,
    underscored: true,
  }
);

Student.belongsTo(Department, {
  foreignKey: "deptId",
  as: "department",
});
Department.hasMany(Student, {
  foreignKey: "deptId",
  as: "students",
});
