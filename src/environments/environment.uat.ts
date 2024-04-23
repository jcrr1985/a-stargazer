import { NgxLoggerLevel } from 'ngx-logger';
import { LoggerConfig } from 'ngx-logger/lib/logger.config';

export const environment = {
  production: true,
  baseUrl: '',
  logger: {
    serverLoggingUrl: undefined,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR,
    disableConsoleLogging: false,
  } as LoggerConfig,
};
