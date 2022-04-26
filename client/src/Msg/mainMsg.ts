import { RoleState, RoomState } from "../common/code";

//所有来自客户端的协议key枚举
export enum MsgKey {
    createRoom = "createRoom", //创建房间
    joinRoom = "joinRoom",   //加入房间
    leaveRoom = "leaveRoom", //离开房间
    roleReady = "roleReady", //玩家准备
    roleCancelReady = "roleCancelReady", //取消准备
    setSendCard = "setSendCard", //设置出牌
    cancelSendCard = "cancelSendCard" //取消出牌
}

//所有服务器主动推送的协议key
export enum MsgKeyPush {
    roleInfo = "roleInfo",
    roomRoleState =  "roomRoleState", //玩家状态
    pvpStart = "pvpStart",  //开始
}

//来自客户端的协议
export class MsgReceive {
    key: string;
    data: any;
}

//加入房间
export class JoinRoomMsg {
    roomId: number;
}

//设置出牌
export class SetSendCardMsg {
    index: number;
}



//服务器发送的协议
export class MsgSend {
    key: string;
    data: any;
}

//广播房间内一个玩家的状态
export class roleStateMsg {
    roleId: number;
    state: RoleState;
}

//一个房间的信息
export class roomMsg {
    roomId: number;
    memberList: roleBaseInfo[];
}

//一个玩家的基本信息
export class roleBaseInfo {
    roleId: number;
    state: RoleState;
}

//一个房间的基本数据
export class roomBaseInfo {
    roomId: number;
    state: RoomState;
    memberList: roleBaseInfo[];
}

/**
 * id
 * 状态 等待中，游戏中
 * 房间的成员信息 玩家的基本信息
 * 当前回合
 * 
 * 战斗数据 变化时更新
 * 成员的战斗数据 手牌，魔力值
 * 
 * 战斗区，玩家的出牌结果
 * 
 * 第一回合开始
 * 玩家拿到手牌和魔力值，客户端开始倒计时
 * 
 * 展示出牌和战斗结果，玩家手牌清空并扣除魔力值
 * 
 */