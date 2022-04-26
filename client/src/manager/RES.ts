export class ResM {
    constructor() {
       
    }
    /**
     * 资源这么少 可以不用图集 减少加载
     */
    public static perLoadArr(): Array<any> {
        var arr = [
            { "url": "res/atlas/res/area.atlas", type: Laya.Loader.ATLAS },
            
        ];
        return arr
    }
}