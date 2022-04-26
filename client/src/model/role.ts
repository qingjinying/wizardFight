import { MsgKeyPush, roleBaseInfo } from "../Msg/mainMsg";

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
        
            default:
                break;
        }
    }

    private sendMsg(key: string, data: any) {
        
    }

    private receiveRoleInfo(data: roleBaseInfo) {
        this.id = data.roleId;
    }

    public createRoom() {
        
    }
}