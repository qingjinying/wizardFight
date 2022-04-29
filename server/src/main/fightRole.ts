import { CardID, ErrMsg, FightState, RoundState } from "../common/code";
import { fightRoleInfo, MsgKeyPush } from "../message/mainMsg";
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
    public curCardIndex: number = 0; //当前回合选择打出的牌下标，从1开始，0代表未打出

    private _clientInfo: fightRoleInfo = new fightRoleInfo();
    constructor(role: Role) {
        this.role = role;
    }

    public resetData() {
        this.blood = 1;
        this.magicValue = 0;
        this.isWin = true;
    }

    public getFightRoleInfo2Client() {
        this._clientInfo.roleId = this.role.id;
        this._clientInfo.blood = this.blood;
        this._clientInfo.magicValue = this.magicValue;
        this._clientInfo.isWin = this.isWin;
        this._clientInfo.fightState = this.fightState;
        this._clientInfo.cardList.length = 0;
        for (let ele of this.cardList) {
            this._clientInfo.cardList.push(ele.getCardFightInfo2Client());
        }
        if (this.curRoundCard) {
            this._clientInfo.curRoundCard = this.curRoundCard.getCardFightInfo2Client();
        } else {
            this._clientInfo.curRoundCard = null;
        }
        this._clientInfo.curCardIndex = this.curCardIndex;
        return this._clientInfo;
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
            this.curCardIndex = 0;
            return;
        }

        this.magicValue -= this.curRoundCard.magicValue;
    }

    //删除打出的手牌
    public delEmitCard() {
        if (!this.curCardIndex) {
            return;
        }
        this.cardList.splice(this.curCardIndex - 1, 1);
        this.curCardIndex = 0;
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
        let card = this.cardList[index - 1];
        if (!card) {
            return ErrMsg.cardNotHand;
        }
        this.curRoundCard = card;
        this.curCardIndex = index;
        this.fight.getRoomIns().publishAllMember(MsgKeyPush.roomInfo, this.fight.getRoomIns().getRoomInfo2Client());
        return ErrMsg.ok;
    }

    //取消出牌
    public cancelSendCard() {
        if (this.fight.roundState != RoundState.start) {
            return ErrMsg.roundNotStart;
        }
        this.curRoundCard = null;
        this.curCardIndex = 0;
        this.fight.getRoomIns().publishAllMember(MsgKeyPush.roomInfo, this.fight.getRoomIns().getRoomInfo2Client());
        return ErrMsg.ok;
    }
}