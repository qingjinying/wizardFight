"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("../common/code");
var FightCard = /** @class */ (function () {
    function FightCard(id) {
        this.id = id;
        this.init();
    }
    FightCard.getIns = function (id) {
        return new FightCard(id);
    };
    FightCard.prototype.init = function () {
        //迭代后改成读表
        switch (this.id) {
            case code_1.CardID.kill:
            case code_1.CardID.miss:
                this.magicValue = 1;
                break;
            case code_1.CardID.superKill:
            case code_1.CardID.superMiss:
                this.magicValue = 2;
                break;
            case code_1.CardID.maxKill:
                this.magicValue = 3;
            default:
                break;
        }
    };
    return FightCard;
}());
exports.FightCard = FightCard;
//# sourceMappingURL=fightCard.js.map