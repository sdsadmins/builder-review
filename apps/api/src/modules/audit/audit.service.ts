import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

export interface CreateAuditLogDto {
  actorId?: string;
  actorRole?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  previousState?: Record<string, unknown>;
  nextState?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
}

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog.name)
    private readonly auditLogModel: Model<AuditLogDocument>,
  ) {}

  async log(entry: CreateAuditLogDto): Promise<AuditLog> {
    const doc = await this.auditLogModel.create({
      actorId: entry.actorId ?? undefined,
      actorRole: entry.actorRole,
      action: entry.action,
      resourceType: entry.resourceType,
      resourceId: entry.resourceId ?? undefined,
      previousState: entry.previousState,
      nextState: entry.nextState,
      ipAddress: entry.ipAddress,
      userAgent: entry.userAgent,
      sessionId: entry.sessionId,
      timestamp: new Date(),
    });

    return doc;
  }
}
