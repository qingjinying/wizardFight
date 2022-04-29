import { RoomState, RoundState } from "../common/code";
import { E, EventName } from "../manager/E";
import { Role } from "../model/role";
import { fightResult, fightRoleInfo, roleBaseInfo, roomBaseInfo, roomFightInfo } from "../Msg/mainMsg";
import { RoomView } from "../view/RoomView";

export class RoomCtrl {
    private _view: RoomView;

    public roomId: number;
    public state: RoomState;
    public memberList: roleBaseInfo[];

    public fightRound: number;
    public fightState: RoundState;
    public fightRoleList: fightRoleInfo[];
    public curCardIndex: number = 0; //我当前选择的出牌
    constructor() {
        this._view = new RoomView(this);
        E.ins.on(EventName.startGame,this,this.showView);
        E.ins.on(EventName.roomInfo,this,this.updateRoomInfo);
        E.ins.on(EventName.fightInfo,this,this.updateFightInfo);
        E.ins.on(EventName.gameOver,this,this.gameOver);
    }

    private showView() {
        this._view.open();
    }

    private updateRoomInfo(data: roomBaseInfo) {
        this.roomId = data.roomId;
        this.state = data.state;
        this.memberList = data.memberList;
        if (this.state == RoomState.wait) {
            this._view.updateView_wait();
        }
    }

    private updateFightInfo(data: roomFightInfo) {
        this.fightRound = data.round;
        this.fightState = data.state;
        this.fightRoleList = data.fightRoleList;
        for (let ele of this.fightRoleList) {
            if (ele.roleId == Role.getIns().id) {
                this.curCardIndex = ele.curCardIndex;
            }
        }
        if (this.state == RoomState.play) {
            this._view.updateView_wait();
        }
    }

    private gameOver(data: fightResult) {
        this._view.upateView_over(data);
    }
}