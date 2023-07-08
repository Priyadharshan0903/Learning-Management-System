import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Department } from "./department";
import { User } from "./users";

export class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
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
  },
  {
    sequelize,
    modelName: "student",
    timestamps: false,
    underscored: true,
  }
);
Student.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasOne(Student, {
  foreignKey: "userId",
  as: "student",
});
