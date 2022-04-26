import { E, EventName } from "../manager/E";
import { ui } from "../ui/layaMaxUI";

/**
 * 首页
 */
export class RoomView extends ui.roomUI {
    constructor() {
        super();
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        console.log(this.width, this.height);
        this.leave_btn.on(Laya.Event.MOUSE_DOWN, this, this._leaveRoom);
    }
    
    private _leaveRoom() {
        E.ins.event(EventName.openHome);
        this.close();
    }
}