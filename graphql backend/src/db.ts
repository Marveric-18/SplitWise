import { DataSource } from "typeorm";

const postgresDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "test",
  database: "splitwise-postgres-db",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.*"]
});

const initializeDatabase = async () => {
  postgresDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
};

export { initializeDatabase };
