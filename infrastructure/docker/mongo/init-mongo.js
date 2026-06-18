db = db.getSiblingDB('builderreview');

db.createUser({
  user: 'br_app',
  pwd: 'br_app_password',
  roles: [{ role: 'readWrite', db: 'builderreview' }],
});

db.createCollection('audit_logs', {
  capped: false,
});

db.audit_logs.createIndex({ timestamp: -1 });
db.audit_logs.createIndex({ actorId: 1, timestamp: -1 });
db.audit_logs.createIndex({ resourceType: 1, resourceId: 1 });
