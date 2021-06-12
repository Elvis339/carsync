import { NextFunction, Request, Response } from "express";
import { loggerService } from "../services";

const catchAsyncErrors = fn => {
  return (request: Request, response: Response, next: NextFunction) => {
    fn(request, response, next).catch(err => {
      loggerService.error(JSON.stringify(err));
      return next(err);
    });
  };
};

export const wrapAsyncRoutes = fns => {
  return Object.keys(fns).reduce((res, key) => {
    res[key] = catchAsyncErrors(fns[key]);
    return res;
  }, {}) as any;
};
