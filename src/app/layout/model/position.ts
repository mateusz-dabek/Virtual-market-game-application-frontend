export interface ImmediateExecution {
    symbol: string;
    typePosition: string;
    leverage: number;
    value: number;
}

export interface PendingExecution {
    symbol: string;
    typePosition: string;
    leverage: number;
    value: number;
    priceExecute: number;
}

export interface OpenPosition {
    id: number;
    symbol: string;
    openTime: Date;
    openPrice: number;
    typePosition: string;
    leverage: number;
    value: number;
    liquidationPrice: number;
    userId: number;
}

export interface PendingPosition {
    id: number;
    symbol: string;
    priceExecution: number;
    typePosition: string;
    leverage: number;
    value: number;
    userId: number;
}

export interface OpenPositionHistory {
    id: number;
    symbol: string;
    typePosition: string;
    openPrice: number;
    exitPrice: number;
    leverage: number;
    profit: number;
    value: number;
    openTime: Date;
    userId: number;
}

export interface SymbolStatistic {
    symbol: string;
    profit: number;
    loss: number;
}