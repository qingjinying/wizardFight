import { WebSocket } from 'ws';
import { RoleState } from '../common/code';
import { PvpController } from '../controller/pvpController';
import { MsgReceive, MsgSend, MsgKey, roleBaseInfo, MsgKeyPush } from '../message/mainMsg';
import { FightRole } from './fightRole';

export class Role {
  public static createConnectionCount: number = 0;

  public static async createConnection(ws: WebSocket) {
    let role = new Role(ws);
  }

  private ws: WebSocket;
  public id: number;
  private _state = RoleState.free; //玩家状态
  public fightRole = FightRole.getIns(this);  //玩家战斗实例
  private _clientInfo: roleBaseInfo;

  //各个功能模块
  public pvpController = new PvpController(this);

  constructor(ws: WebSocket) {
    this.ws = ws;
    this.id = ++Role.createConnectionCount;
    this._clientInfo = new roleBaseInfo();
    this.sendMsg(MsgKeyPush.roleInfo, this.getBaseInfo());
    let self = this;
    ws.on('message', function (message) {
      console.log(`[SERVER] Received: ${message}`);
      let data = JSON.parse(message.toString()) as MsgReceive;
      self.msgRoute(data);
    });
  }

  //消息路由 要处理返回数据
  private msgRoute(data: MsgReceive) {
    let res: any;
    switch (data.key) {
      case MsgKey.createRoom:
        res = this.pvpController.createRoom();
        this.sendMsg(MsgKey.createRoom, res);
        break;
      case MsgKey.joinRoom:
        res = this.pvpController.joinRoom(data.data);
        this.sendMsg(MsgKey.joinRoom, res);
        break;
      case MsgKey.leaveRoom:
        res = this.pvpController.leaveRoom();
        this.sendMsg(MsgKey.leaveRoom, res);
        break;
      case MsgKey.roleReady:
        res = this.pvpController.roleReady();
        this.sendMsg(MsgKey.roleReady, res);
        break;
      case MsgKey.roleCancelReady:
        res = this.pvpController.roleCancelReady();
        this.sendMsg(MsgKey.roleCancelReady, res);
        break;
      case MsgKey.setSendCard:
        res = this.pvpController.setSendCard(data.data);
        this.sendMsg(MsgKey.setSendCard, res);
        break;
      case MsgKey.cancelSendCard:
        res = this.pvpController.cancelSendCard();
        this.sendMsg(MsgKey.cancelSendCard, res);
        break;
      default:
        console.log(`key:${data.key},not found`);
        break;
    }
  }

  public sendMsg(key: string, data: any) {
    let msg = new MsgSend();
    msg.key = key;
    if (data) {
      msg.data = data;
    }
    this.ws.send(JSON.stringify(msg), (err) => {
      if (err) {
        console.log(`[SERVER] error: ${err}`);
      }
    });
  }

  public updateState(state: RoleState) {
    this._state = state;
  }

  public getState() {
    return this._state;
  }

  public getBaseInfo(): roleBaseInfo {
    this._clientInfo.state = this._state;
    return this._clientInfo;
  }
}