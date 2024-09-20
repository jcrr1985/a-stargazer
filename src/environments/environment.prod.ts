import { NgxLoggerLevel } from 'ngx-logger';
import { LoggerConfig } from 'ngx-logger/lib/logger.config';

export const environment = {
  production: false,
  baseUrl: 'https://jobs-server-but9.onrender.com',
  logger: {
    serverLoggingUrl: undefined,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR,
    disableConsoleLogging: true,
  } as LoggerConfig,
};
