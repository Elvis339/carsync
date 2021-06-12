import { Server } from "http";
import app from "./app";
import dbConnection from "./database";
import config from "./config";
import { loggerService } from "./services";

let server: Server;

(async () => {
  const appState = config[process.env.NODE_ENV as "development" | "production"];
  try {
    await dbConnection.connect();
    server = app.listen(appState.app_port, () => {
      console.log(`Server started on: http://${appState.app_host}:${appState.app_port}`);
    });
  } catch (error) {
    if (server) {
      server.close((_error: Error | undefined) => {
        loggerService.info(`Server closed, reason: ${_error.message}`);
        process.exit(1);
      });
    } else {
      loggerService.info(`Couldn't start the server, reason: ${error.message}`);
    }
  }
})();

const exitHandler = () => {
  if (server) {
    server.close((error: Error | undefined) => {
      loggerService.info(`Server closed! Reason: ${error.message} Stack: ${error.stack}`);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  loggerService.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  loggerService.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
