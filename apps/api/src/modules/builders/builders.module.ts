import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuilderProfile, BuilderProfileSchema } from './schemas/builder-profile.schema';
import { BuildersService } from './builders.service';
import { BuildersController } from './builders.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BuilderProfile.name, schema: BuilderProfileSchema },
    ]),
  ],
  controllers: [BuildersController],
  providers: [BuildersService],
  exports: [BuildersService],
})
export class BuildersModule {}
