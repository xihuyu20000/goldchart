import log from "loglevel";

// 设置日志级别
log.setLevel(log.levels.DEBUG);

const logger = {
  debug: (...msg) => log.debug(msg.join(" ")),
  info: (...msg) => log.info(msg.join(" ")),
  warn: (...msg) => log.warn(msg.join(" ")),
  error: (...msg) => log.error(msg.join(" ")),
};
export { logger };
