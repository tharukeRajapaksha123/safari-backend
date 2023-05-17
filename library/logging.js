const log4js = require('log4js');

class Logging {
  static log(args) {
    this.info(args);
  }

  static info(args) {
    const logger = log4js.getLogger();
    logger.level = 'info';
    logger.info(`[${new Date().toLocaleString()}] [INFO]`, typeof args === 'string' ? args : JSON.stringify(args));
  }

  static warning(args) {
    const logger = log4js.getLogger();
    logger.level = 'warn';
    logger.warn(`[${new Date().toLocaleString()}] [WARN]`, typeof args === 'string' ? args : JSON.stringify(args));
  }

  static error(args) {
    const logger = log4js.getLogger();
    logger.level = 'error';
    logger.error(`[${new Date().toLocaleString()}] [ERROR]`, typeof args === 'string' ? args : JSON.stringify(args));
  }
}

module.exports = Logging;
