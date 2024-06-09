import { NgxLoggerLevel } from 'ngx-logger';
import { LoggerConfig } from 'ngx-logger/lib/logger.config';

export const environment = {
  production: false,
  baseUrl: 'https://cars-server-1.onrender.com',
  logger: {
    serverLoggingUrl: undefined,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR,
    disableConsoleLogging: true,
  } as LoggerConfig,
};
