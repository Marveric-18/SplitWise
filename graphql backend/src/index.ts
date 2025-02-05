import { app } from "./server";

const PORT = 8082;

const main = () => {
  app.listen(PORT, () => {
    console.log("Server Started. Listening on: http://localhost:" + PORT);
  });
};


main();