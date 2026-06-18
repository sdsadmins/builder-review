import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ collection: 'roles', timestamps: true })
export class Role {
  @Prop({ type: String, required: true, unique: true, trim: true })
  name: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: Boolean, default: false })
  isSystem: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
