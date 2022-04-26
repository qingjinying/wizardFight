import { CardID, FightState, RoundState } from "../common/code";
import { FightRole } from "../main/fightRole";
import { PvpRoom } from "../main/pvpRoom";

/**
 * 战斗计算底层
 */
export class Fight {
    public static roundMagic: number = 1; //每回合开始时玩家获取的魔力值
    public static getIns(room: PvpRoom): Fight {
        return new Fight(room);
    }

    private _room: PvpRoom;
    public curRound = 0;     //当前回合
    public roundState = RoundState.no;
    public fightRoleList: FightRole[] = []; //玩家的战斗数据
    public attackRole: FightRole; //进攻方
    public defendRole: FightRole; //防守方
    constructor(room: PvpRoom) {
        this._room = room;
    }

    public init() {
        this.curRound = 0;
        this.roundState = RoundState.no;
        this.fightRoleList.length = 0;
        for (let ele of this._room.memberList) {
            ele.fightRole.fight = this;
            this.fightRoleList.push(ele.fightRole);
        }
    }

    //回合开始 
    public roundStart() {
        this.curRound++;
        this.setFightState(); //确定攻守
        this.addMagicValue(); //给魔力值
        this.receiveCard();   //发牌
        this.roundState = RoundState.start; //更新状态
    }

    //确定玩家攻守状态, 如果是第一回合随机，其它回合攻守易换
    private setFightState() {
        if (this.curRound > 1) {
            for (let ele of this.fightRoleList) {
                if (ele.fightState == FightState.attack) {
                    ele.setFightState(FightState.defend);
                    this.defendRole = ele;
                } else {
                    ele.setFightState(FightState.attack);
                    this.attackRole = ele;
                }
            }
        } else {
            this.fightRoleList[0].setFightState(FightState.attack);
            this.attackRole = this.fightRoleList[0];
            this.fightRoleList[1].setFightState(FightState.defend);
            this.attackRole = this.fightRoleList[1];
        }
    }

    //回合开始给每个玩家一点魔力值
    private addMagicValue() {
        for (let ele of this.fightRoleList) {
            ele.addMagicValue(Fight.roundMagic);
        }
    }

    //回合开始时每个玩家获取手牌
    private receiveCard() {
        for (let ele of this.fightRoleList) {
            ele.receiveCard();
        }
    }


    //回合结束，计算战斗,这个先简单的写一下，后续版本可以重构
    public roundEnd() {
        this.roundState = RoundState.end; //更新状态
        this.reduceMagic(); //扣魔力

        let attackCard = this.attackRole.curRoundCard;
        let defendCard = this.defendRole.curRoundCard;
        //攻方没出牌
        if (!attackCard) {
            return;
        }
        //守方没出牌, 当前版本攻击方只有杀类型牌
        if (!defendCard) {
            this.defendRole.reduceBlood(1);
        }
        let attackId = attackCard.id;
        let defendId = defendCard.id;
        switch (attackId) {
            case CardID.kill:
                if (defendId == CardID.miss || defendId == CardID.superMiss) {
                    return
                }
                this.defendRole.reduceBlood(1);
                break;
            case CardID.superKill:
                if (defendId == CardID.superMiss) {
                    return
                }
                this.defendRole.reduceBlood(1);
                break;
            case CardID.maxKill:
                this.defendRole.reduceBlood(1);
                break;
            default:
                console.log(`attackId,error:${attackId}`);
                break;
        }
    }

    //扣魔力
    private reduceMagic() {
        for (let ele of this.fightRoleList) {
            ele.reduceMagic();
        }
    }

    /**
     * 检查是否分出胜负, 分出为true
     */
    public checkOver(): boolean {
        for (let ele of this.fightRoleList) {
            if (ele.blood <= 0) {
                ele.setFail();
                return true;
            }
        }
        return false;
    }
}