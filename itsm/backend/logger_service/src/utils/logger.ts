import winston from 'winston';

const { printf } = winston.format;

export const logFormat = printf(({ type, message, service, payload, user, tenant ,uuid,err}:any) => {
  const logData = {
    Type: '',
    userID: '',
    Serivice_name: '',
    tenantId: '',
    Payload: {},
    message: {},
    uuid:'',
    err:''
  };
  logData.Type = type || '';
  logData.userID = user || '';
  logData.Serivice_name = service || '';
  logData.tenantId = tenant || '';
  logData.Payload = payload || {};
  logData.message = message || '';
  logData.uuid = uuid || '';
  logData.err = err || '';
  return `${JSON.stringify(logData)}`;
});
