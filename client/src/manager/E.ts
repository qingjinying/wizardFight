/**
 * 全局事件派发器
 */
export class E  extends Laya.EventDispatcher{
    private static _ins:E = new E();
    public static get ins(){
        return this._ins
    }
}

export enum EventName{
    openHome = "openHome",
    startGame = "startGame",
    openStudy = "openStudy",
    roomInfo = "roomInfo",
    fightInfo = "fightInfo",
    gameOver = "gameOver",
    leaveRoom = "leaveRoom"
}