import { CardID } from "../common/code";

export class FightCard {
    public id: CardID;
    public magicValue: number; //打出需要消耗的魔力值
    public static getIns(id: CardID) {
        return new FightCard(id);
    }

    constructor(id: CardID) {
        this.id = id;
        this.init();
    }

    private init() {
        //迭代后改成读表
        switch (this.id) {
            case CardID.kill:
            case CardID.miss:
                this.magicValue = 1;
                break;
            case CardID.superKill:
            case CardID.superMiss:
                this.magicValue = 2;
                break;
            case CardID.maxKill:
                this.magicValue = 3;
            default:
                break;
        }
    }
}