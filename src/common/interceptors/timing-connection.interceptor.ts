import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();

    // função tap é usada para observar
    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsed = finalTime - startTime;
        console.log(`Tempo de execução da requisição: ${elapsed}ms`);
      }),
    );
  }
}
