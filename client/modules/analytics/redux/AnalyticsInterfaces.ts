export interface ILastSpendingResponse {
    status?: number;
    data?:   ILastSpendingData;
}

export interface ILastSpendingData {
    _sum?: Sum;
}

export interface Sum {
    value?: number;
}
