import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Department } from "./department";
import { User } from "./users";
import { Subject } from "./subjects";

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
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
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
Department.hasMany(File, { foreignKey: "deptId", as: "files" });

File.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(File, { foreignKey: "userId", as: "files" });

File.belongsTo(Subject, { foreignKey: "subjectId", as: "subject" });
Subject.hasMany(File, { foreignKey: "subjectId", as: "files" });
