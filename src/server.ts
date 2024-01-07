import { app } from "./app";
import { env } from "./env";

app.listen(
  {
    host: "0.0.0.0",
    port: env.PORT,
  },
  function (err, address) {
    if (err) {
      console.error(`Error on start server ==> ${err}`);
      process.exit(1);
    }

    console.info(`Server is running on ${address}`);
  },
);
