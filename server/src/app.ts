import {WebSocket} from 'ws';
import { Role } from './main/role';

//websocket 搭建逻辑服
const WebSocketServer = WebSocket.Server;
const wsIns = new WebSocketServer({
    port: 3000
});

wsIns.on('connection', async function (ws) {
    //为每次链接创建一个新的爬虫实例
    console.log('来自client的ws连接');
    Role.createConnection(ws);
});
