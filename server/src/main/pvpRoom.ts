import { ErrMsg, RoleState, RoomState } from "../common/code";
import { PvpMgr } from "../manager/pvpMgr";
import { fightResult, MsgKeyPush, MsgSend, roleStateMsg, roomBaseInfo } from "../message/mainMsg";
import { Fight } from "../model/fight";
import { Role } from "./role";

const ROOM_MAX_MEMBER = 2; //房间最大人数是2
const ROOM_START_MEMBER = 2; //房间可以开始游戏的人数
/**
 * pvp房间实例，定时器确定回合，消息推送，战斗管理
 */
export class PvpRoom {
    public id: number;
    public memberList: Role[] = [];
    public roomState = RoomState.wait;
    private _clientInfo: roomBaseInfo;
    constructor(role: Role, id: number) {
        this.memberList.push(role);
        this.id = id;
        role.updateState(RoleState.room);
        this._clientInfo = new roomBaseInfo();
        this._clientInfo.roomId = id;
    }

    public joinRoom(role: Role) {
        if (this.memberList.length >= ROOM_MAX_MEMBER) {
            return ErrMsg.pvpRoomNotExsists;
        }
        this.memberList.push(role);
        PvpMgr.getIns().roomAddRole(this, role);
        role.updateState(RoleState.room);
        this.publishAllMember(MsgKeyPush.roomInfo, this.getRoomInfo2Client());
        return ErrMsg.ok;
    }

    //离开房间，游戏中离开视为认输
    public leaveRoom(role: Role) {
        role.updateState(RoleState.free);
        if (this.roomState == RoomState.play) {
            this.roomState = RoomState.wait;
            this.gameOver();
        }

        let newMemberList = [];
        for (let ele of this.memberList) {
            if (ele.id != role.id) {
                newMemberList.push(ele);
            }
        }
        this.memberList = newMemberList;
        if (this.memberList.length == 0) {
            PvpMgr.getIns().closeRoom(this);
        } else {
            this.publishAllMember(MsgKeyPush.roomInfo, this.getRoomInfo2Client());
        }
        return ErrMsg.ok;
    }

    public roleReady(role: Role) {
        //更新并广播状态
        role.updateState(RoleState.ready);
        this.publishAllMember(MsgKeyPush.roomInfo, this.getRoomInfo2Client());

        //所有人准备完成后就开始游戏
        if (this.memberList.length < ROOM_START_MEMBER) {
            return ErrMsg.ok;
        }
        let allReadyFlo = true;
        for (let ele of this.memberList) {
            if (ele.getState() != RoleState.ready) {
                allReadyFlo = false;
            }
        }
        if (allReadyFlo) {
            this.startGame();
        }
        return ErrMsg.ok;
    }

    public roleCancelReady(role: Role) {
        if (this.roomState == RoomState.play) {
            return ErrMsg.gameAlreadyStart;
        }
        role.updateState(RoleState.room);
        this.publishAllMember(MsgKeyPush.roomInfo, this.getRoomInfo2Client());
        return ErrMsg.ok;
    }

    public publishAllMember(key: string, data: any) {
        for (let member of this.memberList) {
            member.sendMsg(key, data);
        }
    }

    public getRoomInfo2Client(): roomBaseInfo {
        this._clientInfo.state = this.roomState;
        this._clientInfo.memberList.length = 0;
        for (let ele of this.memberList) {
            this._clientInfo.memberList.push(ele.getBaseInfo());
        }
        return this._clientInfo;
    }

    /*********************************下面是pvp战斗管理相关**************************************************** */
    public roundTime = 5000; //回合开始后玩家的决策时间
    public showTime = 2000;  //回合结束后结果的展示时间
    public fightIns: Fight = Fight.getIns(this); //战斗逻辑底层
    public startGame() {
        this.roomState = RoomState.play;
        this.publishAllMember(MsgKeyPush.pvpStart, null);
        for (let ele of this.memberList) {
            ele.updateState(RoleState.game);
        }
        this.fightIns.init();
        this.processRound();
    }

    //一个回合
    public processRound() {
        let self = this;
        self.fightIns.roundStart();
        this.publishAllMember(MsgKeyPush.fightInfo, this.fightIns.getRoomFightInfo2Client());
        setTimeout(() => {
            if (this.roomState != RoomState.play) {
                return;
            }
            self.fightIns.roundEnd();
            this.publishAllMember(MsgKeyPush.fightInfo, this.fightIns.getRoomFightInfo2Client());
            setTimeout(() => {
                if (this.roomState != RoomState.play) {
                    return;
                }
                let overFlo = self.fightIns.checkOver();
                if (overFlo) {
                    self.gameOver();
                } else {
                    self.processRound();
                }
            }, self.showTime);
        }, self.roundTime);
    }

    public gameOver() {
        this.roomState = RoomState.wait;
        for (let ele of this.memberList) {
            ele.updateState(RoleState.room);
        }
        let msg = new fightResult();
        msg.winId = this.fightIns.getWinId();
        this.publishAllMember(MsgKeyPush.gameOver, msg);
        let self = this;
        setTimeout(() => {
            self.publishAllMember(MsgKeyPush.roomInfo, this.getRoomInfo2Client());
        }, 3000);
    }
}