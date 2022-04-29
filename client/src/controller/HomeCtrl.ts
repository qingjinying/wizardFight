import { E, EventName } from "../manager/E";
import { Role } from "../model/role";
import { MsgKey } from "../Msg/mainMsg";
import { HomeView } from "../view/HomeView";

export class HomeCtrl {
    private _view: HomeView
    constructor() {
        this._view = new HomeView(this);
        E.ins.on(EventName.openHome,this,this.showView);
    }

    private showView() {
        this._view.open();
    }

    public createRoom() {
        Role.getIns().sendMsg(MsgKey.createRoom, null);
    }
}