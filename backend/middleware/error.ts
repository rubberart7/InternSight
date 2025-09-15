import type { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ msg: "Invalid request." });
    return;
};

export default errorHandler;