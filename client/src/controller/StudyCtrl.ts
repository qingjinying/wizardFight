import { E, EventName } from "../manager/E";
import { StudyView } from "../view/StudyView";

export class StudyCtrl {
    private _view: StudyView
    constructor() {
        this._view = new StudyView();
        E.ins.on(EventName.openStudy,this,this.showView);
    }

    private showView() {
        this._view.open();
    }
}