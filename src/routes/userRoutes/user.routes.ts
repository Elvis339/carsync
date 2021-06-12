import { Router } from "express";
import { wrapAsyncRoutes } from "../../utils/apiUtils";
import passport from "passport";

import { userValidationMiddleware } from "../../middlewares/user.middleware";
const userController = wrapAsyncRoutes(require("../../controller/user.controller"));

export default (router: Router): void => {
  router.post("/register", userValidationMiddleware, userController.register);
  router.post("/verify/:code", userController.verify);
  router.post("/login", userValidationMiddleware, userController.login);
  router.post("/change-password", passport.authenticate("jwt", { session: false }), userController.changePassword);
};
