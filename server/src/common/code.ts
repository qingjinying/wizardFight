//错误类型枚举
export enum ErrMsg {
    ok = "ok",
    paramError = "paramError",
    roleAlreadyJoinRoom = "roleAlreadyJoinRoom", //玩家已经加入一个房间
    pvpRoomNotExsists = "pvpRoomNotExsists", //房间不存在
    pvpRoomMaxMember = "pvpRoomMaxMember", //房间人数已达上限
    gameAlreadyStart = "gameAlreadyStart", //游戏已经开始

    roundNotStart = "roundNotStart", //回合未开始
    cardNotHand = "cardNotHand",  //手牌不存在
}

//玩家状态枚举
export enum RoleState {
    free = 0, //空闲
    room = 1, //在房间中
    ready = 2, //准备中
    game = 3,  //游戏中
}

//房间状态枚举
export enum RoomState {
    wait = 0,  //等待中
    play = 1,  //游戏中
}

//玩家战斗状态枚举
export enum FightState {
    attack = 0,  //进攻
    defend = 1,  //防守
}

//一个回合的状态
export enum RoundState {
    no = 0,
    start = 1, //开始
    end = 2   //结束
}

//卡牌id枚举 
export enum CardID {
    kill = 1,//杀
    superKill = 2,//超级杀
    maxKill = 3,//必杀
    miss = 101, //闪
    superMiss = 102,//超级闪
}

