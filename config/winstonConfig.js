const { transports, createLogger, format } = require("winston");
const { json, errors, combine, timestamp, printf } = format;
const DailyRotateFile = require("winston-daily-rotate-file");

const logLevel = "debug";

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp}  ${level}: ${message}`;
});

const logger = createLogger({
  level: logLevel,
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({ filename: "log/error/error.log", level: "error" }),
    new DailyRotateFile({
      filename: "log/activity/activity.log",
      level: "info",
    }),
  ],
});

module.exports = logger;
