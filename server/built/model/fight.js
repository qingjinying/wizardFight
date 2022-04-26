"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("../common/code");
/**
 * 战斗计算底层
 */
var Fight = /** @class */ (function () {
    function Fight(room) {
        this.curRound = 0; //当前回合
        this.roundState = code_1.RoundState.no;
        this.fightRoleList = []; //玩家的战斗数据
        this._room = room;
    }
    Fight.getIns = function (room) {
        return new Fight(room);
    };
    Fight.prototype.init = function () {
        this.curRound = 0;
        this.roundState = code_1.RoundState.no;
        this.fightRoleList.length = 0;
        for (var _i = 0, _a = this._room.memberList; _i < _a.length; _i++) {
            var ele = _a[_i];
            ele.fightRole.fight = this;
            this.fightRoleList.push(ele.fightRole);
        }
    };
    //回合开始 
    Fight.prototype.roundStart = function () {
        this.curRound++;
        this.setFightState(); //确定攻守
        this.addMagicValue(); //给魔力值
        this.receiveCard(); //发牌
        this.roundState = code_1.RoundState.start; //更新状态
    };
    //确定玩家攻守状态, 如果是第一回合随机，其它回合攻守易换
    Fight.prototype.setFightState = function () {
        if (this.curRound > 1) {
            for (var _i = 0, _a = this.fightRoleList; _i < _a.length; _i++) {
                var ele = _a[_i];
                if (ele.fightState == code_1.FightState.attack) {
                    ele.setFightState(code_1.FightState.defend);
                    this.defendRole = ele;
                }
                else {
                    ele.setFightState(code_1.FightState.attack);
                    this.attackRole = ele;
                }
            }
        }
        else {
            this.fightRoleList[0].setFightState(code_1.FightState.attack);
            this.attackRole = this.fightRoleList[0];
            this.fightRoleList[1].setFightState(code_1.FightState.defend);
            this.attackRole = this.fightRoleList[1];
        }
    };
    //回合开始给每个玩家一点魔力值
    Fight.prototype.addMagicValue = function () {
        for (var _i = 0, _a = this.fightRoleList; _i < _a.length; _i++) {
            var ele = _a[_i];
            ele.addMagicValue(Fight.roundMagic);
        }
    };
    //回合开始时每个玩家获取手牌
    Fight.prototype.receiveCard = function () {
        for (var _i = 0, _a = this.fightRoleList; _i < _a.length; _i++) {
            var ele = _a[_i];
            ele.receiveCard();
        }
    };
    //回合结束，计算战斗,这个先简单的写一下，后续版本可以重构
    Fight.prototype.roundEnd = function () {
        this.roundState = code_1.RoundState.end; //更新状态
        this.reduceMagic(); //扣魔力
        var attackCard = this.attackRole.curRoundCard;
        var defendCard = this.defendRole.curRoundCard;
        //攻方没出牌
        if (!attackCard) {
            return;
        }
        //守方没出牌, 当前版本攻击方只有杀类型牌
        if (!defendCard) {
            this.defendRole.reduceBlood(1);
        }
        var attackId = attackCard.id;
        var defendId = defendCard.id;
        switch (attackId) {
            case code_1.CardID.kill:
                if (defendId == code_1.CardID.miss || defendId == code_1.CardID.superMiss) {
                    return;
                }
                this.defendRole.reduceBlood(1);
                break;
            case code_1.CardID.superKill:
                if (defendId == code_1.CardID.superMiss) {
                    return;
                }
                this.defendRole.reduceBlood(1);
                break;
            case code_1.CardID.maxKill:
                this.defendRole.reduceBlood(1);
                break;
            default:
                console.log("attackId,error:" + attackId);
                break;
        }
    };
    //扣魔力
    Fight.prototype.reduceMagic = function () {
        for (var _i = 0, _a = this.fightRoleList; _i < _a.length; _i++) {
            var ele = _a[_i];
            ele.reduceMagic();
        }
    };
    /**
     * 检查是否分出胜负, 分出为true
     */
    Fight.prototype.checkOver = function () {
        for (var _i = 0, _a = this.fightRoleList; _i < _a.length; _i++) {
            var ele = _a[_i];
            if (ele.blood <= 0) {
                ele.setFail();
                return true;
            }
        }
        return false;
    };
    Fight.roundMagic = 1; //每回合开始时玩家获取的魔力值
    return Fight;
}());
exports.Fight = Fight;
//# sourceMappingURL=fight.js.map