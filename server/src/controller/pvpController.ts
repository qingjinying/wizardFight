import { ErrMsg } from "../common/code";
import { Role } from "../main/role";
import { PvpMgr } from "../manager/pvpMgr";
import { JoinRoomMsg, SetSendCardMsg } from "../message/mainMsg";

export class PvpController {
    private role: Role
    constructor(role: Role) {
        this.role = role;
    }

    //创建一个房间，返回房间信息
    createRoom() {
        let pvpMgr = PvpMgr.getIns();
        return pvpMgr.createRoom(this.role);
    }

    //加入一个房间，返回房间信息
    joinRoom(msg: JoinRoomMsg) {
        let roomId: number = msg.roomId;
        if (!roomId) {
            return ErrMsg.paramError;
        }
        let pvpMgr = PvpMgr.getIns();
        return pvpMgr.joinRoom(this.role, roomId);
    }

    //离开房间
    leaveRoom() {
        let pvpMgr = PvpMgr.getIns();
        return pvpMgr.leaveRoom(this.role);
    }

    //准备
    roleReady() {
        let pvpMgr = PvpMgr.getIns();
        return pvpMgr.roleReady(this.role);
    }

    //取消准备，返回code
    roleCancelReady() {
        let pvpMgr = PvpMgr.getIns();
        return pvpMgr.roleCancelReady(this.role);
    }

    //设置出牌
    setSendCard(msg: SetSendCardMsg) {
        let index: number = msg.index;
        return this.role.fightRole.setSendCard(index);
    }

    //取消出牌
    cancelSendCard() {
        return this.role.fightRole.cancelSendCard();
    }
}