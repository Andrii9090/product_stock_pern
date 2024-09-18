import winston from 'winston'
import { config } from 'dotenv';
config()
const logger = winston.createLogger({
    level: process.env.DEV ? 'debug' : 'error',
    transports: [
        process.env.DEV ? new (winston.transports.Console)() :
            new (winston.transports.File)({ filename: '../errors.log' })
    ]
})

export default logger