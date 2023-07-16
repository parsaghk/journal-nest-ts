import { SamplesController } from '@models/samples/samples.controller';
import { SamplesService } from '@models/samples/samples.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SamplesController],
  providers: [SamplesService],
})
export class SamplesModule {}
