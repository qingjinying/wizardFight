(function () {
    'use strict';

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "room.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class E extends Laya.EventDispatcher {
        static get ins() {
            return this._ins;
        }
    }
    E._ins = new E();
    var EventName;
    (function (EventName) {
        EventName["openHome"] = "openHome";
        EventName["startGame"] = "startGame";
        EventName["openStudy"] = "openStudy";
        EventName["leaveRoom"] = "leaveRoom";
    })(EventName || (EventName = {}));

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class homeUI extends Laya.View {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(homeUI.uiView);
            }
        }
        homeUI.uiView = { "type": "View", "props": { "width": 500, "height": 1136 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": -250, "var": "bg", "texture": "res/bg/sanguoBg.png" }, "compId": 16 }, { "type": "Sprite", "props": { "y": 134, "x": -250, "width": 1000, "var": "startBtn", "height": 80 }, "compId": 8, "child": [{ "type": "Label", "props": { "width": 1000, "valign": "middle", "text": "开始游戏", "stroke": 1, "name": "btn_text", "height": 80, "fontSize": 28, "color": "#ffffff", "bgColor": "#080808", "align": "center" }, "compId": 11 }] }, { "type": "Sprite", "props": { "y": 248, "x": -250, "width": 1000, "var": "helpBtn", "height": 80 }, "compId": 12, "child": [{ "type": "Label", "props": { "width": 1000, "valign": "middle", "text": "教程", "stroke": 1, "name": "btn_text", "height": 80, "fontSize": 28, "color": "#ffffff", "bgColor": "#050505", "align": "center" }, "compId": 14 }] }, { "type": "Label", "props": { "top": 56, "text": "巫师对决", "stroke": 1, "fontSize": 40, "color": "#ffffff", "centerX": 0 }, "compId": 10 }], "loadList": ["res/bg/sanguoBg.png"], "loadList3D": [] };
        ui.homeUI = homeUI;
        REG("ui.homeUI", homeUI);
        class roomUI extends Laya.Scene {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(roomUI.uiView);
            }
        }
        roomUI.uiView = { "type": "Scene", "props": { "width": 500, "height": 1136 }, "compId": 2, "child": [{ "type": "Box", "props": { "var": "topLine", "top": 10, "centerX": 0 }, "compId": 7, "child": [{ "type": "Label", "props": { "y": 20, "x": 165, "var": "round", "text": "第一回合", "fontSize": 36, "color": "#f8f8f8" }, "compId": 3 }, { "type": "Button", "props": { "y": 20, "x": 357, "width": 84, "var": "leave_btn", "stateNum": 2, "skin": "res/other/level_left.png", "height": 71 }, "compId": 4 }] }, { "type": "Button", "props": { "var": "inviteBtn", "top": 178, "skin": "res/other/button.png", "labelSize": 24, "label": "邀请好友", "centerX": 0 }, "compId": 8 }, { "type": "Box", "props": { "var": "enemyArea", "top": 166, "left": 41 }, "compId": 10, "child": [{ "type": "Label", "props": { "y": 47.5, "x": 33.5, "var": "enemyValue", "text": "1", "strokeColor": "#201d1d", "stroke": 2, "fontSize": 36, "color": "#2baadb" }, "compId": 12 }, { "type": "Image", "props": { "y": -33, "x": 116, "var": "enemyCard_1", "skin": "res/card/kill.png" }, "compId": 13 }, { "type": "Image", "props": { "y": -33, "x": 212, "var": "enemyCard_2", "skin": "res/card/kill.png" }, "compId": 14 }, { "type": "Image", "props": { "y": -33, "x": 310, "var": "enemyCard_3", "skin": "res/card/kill.png" }, "compId": 15 }, { "type": "Image", "props": { "y": -33, "x": 12.5, "var": "enemyState", "skin": "res/other/进攻.png" }, "compId": 16 }, { "type": "Label", "props": { "y": 10, "x": 10, "text": "魔法值", "fontSize": 24, "color": "#ffffff" }, "compId": 17 }] }, { "type": "Box", "props": { "width": 385, "var": "myArea", "left": 55, "height": 117, "bottom": 35 }, "compId": 18, "child": [{ "type": "Label", "props": { "y": 67, "x": 353.478515625, "var": "myValue", "text": "1", "strokeColor": "#201d1d", "stroke": 2, "fontSize": 36, "color": "#2baadb" }, "compId": 19 }, { "type": "Image", "props": { "y": -33, "x": 33, "var": "myCard_1", "skin": "res/card/kill.png" }, "compId": 20 }, { "type": "Image", "props": { "y": -33, "x": 128, "var": "myCard_2", "skin": "res/card/kill.png" }, "compId": 21 }, { "type": "Image", "props": { "y": -33, "x": 228, "var": "myCard_3", "skin": "res/card/kill.png" }, "compId": 22 }, { "type": "Image", "props": { "y": -24, "x": 327.4892578125, "var": "myState", "skin": "res/other/进攻.png" }, "compId": 23 }, { "type": "Label", "props": { "y": 18, "x": 327.4892578125, "text": "魔法值", "fontSize": 24, "color": "#ffffff" }, "compId": 24 }] }, { "type": "Box", "props": { "var": "fightArea", "centerY": 0, "centerX": 0 }, "compId": 26, "child": [{ "type": "Image", "props": { "var": "enemyEmit", "skin": "res/card/kill.png" }, "compId": 27 }, { "type": "Image", "props": { "y": 166, "x": 96, "var": "myEmit", "skin": "res/card/miss.png" }, "compId": 28 }] }, { "type": "Label", "props": { "var": "fightRes", "text": "胜利", "fontSize": 72, "color": "#f81c18", "centerY": 0, "centerX": 0 }, "compId": 29 }, { "type": "Label", "props": { "var": "enemyReadyState", "top": 200, "text": "准备中..........", "fontSize": 36, "color": "#e3cac9", "centerX": 0 }, "compId": 30 }, { "type": "Label", "props": { "var": "myReadyState", "top": 1025, "text": "准备中..........", "fontSize": 36, "color": "#e3cac9", "centerX": 0, "bottom": 200 }, "compId": 31 }, { "type": "Button", "props": { "var": "readyBtn", "skin": "res/other/button.png", "labelSize": 24, "label": "准备", "centerX": 0, "bottom": 100 }, "compId": 32 }], "loadList": ["res/other/level_left.png", "res/other/button.png", "res/card/kill.png", "res/other/进攻.png", "res/card/miss.png"], "loadList3D": [] };
        ui.roomUI = roomUI;
        REG("ui.roomUI", roomUI);
        class studyUI extends Laya.Scene {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(studyUI.uiView);
            }
        }
        studyUI.uiView = { "type": "Scene", "props": { "width": 640, "height": 1136 }, "compId": 2, "child": [{ "type": "Label", "props": { "y": -1, "x": 0, "wordWrap": true, "width": 500, "stroke": 2, "height": 2000, "fontSize": 28, "color": "#f9f9f9", "bgColor": "#212020" }, "compId": 3 }, { "type": "Label", "props": { "y": 25, "x": 0, "wordWrap": true, "width": 500, "var": "study_info", "text": "   一款回合制策略游戏,主公的目标是不断占领地盘，消灭地图中其它势力，统一天下", "stroke": 2, "leading": 4, "fontSize": 28, "color": "#f9f9f9" }, "compId": 4 }, { "type": "Label", "props": { "y": 427, "width": 100, "var": "btn_back", "valign": "middle", "text": "返回", "stroke": 2, "right": 153, "height": 50, "fontSize": 32, "color": "#fdfdfd", "bgColor": "#000000", "align": "center" }, "compId": 5 }], "loadList": [], "loadList3D": [] };
        ui.studyUI = studyUI;
        REG("ui.studyUI", studyUI);
    })(ui || (ui = {}));

    class HomeView extends ui.homeUI {
        constructor() {
            super();
            this._moveFlo = true;
            this._maxRightX = 0;
            this._maxLeftX = -500;
            this._moveBg();
            this.startBtn.on(Laya.Event.MOUSE_DOWN, this, this._changeColor_start);
            this.startBtn.on(Laya.Event.MOUSE_UP, this, this._startGame);
            this.helpBtn.on(Laya.Event.MOUSE_DOWN, this, this._changeColor_help);
            this.helpBtn.on(Laya.Event.MOUSE_UP, this, this._startHelp);
        }
        _moveBg() {
            if (this._moveFlo) {
                this.bg.x += 1;
                if (this.bg.x >= this._maxRightX) {
                    this._moveFlo = false;
                }
            }
            else {
                this.bg.x -= 1;
                if (this.bg.x <= this._maxLeftX) {
                    this._moveFlo = true;
                }
            }
            Laya.timer.once(100, this, this._moveBg);
        }
        _changeColor_start() {
            let btn_text = this.startBtn.getChildByName("btn_text");
            btn_text.bgColor = "#ffffff";
            btn_text.color = "#000000";
        }
        _startGame() {
            let btn_text = this.startBtn.getChildByName("btn_text");
            btn_text.color = "#ffffff";
            btn_text.bgColor = "#000000";
            E.ins.event(EventName.startGame);
            this.close();
        }
        _changeColor_help() {
            let btn_text = this.helpBtn.getChildByName("btn_text");
            btn_text.bgColor = "#ffffff";
            btn_text.color = "#000000";
        }
        _startHelp() {
            let btn_text = this.helpBtn.getChildByName("btn_text");
            btn_text.color = "#ffffff";
            btn_text.bgColor = "#000000";
            E.ins.event(EventName.openStudy);
            this.close();
        }
    }

    class HomeCtrl {
        constructor() {
            this._view = new HomeView();
            E.ins.on(EventName.openHome, this, this.showView);
        }
        showView() {
            this._view.open();
        }
    }

    class RoomView extends ui.roomUI {
        constructor() {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            console.log(this.width, this.height);
            this.leave_btn.on(Laya.Event.MOUSE_DOWN, this, this._leaveRoom);
        }
        _leaveRoom() {
            E.ins.event(EventName.openHome);
            this.close();
        }
    }

    class RoomCtrl {
        constructor() {
            this._view = new RoomView();
            E.ins.on(EventName.startGame, this, this.showView);
        }
        showView() {
            this._view.open();
        }
    }

    class StudyView extends ui.studyUI {
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
        onBack() {
            E.ins.event(EventName.openHome);
            this.close();
        }
    }

    class StudyCtrl {
        constructor() {
            this._view = new StudyView();
            E.ins.on(EventName.openStudy, this, this.showView);
        }
        showView() {
            this._view.open();
        }
    }

    class Role {
        constructor() {
            this.init();
        }
        static getIns() {
            if (!this._ins) {
                this._ins = new Role();
            }
            return this._ins;
        }
        init() {
            this.socket = new Laya.Socket();
            this.socket.connectByUrl("ws://127.0.0.1:3000");
            this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
            this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
            this.socket.on(Laya.Event.MESSAGE, this, this.onMessageRev);
            this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
        }
        onSocketOpen() {
            console.log("成功建立websocket链接");
        }
        onSocketClose() {
            console.log("关闭websocket连接");
        }
        onConnectError(error) {
            console.log(error);
        }
        onMessageRev(res) {
            console.log(res);
        }
    }

    class GameCtrl {
        constructor() {
            this.init();
        }
        init() {
            Role.getIns();
            new HomeCtrl();
            new StudyCtrl();
            new RoomCtrl();
        }
    }

    class ResM {
        constructor() {
        }
        static perLoadArr() {
            var arr = [
                { "url": "res/atlas/res/area.atlas", type: Laya.Loader.ATLAS },
            ];
            return arr;
        }
    }

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(500, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.loader.load(ResM.perLoadArr(), Laya.Handler.create(this, this.gameResComplete));
            Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        }
        resize() {
            let w = GameConfig.width;
            let h = GameConfig.height;
            if (GameConfig.scaleMode == "fixedwidth") {
                let screen_wh_scale = Laya.Browser.width / Laya.Browser.height;
                h = GameConfig.width / screen_wh_scale;
            }
            Laya.Scene.unDestroyedScenes.forEach(element => {
                let s = element;
                s.width = w;
                s.height = h;
            });
        }
        gameResComplete() {
            new GameCtrl();
            E.ins.event(EventName.openHome);
        }
    }
    new Main();

}());
