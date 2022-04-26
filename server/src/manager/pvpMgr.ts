import { ErrMsg } from "../common/code";
import { PvpRoom } from "../main/pvpRoom";
import { Role } from "../main/role";
import { roomBaseInfo } from "../message/mainMsg";

/**
 * 1v1pvp管理器，创建销毁房间等等
 */
export class PvpMgr {
    private static _ins: PvpMgr;
    private static _id: number;
    public static getIns() {
        if (!this._ins) {
            this._ins = new PvpMgr();
        }
        return this._ins;
    }

    public roomMap: any = {};
    public roleMap: any = {};
    constructor() {

    }

    //创建一个房间
    public createRoom(role: Role) {
        if (this.roleMap[role.id]) {
            return ErrMsg.roleAlreadyJoinRoom;
        }
        let id = ++PvpMgr._id;
        let room = new PvpRoom(role, id);
        this.roomMap[id] = room;
        this.roleMap[role.id] = room;
        return room.getRoomInfo2Client(); //房间信息
    }

    //加入一个房间
    public joinRoom(role: Role, id: number) {
        if (this.roleMap[role.id]) {
            return ErrMsg.roleAlreadyJoinRoom;
        }
        let room = this.roomMap[id] as PvpRoom;
        if (!room) {
            return ErrMsg.pvpRoomNotExsists;
        }
        room.joinRoom(role);
        return room.getRoomInfo2Client();
    }
    //后端接口，加入一个房间
    public roomAddRole(room: PvpRoom, role: Role) {
        this.roleMap[role.id] = room;
    }

    //退出房间
    public leaveRoom(role: Role) {
        let room = this.roleMap[role.id] as PvpRoom;
        if (!room) {
            return ErrMsg.pvpRoomNotExsists;
        }
        let res = room.leaveRoom(role);
        if (res != ErrMsg.ok) {
            return res;
        }
        delete this.roleMap[role.id];
        return ErrMsg.ok;
    }
    //后端接口，关闭一个房间
    public closeRoom(room: PvpRoom) {
        delete this.roomMap[room.id];
    }

    //点击准备
    public roleReady(role: Role) {
        let room = this.roleMap[role.id] as PvpRoom;
        if (!room) {
            return ErrMsg.pvpRoomNotExsists;
        }
        return room.roleReady(role);
    }

    //取消准备
    public roleCancelReady(role: Role) {
        let room = this.roleMap[role.id] as PvpRoom;
        if (!room) {
            return ErrMsg.pvpRoomNotExsists;
        }
        return room.roleCancelReady(role);
    }
}