import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.cache.has(url)) {
      console.log(`Está no cache: ${url}`);
      return of(this.cache.get(url));
    }
    // of foi usado para retornar um observable com o valor do cache

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(url, data);
        console.log(`Adicionado ao cache: ${url}`);
      }),
    );
  }
}
