"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("../common/code");
var pvpRoom_1 = require("../main/pvpRoom");
/**
 * 1v1pvp管理器，创建销毁房间等等
 */
var PvpMgr = /** @class */ (function () {
    function PvpMgr() {
        this.roomMap = {};
        this.roleMap = {};
    }
    PvpMgr.getIns = function () {
        if (!this._ins) {
            this._ins = new PvpMgr();
        }
        return this._ins;
    };
    //创建一个房间
    PvpMgr.prototype.createRoom = function (role) {
        if (this.roleMap[role.id]) {
            return code_1.ErrMsg.roleAlreadyJoinRoom;
        }
        var id = ++PvpMgr._id;
        var room = new pvpRoom_1.PvpRoom(role, id);
        this.roomMap[id] = room;
        this.roleMap[role.id] = room;
        return room.getRoomInfo2Client(); //房间信息
    };
    //加入一个房间
    PvpMgr.prototype.joinRoom = function (role, id) {
        if (this.roleMap[role.id]) {
            return code_1.ErrMsg.roleAlreadyJoinRoom;
        }
        var room = this.roomMap[id];
        if (!room) {
            return code_1.ErrMsg.pvpRoomNotExsists;
        }
        room.joinRoom(role);
        return room.getRoomInfo2Client();
    };
    //后端接口，加入一个房间
    PvpMgr.prototype.roomAddRole = function (room, role) {
        this.roleMap[role.id] = room;
    };
    //退出房间
    PvpMgr.prototype.leaveRoom = function (role) {
        var room = this.roleMap[role.id];
        if (!room) {
            return code_1.ErrMsg.pvpRoomNotExsists;
        }
        var res = room.leaveRoom(role);
        if (res != code_1.ErrMsg.ok) {
            return res;
        }
        delete this.roleMap[role.id];
        return code_1.ErrMsg.ok;
    };
    //后端接口，关闭一个房间
    PvpMgr.prototype.closeRoom = function (room) {
        delete this.roomMap[room.id];
    };
    //点击准备
    PvpMgr.prototype.roleReady = function (role) {
        var room = this.roleMap[role.id];
        if (!room) {
            return code_1.ErrMsg.pvpRoomNotExsists;
        }
        return room.roleReady(role);
    };
    //取消准备
    PvpMgr.prototype.roleCancelReady = function (role) {
        var room = this.roleMap[role.id];
        if (!room) {
            return code_1.ErrMsg.pvpRoomNotExsists;
        }
        return room.roleCancelReady(role);
    };
    return PvpMgr;
}());
exports.PvpMgr = PvpMgr;
//# sourceMappingURL=pvpMgr.js.map