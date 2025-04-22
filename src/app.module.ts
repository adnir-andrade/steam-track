import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

// O que faz este modulo?
// O AppModule é o modulo raiz da aplicação, ele importa os modulos SharedModule e CoreModule
// e registra o AppController e o AppService. O AppModule é o ponto de entrada da aplicação NestJS.

@Module({
  imports: [SharedModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
