import { E, EventName } from "../manager/E";
import { RoomView } from "../view/RoomView";

export class RoomCtrl {
    private _view: RoomView
    constructor() {
        this._view = new RoomView();
        E.ins.on(EventName.startGame,this,this.showView);
    }

    private showView() {
        this._view.open();
    }
}