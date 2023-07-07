import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class FilesName extends Model {}

FilesName.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "FilesName",
    timestamps: true,
    underscored: true,
  }
);
