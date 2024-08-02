import { Request, Response, NextFunction } from 'express';
import { AppError } from '../Errors/AppError.js';

export function customErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        res.status(err.httpCode).json({ success: false, error: err.message });
    } else {
        console.error("Error :( => ", err);
        res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

export function DefaultErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log("Catch Error :(( => ", err);
    res.status(err.status || 500).send({ error: "Internal server error" });
}