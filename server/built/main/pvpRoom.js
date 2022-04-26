"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("../common/code");
var pvpMgr_1 = require("../manager/pvpMgr");
var mainMsg_1 = require("../message/mainMsg");
var fight_1 = require("../model/fight");
var ROOM_MAX_MEMBER = 2; //房间最大人数是2
var ROOM_START_MEMBER = 2; //房间可以开始游戏的人数
/**
 * pvp房间实例，定时器确定回合，消息推送，战斗管理
 */
var PvpRoom = /** @class */ (function () {
    function PvpRoom(role, id) {
        this.memberList = [];
        this.roomState = code_1.RoomState.wait;
        /*********************************下面是pvp战斗管理相关**************************************************** */
        this.roundTime = 5000; //回合开始后玩家的决策时间
        this.showTime = 2000; //回合结束后结果的展示时间
        this.fightIns = fight_1.Fight.getIns(this); //战斗逻辑底层
        this.memberList.push(role);
        this.id = id;
        role.updateState(code_1.RoleState.room);
        this._clientInfo = new mainMsg_1.roomBaseInfo();
        this._clientInfo.roomId = id;
    }
    PvpRoom.prototype.joinRoom = function (role) {
        if (this.memberList.length >= ROOM_MAX_MEMBER) {
            return code_1.ErrMsg.pvpRoomNotExsists;
        }
        this.memberList.push(role);
        pvpMgr_1.PvpMgr.getIns().roomAddRole(this, role);
        role.updateState(code_1.RoleState.room);
        return code_1.ErrMsg.ok;
    };
    //离开房间，游戏中离开视为认输
    PvpRoom.prototype.leaveRoom = function (role) {
        role.updateState(code_1.RoleState.free);
        if (this.roomState == code_1.RoomState.play) {
            this.roomState = code_1.RoomState.wait;
            this.gameOver();
        }
        var newMemberList = [];
        for (var _i = 0, _a = this.memberList; _i < _a.length; _i++) {
            var ele = _a[_i];
            if (ele.id != role.id) {
                newMemberList.push(ele);
            }
        }
        this.memberList = newMemberList;
        if (this.memberList.length == 0) {
            pvpMgr_1.PvpMgr.getIns().closeRoom(this);
        }
        else {
            this.publishRoleState(role);
        }
        return code_1.ErrMsg.ok;
    };
    PvpRoom.prototype.roleReady = function (role) {
        //更新并广播状态
        role.updateState(code_1.RoleState.ready);
        this.publishRoleState(role);
        //所有人准备完成后就开始游戏
        if (this.memberList.length < ROOM_START_MEMBER) {
            return code_1.ErrMsg.ok;
        }
        var allReadyFlo = true;
        for (var _i = 0, _a = this.memberList; _i < _a.length; _i++) {
            var ele = _a[_i];
            if (ele.getState() != code_1.RoleState.ready) {
                allReadyFlo = false;
            }
        }
        if (allReadyFlo) {
            this.startGame();
        }
        return code_1.ErrMsg.ok;
    };
    PvpRoom.prototype.roleCancelReady = function (role) {
        if (this.roomState == code_1.RoomState.play) {
            return code_1.ErrMsg.gameAlreadyStart;
        }
        role.updateState(code_1.RoleState.room);
        this.publishRoleState(role);
        return code_1.ErrMsg.ok;
    };
    PvpRoom.prototype.publishRoleState = function (role) {
        var msg = new mainMsg_1.roleStateMsg();
        msg.roleId = role.id;
        msg.state = role.getState();
        this.publishAllMember(mainMsg_1.MsgKeyPush.roomRoleState, msg);
    };
    PvpRoom.prototype.publishAllMember = function (key, data) {
        for (var _i = 0, _a = this.memberList; _i < _a.length; _i++) {
            var member = _a[_i];
            member.sendMsg(key, data);
        }
    };
    PvpRoom.prototype.getRoomInfo2Client = function () {
        this._clientInfo.state = this.roomState;
        this._clientInfo.memberList.length = 0;
        for (var _i = 0, _a = this.memberList; _i < _a.length; _i++) {
            var ele = _a[_i];
            this._clientInfo.memberList.push(ele.getBaseInfo());
        }
        return this._clientInfo;
    };
    PvpRoom.prototype.startGame = function () {
        this.roomState = code_1.RoomState.play;
        this.publishAllMember(mainMsg_1.MsgKeyPush.pvpStart, null);
        for (var _i = 0, _a = this.memberList; _i < _a.length; _i++) {
            var ele = _a[_i];
            ele.updateState(code_1.RoleState.game);
        }
        this.fightIns.init();
        this.processRound();
    };
    //一个回合
    PvpRoom.prototype.processRound = function () {
        var _this = this;
        var self = this;
        self.fightIns.roundStart();
        setTimeout(function () {
            if (_this.roomState != code_1.RoomState.play) {
                return;
            }
            self.fightIns.roundEnd();
            setTimeout(function () {
                if (_this.roomState != code_1.RoomState.play) {
                    return;
                }
                var overFlo = self.fightIns.checkOver();
                if (overFlo) {
                    self.gameOver();
                }
                else {
                    self.processRound();
                }
            }, self.showTime);
        }, self.roundTime);
    };
    PvpRoom.prototype.gameOver = function () {
        //修改状态,通知结果
        this.roomState = code_1.RoomState.wait;
        for (var _i = 0, _a = this.memberList; _i < _a.length; _i++) {
            var ele = _a[_i];
            ele.updateState(code_1.RoleState.room);
            // ele.sendMsg();
        }
    };
    return PvpRoom;
}());
exports.PvpRoom = PvpRoom;
//# sourceMappingURL=pvpRoom.js.map