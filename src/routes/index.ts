import { Router } from "express";
import userRoutes from "./userRoutes/user.routes";

export default (router: Router): Router => {
  userRoutes(router);
  return router;
};
