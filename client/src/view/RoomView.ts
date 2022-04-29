import { CardID, RoleState, RoundState } from "../common/code";
import { RoomCtrl } from "../controller/RoomCtrl";
import { E, EventName } from "../manager/E";
import { Role } from "../model/role";
import { fightResult, MsgKey, SetSendCardMsg } from "../Msg/mainMsg";
import { ui } from "../ui/layaMaxUI";

/**
 * 首页
 */
export class RoomView extends ui.roomUI {
    private _ctrl: RoomCtrl;
    constructor(ctrl: RoomCtrl) {
        super();
        this._ctrl = ctrl;
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        console.log(this.width, this.height);
        this.leave_btn.on(Laya.Event.MOUSE_DOWN, this, this._leaveRoom);
        this.readyBtn.on(Laya.Event.MOUSE_DOWN, this, this._ready);
        this.myCard_1.on(Laya.Event.MOUSE_DOWN, this, this._setSendCard, [1]);
        this.myCard_2.on(Laya.Event.MOUSE_DOWN, this, this._setSendCard, [2]);
        this.myCard_3.on(Laya.Event.MOUSE_DOWN, this, this._setSendCard, [3]);
    }

    private _leaveRoom() {
        E.ins.event(EventName.openHome);
        Role.getIns().sendMsg(MsgKey.leaveRoom, null);
        this.close();
    }

    private _ready() {
        Role.getIns().sendMsg(MsgKey.roleReady, null); 
    }

    private _setSendCard(index: number) {
        if (index == this._ctrl.curCardIndex) {
            Role.getIns().sendMsg(MsgKey.cancelSendCard, null); 
            return
        }
        let msg = new SetSendCardMsg();
        msg.index = index;
        Role.getIns().sendMsg(MsgKey.setSendCard, msg); 
    }

    public updateView_wait() {
        this.round.visible = false;
        this.enemyArea.visible = false;
        this.myArea.visible = false;
        this.fightArea.visible = false;
        this.fightRes.visible = false;

        this.enemyReadyState.visible = false;
        this.inviteBtn.visible = true;
        for (let ele of this._ctrl.memberList) {
            if (ele.roleId == Role.getIns().id) {
                if (ele.state == RoleState.ready) {
                    this.myReadyState.visible = true;
                    this.readyBtn.visible = false;
                } else {
                    this.myReadyState.visible = false;
                    this.readyBtn.visible = true;
                }
            } else {
                this.inviteBtn.visible = false;
                if (ele.state == RoleState.ready) {
                    this.enemyReadyState.text = "准备中......";
                } else {
                    this.enemyReadyState.text = "等待中......";
                }
                this.enemyReadyState.visible = true;
            }
        }
    }

    public updateView_play() {
        this.fightRes.visible = false;
        this.enemyReadyState.visible = false;
        this.inviteBtn.visible = false;
        this.myReadyState.visible = false;
        this.readyBtn.visible = false;

        this.round.text = `第${this._ctrl.fightRound}回合`
        this.round.visible = true;
        for (let ele of this._ctrl.fightRoleList) {
            if (ele.roleId == Role.getIns().id) {
                this.myValue.text = ele.magicValue + "";
                this.myState.skin = ele.fightState == 0 ? "res/other/进攻.png" : "res/other/防守.png"
                this.myCard_1.visible = false;
                this.myCard_2.visible = false;
                this.myCard_3.visible = false;
                this.myCard_1.y = -33;
                this.myCard_2.y = -33;
                this.myCard_3.y = -33;
                if (ele.curCardIndex > 0) {
                    this[`myCard_${ele.curCardIndex}`].y -= 20;
                }
                for (let i = 0; i < ele.cardList.length; i++) {
                    let card = ele.cardList[i];
                    this[`myCard_${i + 1}`].skin = this.getCardSkin(card.cardId);
                    this[`myCard_${i + 1}`].visible = true;
                }
            } else {
                this.enemyValue.text = ele.magicValue + "";
                this.enemyState.skin = ele.fightState == 0 ? "res/other/进攻.png" : "res/other/防守.png"
                this.enemyCard_1.visible = false;
                this.enemyCard_2.visible = false;
                this.enemyCard_3.visible = false;
                for (let i = 0; i < ele.cardList.length; i++) {
                    let card = ele.cardList[i];
                    this[`enemyCard_${i + 1}`].skin = this.getCardSkin(card.cardId);
                    this[`enemyCard_${i + 1}`].visible = true;
                }
            }
        }
        this.enemyArea.visible = true;
        this.myArea.visible =true;

        if (this._ctrl.fightState == RoundState.end) {
            for (let ele of this._ctrl.fightRoleList) {
                if (ele.roleId == Role.getIns().id) {
                    if (ele.curRoundCard) {
                        this.myEmit.skin = this.getCardSkin(ele.curRoundCard.cardId);
                        this.myEmit.visible = true;
                    } else {
                        this.myEmit.visible = false;
                    }
                } else {
                    if (ele.curRoundCard) {
                        this.enemyEmit.skin = this.getCardSkin(ele.curRoundCard.cardId);
                        this.enemyEmit.visible = true;
                    } else {
                        this.enemyEmit.visible = false;
                    }
                }
            }
            this.fightArea.visible = true
        } else {
            this.fightArea.visible = false;
        }
    }

    private getCardSkin(cardId: CardID): string {
        switch (cardId) {
            case CardID.kill:
                return "res/card/kill.png";
            case CardID.superKill:
                return "res/card/superKill.png";
            case CardID.maxKill:
                return "res/card/maxKill.png";
            case CardID.miss:
                return "res/card/miss.png";
            case CardID.superMiss:
                return "res/card/superMiss.png";
            default:
                console.log(`getCardSkin,cardId:${cardId},not,found`);
                return "";
        }
    }

    public upateView_over(data: fightResult) {
        this.fightRes.text = data.winId == Role.getIns().id ? "胜利":"失败";
        this.fightRes.visible = true;
    }
}