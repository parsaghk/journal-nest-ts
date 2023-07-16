import { SamplesModule } from '@models/samples';
import { Module } from '@nestjs/common';

@Module({
  imports: [SamplesModule],
})
export class ModelsModule {}
