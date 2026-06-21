import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { IdCard } from "./entities/IdCard";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "typeorm",
  synchronize: true,
  logging: false,
  entities: [User, IdCard],
  migrations: [],
  subscribers: [],
});
