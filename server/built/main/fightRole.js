"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("../common/code");
var fightCard_1 = require("./fightCard");
/**
 * 玩家的战斗实例
 */
var FightRole = /** @class */ (function () {
    function FightRole(role) {
        this.blood = 1; //血量
        this.magicValue = 0; //魔力值
        this.isWin = true; //比赛结果
        this.role = role;
    }
    FightRole.getIns = function (role) {
        return new FightRole(role);
    };
    FightRole.prototype.resetData = function () {
        this.blood = 1;
        this.magicValue = 0;
        this.isWin = true;
    };
    //设置战斗状态
    FightRole.prototype.setFightState = function (state) {
        this.fightState = state;
    };
    //给魔力值
    FightRole.prototype.addMagicValue = function (value) {
        this.magicValue += value;
    };
    //发牌
    FightRole.prototype.receiveCard = function () {
        //清空手牌和出牌
        this.cardList.length = 0;
        this.curRoundCard = null;
        //根据当前魔力值和攻守状态获取手牌
        if (this.fightState == code_1.FightState.attack) {
            this.addAttackCard();
        }
        else if (this.fightState == code_1.FightState.defend) {
            this.addDefendCard();
        }
        else {
            console.log("error,fightState" + this.fightState);
        }
    };
    FightRole.prototype.addAttackCard = function () {
        if (this.magicValue >= 1) {
            this.cardList.push(fightCard_1.FightCard.getIns(code_1.CardID.kill));
        }
        if (this.magicValue >= 2) {
            this.cardList.push(fightCard_1.FightCard.getIns(code_1.CardID.superKill));
        }
        if (this.magicValue >= 3) {
            this.cardList.push(fightCard_1.FightCard.getIns(code_1.CardID.maxKill));
        }
    };
    FightRole.prototype.addDefendCard = function () {
        if (this.magicValue >= 1) {
            this.cardList.push(fightCard_1.FightCard.getIns(code_1.CardID.miss));
        }
        if (this.magicValue >= 2) {
            this.cardList.push(fightCard_1.FightCard.getIns(code_1.CardID.superMiss));
        }
    };
    //扣魔力
    FightRole.prototype.reduceMagic = function () {
        if (!this.curRoundCard) {
            return;
        }
        if (this.curRoundCard.magicValue > this.magicValue) {
            this.curRoundCard = null;
            return;
        }
        this.magicValue -= this.curRoundCard.magicValue;
    };
    //扣血
    FightRole.prototype.reduceBlood = function (value) {
        this.blood -= value;
    };
    //设置失败
    FightRole.prototype.setFail = function () {
        this.isWin = false;
    };
    //设置出牌
    FightRole.prototype.setSendCard = function (index) {
        if (this.fight.roundState != code_1.RoundState.start) {
            return code_1.ErrMsg.roundNotStart;
        }
        var card = this.cardList[index];
        if (!card) {
            return code_1.ErrMsg.cardNotHand;
        }
        this.curRoundCard = card;
        return code_1.ErrMsg.ok;
    };
    //取消出牌
    FightRole.prototype.cancelSendCard = function () {
        if (this.fight.roundState != code_1.RoundState.start) {
            return code_1.ErrMsg.roundNotStart;
        }
        this.curRoundCard = null;
        return code_1.ErrMsg.ok;
    };
    return FightRole;
}());
exports.FightRole = FightRole;
//# sourceMappingURL=fightRole.js.map