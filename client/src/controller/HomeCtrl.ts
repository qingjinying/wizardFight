import { E, EventName } from "../manager/E";
import { HomeView } from "../view/HomeView";

export class HomeCtrl {
    private _view: HomeView
    constructor() {
        this._view = new HomeView();
        E.ins.on(EventName.openHome,this,this.showView);
    }

    private showView() {
        this._view.open();
    }
}