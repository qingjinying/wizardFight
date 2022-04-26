import { CardID, ErrMsg, FightState, RoundState } from "../common/code";
import { Fight } from "../model/fight";
import { FightCard } from "./fightCard";
import { Role } from "./role";

/**
 * 玩家的战斗实例
 */
export class FightRole {
    public static getIns(role: Role): FightRole {
        return new FightRole(role);
    }

    public role: Role; //玩家实例
    public fight: Fight; //所处的战斗实例
    public blood: number = 1;//血量
    public magicValue: number = 0;//魔力值
    public isWin: boolean = true; //比赛结果
    public fightState: FightState;//战斗状态，进攻or防守
    public cardList: FightCard[];//手牌数组
    public curRoundCard: FightCard; //当前回合打出的牌
    constructor(role: Role) {
        this.role = role;
    }

    public resetData() {
        this.blood = 1;
        this.magicValue = 0;
        this.isWin = true;
    }

    //设置战斗状态
    public setFightState(state: FightState) {
        this.fightState = state;
    }

    //给魔力值
    public addMagicValue(value: number) {
        this.magicValue += value;
    }

    //发牌
    public receiveCard() {
        //清空手牌和出牌
        this.cardList.length = 0;
        this.curRoundCard = null;
        //根据当前魔力值和攻守状态获取手牌
        if (this.fightState == FightState.attack) {
            this.addAttackCard();
        } else if (this.fightState == FightState.defend) {
            this.addDefendCard();
        } else {
            console.log(`error,fightState${this.fightState}`);
        }
    }

    private addAttackCard() {
        if (this.magicValue >= 1) {
            this.cardList.push(FightCard.getIns(CardID.kill));
        }
        if (this.magicValue >= 2) {
            this.cardList.push(FightCard.getIns(CardID.superKill));
        }
        if (this.magicValue >= 3) {
            this.cardList.push(FightCard.getIns(CardID.maxKill));
        }
    }

    private addDefendCard() {
        if (this.magicValue >= 1) {
            this.cardList.push(FightCard.getIns(CardID.miss));
        }
        if (this.magicValue >= 2) {
            this.cardList.push(FightCard.getIns(CardID.superMiss));
        }
    }

    //扣魔力
    public reduceMagic() {
        if (!this.curRoundCard) {
            return;
        }

        if (this.curRoundCard.magicValue > this.magicValue) {
            this.curRoundCard = null;
            return;
        }

        this.magicValue -= this.curRoundCard.magicValue;
    }

    //扣血
    public reduceBlood(value: number) {
        this.blood -= value;
    }

    //设置失败
    public setFail() {
        this.isWin = false;
    }

    //设置出牌
    public setSendCard(index: number) {
        if (this.fight.roundState != RoundState.start) {
            return ErrMsg.roundNotStart;
        }
        let card = this.cardList[index];
        if (!card) {
            return ErrMsg.cardNotHand;
        }
        this.curRoundCard = card;
        return ErrMsg.ok;
    }

    //取消出牌
    public cancelSendCard() {
        if (this.fight.roundState != RoundState.start) {
            return ErrMsg.roundNotStart;
        }
        this.curRoundCard = null;
        return ErrMsg.ok;
    }
}