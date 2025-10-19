import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
      };
    }

    res.setHeader('CABECALHO', 'XALALALALALA');

    if (req.url === 'o que eu quiser') {
      // Terminando a cadeia de chamadas
      return res.status(404).send({
        message: 'Não encontrado',
      });
    }
    // chamo o próximo middleware ou o controller se não houver mais middlewares
    next();

    // evento que é disparado quando a requisição é finalizada
    res.on('finish', () => {});
  }
}
