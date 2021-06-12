import dotenv from "dotenv";
dotenv.config();

import express, { Application, Router } from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import routes from "./routes";
import { authService } from "./services";

const app: Application = express();
const router: Router = Router();
app.disable("x-powered-by");

app.set("view engine", "ejs");
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
authService().applyPassport(passport);

app.use("/api/v1", routes(router));

export default app;
