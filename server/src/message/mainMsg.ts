import { CardID, FightState, RoleState, RoomState, RoundState } from "../common/code";

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
    roomInfo =  "roomInfo",
    fightInfo = "fightInfo",
    pvpStart = "pvpStart",  //开始
    gameOver = "gameOver",
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

//一个房间的战斗数据
export class roomFightInfo {
    round: number;   //回合数
    state: RoundState;  //回合状态
    fightRoleList: fightRoleInfo[]; //玩家的战斗数据
}

//一个玩家的战斗数据
export class fightRoleInfo {
    public roleId: number; 
    public blood: number;//血量
    public magicValue: number;//魔力值
    public isWin: boolean; //比赛结果
    public fightState: FightState;//战斗状态，进攻or防守
    public cardList: cardFightInfo[];//手牌数组
    public curRoundCard: cardFightInfo; //当前回合打出的牌
    public curCardIndex: number; //当前回合选择打出的牌下标，从1开始，0代表未打出
}

//一个卡牌的战斗数据
export class cardFightInfo {
    cardId: CardID;
}

//战斗结果
export class fightResult {
    winId: number; //获胜者id
}