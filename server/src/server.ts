import express from 'express';
import router from './routers/product.router';
import bodyParser from 'body-parser';
import cors from 'cors'
const server = express();
server.use(bodyParser.urlencoded({ extended: false }))

server.use(bodyParser.json())
server.use(cors())

server.use(router)

export default server;