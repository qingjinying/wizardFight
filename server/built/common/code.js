"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//错误类型枚举
var ErrMsg;
(function (ErrMsg) {
    ErrMsg["ok"] = "ok";
    ErrMsg["paramError"] = "paramError";
    ErrMsg["roleAlreadyJoinRoom"] = "roleAlreadyJoinRoom";
    ErrMsg["pvpRoomNotExsists"] = "pvpRoomNotExsists";
    ErrMsg["pvpRoomMaxMember"] = "pvpRoomMaxMember";
    ErrMsg["gameAlreadyStart"] = "gameAlreadyStart";
    ErrMsg["roundNotStart"] = "roundNotStart";
    ErrMsg["cardNotHand"] = "cardNotHand";
})(ErrMsg = exports.ErrMsg || (exports.ErrMsg = {}));
//玩家状态枚举
var RoleState;
(function (RoleState) {
    RoleState[RoleState["free"] = 0] = "free";
    RoleState[RoleState["room"] = 1] = "room";
    RoleState[RoleState["ready"] = 2] = "ready";
    RoleState[RoleState["game"] = 3] = "game";
})(RoleState = exports.RoleState || (exports.RoleState = {}));
//房间状态枚举
var RoomState;
(function (RoomState) {
    RoomState[RoomState["wait"] = 0] = "wait";
    RoomState[RoomState["play"] = 1] = "play";
})(RoomState = exports.RoomState || (exports.RoomState = {}));
//玩家战斗状态枚举
var FightState;
(function (FightState) {
    FightState[FightState["attack"] = 0] = "attack";
    FightState[FightState["defend"] = 1] = "defend";
})(FightState = exports.FightState || (exports.FightState = {}));
//一个回合的状态
var RoundState;
(function (RoundState) {
    RoundState[RoundState["no"] = 0] = "no";
    RoundState[RoundState["start"] = 1] = "start";
    RoundState[RoundState["end"] = 2] = "end"; //结束
})(RoundState = exports.RoundState || (exports.RoundState = {}));
//卡牌id枚举 
var CardID;
(function (CardID) {
    CardID[CardID["kill"] = 1] = "kill";
    CardID[CardID["superKill"] = 2] = "superKill";
    CardID[CardID["maxKill"] = 3] = "maxKill";
    CardID[CardID["miss"] = 101] = "miss";
    CardID[CardID["superMiss"] = 102] = "superMiss";
})(CardID = exports.CardID || (exports.CardID = {}));
//# sourceMappingURL=code.js.map