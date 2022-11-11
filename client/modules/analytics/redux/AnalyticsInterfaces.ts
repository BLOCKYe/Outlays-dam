export interface ILastSpendingResponse {
    status?: number;
    data?: ILastSpendingData;
}

export interface ILastSpendingData {
    current?: { _sum?: Sum; }
    last?: { _sum?: Sum; }
}

export interface Sum {
    value?: number;
}
