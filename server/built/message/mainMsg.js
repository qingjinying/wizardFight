"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//所有来自客户端的协议key枚举
var MsgKey;
(function (MsgKey) {
    MsgKey["createRoom"] = "createRoom";
    MsgKey["joinRoom"] = "joinRoom";
    MsgKey["leaveRoom"] = "leaveRoom";
    MsgKey["roleReady"] = "roleReady";
    MsgKey["roleCancelReady"] = "roleCancelReady";
    MsgKey["setSendCard"] = "setSendCard";
    MsgKey["cancelSendCard"] = "cancelSendCard"; //取消出牌
})(MsgKey = exports.MsgKey || (exports.MsgKey = {}));
//所有服务器主动推送的协议key
var MsgKeyPush;
(function (MsgKeyPush) {
    MsgKeyPush["roomRoleState"] = "roomRoleState";
    MsgKeyPush["pvpStart"] = "pvpStart";
})(MsgKeyPush = exports.MsgKeyPush || (exports.MsgKeyPush = {}));
//来自客户端的协议
var MsgReceive = /** @class */ (function () {
    function MsgReceive() {
    }
    return MsgReceive;
}());
exports.MsgReceive = MsgReceive;
//加入房间
var JoinRoomMsg = /** @class */ (function () {
    function JoinRoomMsg() {
    }
    return JoinRoomMsg;
}());
exports.JoinRoomMsg = JoinRoomMsg;
//设置出牌
var SetSendCardMsg = /** @class */ (function () {
    function SetSendCardMsg() {
    }
    return SetSendCardMsg;
}());
exports.SetSendCardMsg = SetSendCardMsg;
//服务器发送的协议
var MsgSend = /** @class */ (function () {
    function MsgSend() {
    }
    return MsgSend;
}());
exports.MsgSend = MsgSend;
//广播房间内一个玩家的状态
var roleStateMsg = /** @class */ (function () {
    function roleStateMsg() {
    }
    return roleStateMsg;
}());
exports.roleStateMsg = roleStateMsg;
//一个房间的信息
var roomMsg = /** @class */ (function () {
    function roomMsg() {
    }
    return roomMsg;
}());
exports.roomMsg = roomMsg;
//一个玩家的基本信息
var roleBaseInfo = /** @class */ (function () {
    function roleBaseInfo() {
    }
    return roleBaseInfo;
}());
exports.roleBaseInfo = roleBaseInfo;
//一个房间的基本数据
var roomBaseInfo = /** @class */ (function () {
    function roomBaseInfo() {
    }
    return roomBaseInfo;
}());
exports.roomBaseInfo = roomBaseInfo;
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
//# sourceMappingURL=mainMsg.js.map