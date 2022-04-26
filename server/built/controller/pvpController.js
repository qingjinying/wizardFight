"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("../common/code");
var pvpMgr_1 = require("../manager/pvpMgr");
var PvpController = /** @class */ (function () {
    function PvpController(role) {
        this.role = role;
    }
    //创建一个房间，返回房间信息
    PvpController.prototype.createRoom = function () {
        var pvpMgr = pvpMgr_1.PvpMgr.getIns();
        return pvpMgr.createRoom(this.role);
    };
    //加入一个房间，返回房间信息
    PvpController.prototype.joinRoom = function (msg) {
        var roomId = msg.roomId;
        if (!roomId) {
            return code_1.ErrMsg.paramError;
        }
        var pvpMgr = pvpMgr_1.PvpMgr.getIns();
        return pvpMgr.joinRoom(this.role, roomId);
    };
    //离开房间
    PvpController.prototype.leaveRoom = function () {
        var pvpMgr = pvpMgr_1.PvpMgr.getIns();
        return pvpMgr.leaveRoom(this.role);
    };
    //准备
    PvpController.prototype.roleReady = function () {
        var pvpMgr = pvpMgr_1.PvpMgr.getIns();
        return pvpMgr.roleReady(this.role);
    };
    //取消准备，返回code
    PvpController.prototype.roleCancelReady = function () {
        var pvpMgr = pvpMgr_1.PvpMgr.getIns();
        return pvpMgr.roleCancelReady(this.role);
    };
    //设置出牌
    PvpController.prototype.setSendCard = function (msg) {
        var index = msg.index;
        return this.role.fightRole.setSendCard(index);
    };
    //取消出牌
    PvpController.prototype.cancelSendCard = function () {
        return this.role.fightRole.cancelSendCard();
    };
    return PvpController;
}());
exports.PvpController = PvpController;
//# sourceMappingURL=pvpController.js.map