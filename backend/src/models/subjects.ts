import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Subject extends Model {}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    subjectCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "subject",
    timestamps: false,
    underscored: true,
  }
);
