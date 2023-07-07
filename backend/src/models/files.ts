import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Department } from "./department";
import { User } from "./users";

export class File extends Model {}

File.init(
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
    deptId: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: "id",
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "files",
    timestamps: true,
    underscored: true,
  }
);

File.belongsTo(Department, { foreignKey: "deptId", as: "department" });
File.belongsTo(User, { foreignKey: "userId", as: "user" });
