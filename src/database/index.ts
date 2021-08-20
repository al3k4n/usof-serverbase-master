import { Connection, createConnection } from "typeorm";
import dotenv from 'dotenv';

dotenv.config({});
class Database {

  public connection: Connection;

  constructor() {
    this.connectToDB();
  }

  private connectToDB(): void {
    createConnection({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: false,
      entities: [
        __dirname + "/entity/*.ts",
        __dirname + "/entity/*.js"
      ],
      synchronize: true
    }).then(_con => {
      this.connection = _con;
      console.log("Connected to db!!");
    }).catch(console.error)
  }

}

export const db = new Database();
