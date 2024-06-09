import { NgxLoggerLevel } from 'ngx-logger';
import { LoggerConfig } from 'ngx-logger/lib/logger.config';

export const environment = {
  production: false,
  baseUrl: 'cars-server-3cb4-1882vydic-jcrr1985s-projects.vercel.app',
  logger: {
    serverLoggingUrl: undefined,
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR,
    disableConsoleLogging: true,
  } as LoggerConfig,
};
