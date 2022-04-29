import { HomeCtrl } from "../controller/HomeCtrl";
import { E, EventName } from "../manager/E";
import { ui } from "../ui/layaMaxUI";

/**
 * 首页
 */
export class HomeView extends ui.homeUI {
    private _ctrl: HomeCtrl;
    private _moveFlo: boolean = true;
    private _maxRightX: number = 0;
    private _maxLeftX: number = -500;
    constructor(ctrl) {
        super();
        this._ctrl = ctrl;
        this._moveBg();
        this.startBtn.on(Laya.Event.MOUSE_DOWN, this, this._changeColor_start);
        this.startBtn.on(Laya.Event.MOUSE_UP, this, this._startGame);
        this.helpBtn.on(Laya.Event.MOUSE_DOWN, this, this._changeColor_help);
        this.helpBtn.on(Laya.Event.MOUSE_UP, this, this._startHelp);
    }

    private _moveBg() {
        if (this._moveFlo) {
            this.bg.x += 1;
            if (this.bg.x >= this._maxRightX) {
                this._moveFlo = false;
            }
        } else {
            this.bg.x -= 1;
            if (this.bg.x <= this._maxLeftX) {
                this._moveFlo = true;
            }
        }
       
        Laya.timer.once(100, this, this._moveBg);
    }
    
    private _changeColor_start() {
        let btn_text = this.startBtn.getChildByName("btn_text") as Laya.Label;
        btn_text.bgColor = "#ffffff";
        btn_text.color = "#000000";
    }

    private _startGame() {
        let btn_text = this.startBtn.getChildByName("btn_text") as Laya.Label;
        btn_text.color = "#ffffff";
        btn_text.bgColor = "#000000";
        E.ins.event(EventName.startGame);
        this._ctrl.createRoom();
        this.close();
    }

    private _changeColor_help() {
        let btn_text = this.helpBtn.getChildByName("btn_text") as Laya.Label;
        btn_text.bgColor = "#ffffff";
        btn_text.color = "#000000";
    }

    private _startHelp() {
        let btn_text = this.helpBtn.getChildByName("btn_text") as Laya.Label;
        btn_text.color = "#ffffff";
        btn_text.bgColor = "#000000";
        E.ins.event(EventName.openStudy);
        this.close();
    }
}