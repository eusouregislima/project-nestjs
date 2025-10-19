import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class AnotherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('CABECALHO2', 'XALALALALALA2');

    // chamo o próximo middleware ou o controller se não houver mais middlewares
    next();
  }
}
