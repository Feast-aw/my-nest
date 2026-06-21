import "reflect-metadata";
import { DataSource } from "typeorm";
import { Department } from "./entities/Department";
import { Employee } from "./entities/Employee";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "typeorm",
  synchronize: true,
  logging: false,
  entities: [Department, Employee],
  migrations: [],
  subscribers: [],
});
