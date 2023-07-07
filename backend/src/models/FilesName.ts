import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Files extends Model {
  fileName: any;
  file_name: any;
}

Files.init(
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
    modelName: "files",
    timestamps: true,
    underscored: true,
  }
);
