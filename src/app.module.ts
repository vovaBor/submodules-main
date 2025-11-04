import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiFlightPlanningModule } from './modules/agents/aiFlightPlanning/aiFlightPlanning.module';

@Module({
  imports: [AiFlightPlanningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
