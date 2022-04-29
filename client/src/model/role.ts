import { ErrMsg } from "../common/code";
import { E, EventName } from "../manager/E";
import { MsgKey, MsgKeyPush, MsgReceive, roleBaseInfo } from "../Msg/mainMsg";

export class Role {
    private static _ins: Role;
    public static getIns() {
        if (!this._ins) {
            this._ins = new Role();
        }
        return this._ins;
    }
    public id: number;     //角色id
    public roomId: number;  //所在房间id
    private socket: Laya.Socket;
    constructor() {
        this.init();
    }

    private init() {
        this.socket=new Laya.Socket();
        this.socket.connectByUrl("ws://127.0.0.1:3000");
        
        this.socket.on(Laya.Event.OPEN,this,this.onSocketOpen);
        this.socket.on(Laya.Event.CLOSE,this,this.onSocketClose);
        this.socket.on(Laya.Event.MESSAGE,this,this.onMessageRev);
        this.socket.on(Laya.Event.ERROR,this,this.onConnectError);
    }

    private onSocketOpen() {
        console.log("成功建立websocket链接");
    }

    private onSocketClose() {
        console.log("关闭websocket连接");
    }

    private onConnectError(error) {
        console.log(error);
    }

    private onMessageRev(res: string) {
        console.log(res);
        let data = JSON.parse(res);
        let self = this;
        switch (data.key) {
            case MsgKeyPush.roleInfo:
                self.receiveRoleInfo(data.data);
                break;
            case MsgKey.createRoom:
            case MsgKey.joinRoom:
                if (typeof data.data == 'string') {
                    if (data.data != ErrMsg.ok) {
                        console.log(data.data);
                    }
                } else {
                    E.ins.event(EventName.roomInfo, data.data);
                }
                break;
            case MsgKeyPush.roomInfo:
                E.ins.event(EventName.roomInfo, data.data);
                break;
            case MsgKeyPush.fightInfo:
                E.ins.event(EventName.fightInfo, data.data);
                break;
            default:
                break;
        }
    }

    public sendMsg(key: string, data: any) {
        let msg = new MsgReceive();
        msg.key = key;
        if (data) {
            msg.data = data;
        }
        this.socket.send(JSON.stringify(msg));
    }

    private receiveRoleInfo(data: roleBaseInfo) {
        this.id = data.roleId;
    }
}