export class WxShare {
    private static _ins: WxShare;
    public static getIns() {
        if (!this._ins) {
            this._ins = new WxShare();
        }
        return this._ins;
    }

    constructor() {
        // wx.showShareMenu({
        //     withShareTicket: true,
        //     menus: ['shareAppMessage', 'shareTimeline']
        // } as any)
        //this.setShareCfg();
    }

    private setShareCfg() {
        wx["onShareAppMessage"](function () {
            return {
                title: '你们统统是二师兄的菜 ',
                imageUrlId: 'EtDwOTtAQw6P1q0yLqOejQ==',
                imageUrl: 'https://mmocgame.qpic.cn/wechatgame/26YI6fMJCDFDLiaI6aGZ1xibudYtfGicAbib7sye36wB26HKltktPUw2O5lPibFmPAHxK/0'
            }
        })
    }
}