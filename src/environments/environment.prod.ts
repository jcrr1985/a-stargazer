import { NgxLoggerLevel } from 'ngx-logger';
import { LoggerConfig } from 'ngx-logger/lib/logger.config';

export const environment = {
  production: false,
  baseUrl: 'https://1f1d-82-215-116-48.ngrok-free.app/',
  logger: {
    serverLoggingUrl: undefined,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR,
    disableConsoleLogging: true,
  } as LoggerConfig,
};
