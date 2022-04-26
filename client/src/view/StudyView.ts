import { E, EventName } from "../manager/E";
import { ui } from "../ui/layaMaxUI";

export class StudyView extends ui.studyUI {
    constructor() {
        super();
        this.btn_back.y = Laya.stage.height - 120;
        this.btn_back.on(Laya.Event.CLICK, this, this.onBack);
        let w = Laya.Browser.clientWidth;
        let h = Laya.Browser.clientHeight;
        if (h / w >= 2) {
            this.study_info.top = 50;
        }
    }

    private onBack() {
        E.ins.event(EventName.openHome);
        this.close();
    }
}