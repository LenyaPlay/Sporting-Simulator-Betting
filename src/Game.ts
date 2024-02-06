import { reRerender } from "./App";
import { TEAMS } from "./Teams";

export enum Stage {
    MENU = "MENU",
    TEAMS = "TEAMS",
    HELP = "HELP",
    LOAD_SECOND_HALF = "LOAD_SECOND_HALF",
    LOAD_RESULT = "LOAD_RESULT",
    FIRST_HALF = "FIRST_HALF",
    SECOND_HALF = "SECOND_HALF",
    RESULT = "RESULT",
}


interface IState {
    stage: Stage,
    match: IPair,
    income1: number,
    income2: number,
    bet1: IBet,
    bet2: IBet,
    X1 : number,
    X2 : number,
    X3 : number,
    X4 : number,
    X5 : number,
    X6 : number,
    X7 : number,
    X8 : number,
    X9 : number,
    X12 : number,
    X22 : number,
    X32 : number,
    X42 : number,
    X52 : number,
    X62 : number,
    X72 : number,
    X82 : number,
    X92 : number,
    P1 : number,
    P2 : number,
    P3 : number,
    P4 : number,
    P5 : number,
    P6 : number,
    P7 : number,
    P8 : number,
    P9 : number,
    k1 : number,
    k2: number,
    k3: number,
    k4: number,
    k5: number,
}

export interface ITeam {
    name: string,
    img: string,
    force?: number,
    style?: string,
    weather?: string,
    trauma?: number,
    home?: boolean,
    fatigue?: number,
    fatigueT?: number,
    trainer?: number,
    count? : number,
    cards?: number,
    eliminations? : number,
    angles? : number,
    pressure? : number,
}

export enum Bet {
    NONE,
    WIN1,
    WIN2,
    DRAW,
    WIN1DRAW,
    WIN2DRAW,
}

interface IBet {
    type: Bet,
    coefficient: number,
    money: number,
}

export interface IPair {
    teams: ITeam[],
    bet: IBet,
}

function selectTwoDifferentItems<T>(array : T[]) : T[] {
    // Make sure the array has at least two items
    if (array.length < 2) {
        return [array[0]];
    }

    // Generate random indices for selecting items
    let index1 = Math.floor(Math.random() * array.length);
    let index2 = Math.floor(Math.random() * array.length);

    // Make sure the indices are different
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * array.length);
    }

    // Return the selected items
    return [array[index1], array[index2]];
}

function getEmptyMatch() : IPair {
    return {
        teams: selectTwoDifferentItems(TEAMS),
        bet: {
            type: Bet.NONE,
            coefficient: 0,
            money: 0,
        }
    };
}

export function getBetNameByType(bet: IBet) : string {
    if(bet.type == Bet.NONE || bet.money == 0) {
        return '';
    }
    if(bet.type == Bet.DRAW) {
        return 'empate ';
    }
    if(bet.type == Bet.WIN1) {
        return 'ganha 1 ';
    }
    if(bet.type == Bet.WIN2) {
        return 'ganha 2 ';
    }
    if(bet.type == Bet.WIN1DRAW) {
        return 'ganhar 1 ou empatar ';
    }
    if(bet.type == Bet.WIN2DRAW) {
        return 'ganhar 2 ou empatar ';
    }
    return '';
}

function getEmptyState () : IState {
    const state : IState = {
        match: getEmptyMatch(),
        stage: Stage.MENU,
        income1: 0,
        income2: 0,
        X1: 0,
        X2: 0,
        X3: 0,
        X4: 0,
        X5: 0,
        X6: 0,
        X7: 0,
        X8: 0,
        X9: 0,
        X12: 0,
        X22: 0,
        X32: 0,
        X42: 0,
        X52: 0,
        X62: 0,
        X72: 0,
        X82: 0,
        X92: 0,
        P1: 0,
        P2: 0,
        P3: 0,
        P4: 0,
        P5: 0,
        P6: 0,
        P7: 0,
        P8: 0,
        P9: 0,
        k1: 0,
        k2: 0,
        k3: 0,
        k4: 0,
        k5: 0,
        bet1: {
            type: Bet.NONE,
            money: 0,
            coefficient: 0,
        },
        bet2: {
            type: Bet.NONE,
            money: 0,
            coefficient: 0,
        }
    };
    return state;
}

export function setStage(stage : Stage) {
    if(stage == Stage.LOAD_SECOND_HALF) {
        setTimeout(() => {
            setStage(Stage.SECOND_HALF);
        }, 750);
    } else if(stage == Stage.LOAD_RESULT) {
        setTimeout(() => {
            setStage(Stage.RESULT);
        }, 750);
    } else if(stage == Stage.FIRST_HALF) {
        saveBeforePoints();
        saveState(getEmptyState());
        generateMatch1();
        generateCoefficients();
    } else if(stage == Stage.SECOND_HALF) {
        let state = loadState();
        getWinner1();
        if(state.match.bet.type != Bet.NONE) {
            state.bet1 = JSON.parse(JSON.stringify(state.match.bet));
        }
        saveState(state);
        state.match.bet.type = Bet.NONE;
        state.match.bet.money = Math.min(state.match.bet.money, getPoints());
        generateMatch2();
        generateCoefficients();
        saveState(state);
    } else if(stage == Stage.RESULT) {
        getWinner2();
        let state = loadState();
        if(state.match.bet.type != Bet.NONE) {
            state.bet2 = state.match.bet;
        }
        setPoints(getPoints() + ~~state.income1 + ~~state.income2);
        saveState(state);
    }
    let state = loadState();
    state.stage = stage;
    saveState(state);
    reRerender();
}

function getRandomInRange(min : number, max : number) {
    return Math.random() * (max - min) + min;
}

export function generateMatch2() {
    const state = loadState();
    const match = state.match;

    const generateTeam = (team : ITeam) => {
        team.eliminations = ~~(Math.random() * 3);
        team.cards = team.eliminations + ~~(Math.random() * 2);
        team.angles = ~~(Math.random() * 7);
        team.pressure = 30 + ~~(Math.random() * 40);
        team.fatigueT = team.fatigue as number + ~~getRandomInRange(15, 30);
    }

    const t1 = match.teams[0];
    const t2 = match.teams[1];

    generateTeam(t1);
    generateTeam(t2);
    t2.pressure = 100 - (t1.pressure as number);
    saveState(state);
}

export function generateMatch1 () {
    const state = loadState();
    const match = state.match;

    const randomStyle : () => string = ()  => {
        let styles = [
            "Aggresive",
            "Protective",
            "Balanced",
        ]
        return styles[~~(Math.random() * (styles.length - 1))];
    }
    const randomWeather : () => string = ()  => {
        let weathers = [
            "Sunny",
            "Rain",
            "Frosty",
            "Snow",
            "Windy",
            "Cloudy",
        ]
        return weathers[~~(Math.random() * (weathers.length - 1))];
    }
    const generateTeam = (team : ITeam) => {
        team.force = 50 + ~~(Math.random() * 30);
        team.home = Math.random() < 0.5 ? true : false;
        team.trauma = ~~(Math.random() * 3);
        team.style = randomStyle();
        team.trainer = 5 + ~~(Math.random() * 5);
        team.fatigue = ~~(Math.random() * 30);
        team.weather = randomWeather();
        team.home = Math.random() < 0.5;
    }

    const t1 = match.teams[0];
    const t2 = match.teams[1];
    generateTeam(t1);
    generateTeam(t2);
    t2.weather = t1.weather;
    t2.home = !t1.home;

    saveState(state);
}

export function generateCoefficients() {
    const state = loadState();

    state.k1 = Math.round(getRandomInRange(1.15, 2) * 100) / 100;
    state.k2 = Math.round(getRandomInRange(1.15, 2) * 100) / 100;
    state.k3 = Math.round(getRandomInRange(1.2, 2.5) * 100) / 100;
    state.k4 = Math.round((Math.min(state.k1, state.k3) - getRandomInRange(0.05, 0.1)) * 100) / 100;
    state.k5 = Math.round((Math.min(state.k2, state.k3) - getRandomInRange(0.05, 0.1)) * 100) / 100;

    saveState(state);
}

export function getWinner1 () : number {
    const state = loadState();
    const match = state.match;

    state.X1 = match.teams[0].force as number;
    state.X12 = match.teams[1].force as number;

    state.X2 = match.teams[0].trainer as number;
    state.X22 = match.teams[1].trainer as number;

    state.X3 = match.teams[0].home ? 1 : 0;
    state.X32 = match.teams[1].home ? 1 : 0;

    state.X4 = match.teams[0].trauma as number; 
    state.X42 = match.teams[1].trauma as number;
    
    state.X5 = match.teams[0].fatigue as number;
    state.X52 = match.teams[1].fatigue as number;

    state.P1 = getRandomInRange(0.15, 0.30);
    state.P2 = getRandomInRange(0.05, 0.10);
    state.P3 = getRandomInRange(0.02, 0.05);
    state.P4 = getRandomInRange(0.02, 0.05);
    state.P5 = getRandomInRange(0.02, 0.05);

    const P = (state.X1 * state.P1 + state.X2 * state.P2 + state.X3 * state.P3 + state.X5 * state.P5 - state.X4 * state.P4) / (state.X1 * state.P1 + state.X2 * state.P2 + state.X3 * state.P3 + state.X5 * state.P5 - state.X4 * state.P4 + state.X12 * state.P1 + state.X22 * state.P2 + state.X32 * state.P3 - state.X42 * state.P4 + state.X52 * state.P5);
    const R = Math.random();

    const winnerIndex : number = R < P ? 0 : R > P ? 1: -1;

    let count1 = ~~getRandomInRange(0, 3);
    let count2 = count1 + ~~getRandomInRange(1, 2);

    if(winnerIndex == -1) {
        match.teams[0].count = count2;
        match.teams[1].count = count2;
    } else {
        match.teams[winnerIndex].count = count2;
        match.teams[1 - winnerIndex].count = count1;
    }

    if (match.bet.type != Bet.NONE && match.bet.money != 0) {
        let hasDraw = match.bet.type == Bet.DRAW ||
            match.bet.type == Bet.WIN1DRAW ||
            match.bet.type == Bet.WIN2DRAW;

        let hasWin1 = match.bet.type == Bet.WIN1 || match.bet.type == Bet.WIN1DRAW;

        let hasWin2 = match.bet.type == Bet.WIN2 || match.bet.type == Bet.WIN2DRAW;

        let isWinner = hasDraw && winnerIndex == -1 ||
            hasWin1 && winnerIndex == 0 ||
            hasWin2 && winnerIndex == 1;

        setPoints(getPoints() - match.bet.money);
        if (isWinner) {
            const income = match.bet.coefficient * match.bet.money;
            state.income1 += income;
        }
        

        saveState(state);
    }
    console.log("first", match.bet.money, state.income1, state.income2);

    return winnerIndex;
}


export function getWinner2 () : number {
    const state = loadState();
    const match = state.match;

    state.X6 = match.teams[0].count as number > (match.teams[1].count as number) ? 1 : 0;
    state.X62 = 1 - state.X6;

    state.X7 = match.teams[0].cards as number;
    state.X72 = match.teams[1].cards as number;

    state.X8 = match.teams[0].eliminations as number;
    state.X82 = match.teams[1].eliminations as number;

    state.X9 = match.teams[0].fatigueT as number;
    state.X92 = match.teams[1].fatigueT as number;

    state.P6 = getRandomInRange(0.1, 0.2);
    state.P7 = getRandomInRange(0.02, 0.05);
    state.P8 = getRandomInRange(0.03, 0.07);
    state.P9 = getRandomInRange(0.07, 0.15);

    const P = (state.X1 * state.P1 + state.X2 * state.P2 + state.X3 * state.P3 - state.X4 * state.P4 + state.X6 * state.P6 - state.X7 * state.P7 - state.X8 * state.P8 + state.X9 * state.P9) / (state.X1 * state.P1 + state.X2 * state.P2 + state.X3 * state.P3 - state.X4 * state.P4 + state.X6 * state.P6 - state.X7 * state.P7 - state.X8 * state.P8 + state.X9 * state.P9 + state.X12 * state.P1 + state.X22 * state.P2 + state.X32 * state.P3 - state.X42 * state.P4 + state.X62 * state.P6 - state.X72 * state.P7 - state.X82 * state.P8 + state.X92 * state.P9)
    const R = Math.random();
    const winnerIndex : number = R < P ? 0 : R > P ? 1: -1;

    let count1 = ~~getRandomInRange(0, 3);
    let count2 = count1 + ~~getRandomInRange(1, 2);

    if(winnerIndex == -1) {
        match.teams[0].count = count2;
        match.teams[1].count = count2;
    } else {
        match.teams[winnerIndex].count = count2;
        match.teams[1 - winnerIndex].count = count1;
    }

    if (match.bet.type != Bet.NONE && match.bet.money != 0) {
        let hasDraw = match.bet.type == Bet.DRAW ||
            match.bet.type == Bet.WIN1DRAW ||
            match.bet.type == Bet.WIN2DRAW;

        let hasWin1 = match.bet.type == Bet.WIN1 || match.bet.type == Bet.WIN1DRAW;

        let hasWin2 = match.bet.type == Bet.WIN2 || match.bet.type == Bet.WIN2DRAW;

        let isWinner = hasDraw && winnerIndex == -1 ||
            hasWin1 && winnerIndex == 0 ||
            hasWin2 && winnerIndex == 1;

        setPoints(getPoints() - match.bet.money);
        if (isWinner) {
            const income = match.bet.coefficient * match.bet.money;
            state.income2 += income;
        }

        saveState(state);
    }
    
    console.log("sec", match.bet.money, state.income1, state.income2);

    return winnerIndex;
}

var cachedState : IState | undefined;

export function saveState(state : IState) {
    cachedState = state;
    localStorage.setItem('state', JSON.stringify(state));
}

export function loadState() : IState  {
    if(cachedState) {
        return cachedState;
    }
    let result = localStorage.getItem('state')
    if(result != null) {
        return JSON.parse(result);
    } else {
        let state = getEmptyState();
        saveState(state);
        return state;
    }
}

export function saveBeforePoints(){
    localStorage.setItem('before', getPoints() + '');
}

export function loadPointsBefore(){
    let res = localStorage.getItem('before');
    if (res != null) {
        return parseInt(res);
    } else {
        return getPoints();
    }
}


export function getPoints() : number {
    let res = localStorage.getItem('points');
    if (res != null) {
        return parseInt(res);
    } else {
        return 30000;
    }
}

export function setPoints(value : number) {
    localStorage.setItem('points', value.toString()); 
}

export {}