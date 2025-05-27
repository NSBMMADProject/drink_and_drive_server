import { Sequelize, DataTypes } from "sequelize";

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      connectionTimeout: 60000,
      family: 4,
    },
  },
);

const db: any = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load models
db.User = require("./user")(sequelize, DataTypes);
db.Post = require("./post")(sequelize, DataTypes);

// Define associations
db.User.hasMany(db.Post, { foreignKey: "userId", as: "posts" });
db.Post.belongsTo(db.User, { foreignKey: "userId", as: "author" });

export { sequelize };
export const { User, Post } = db;
