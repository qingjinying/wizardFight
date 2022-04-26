import { HomeCtrl } from "../controller/HomeCtrl";
import { RoomCtrl } from "../controller/RoomCtrl";
import { StudyCtrl } from "../controller/StudyCtrl";
import { Role } from "../model/role";

export class GameCtrl {
    constructor() {
        this.init();
    }

    public init() {
        Role.getIns();
        new HomeCtrl();
        new StudyCtrl();
        new RoomCtrl();
    }
}