export type cartItemType = {
    id: number,
    price: number,
    count?: number,
    amount: number,
    size: number,
    title: string,
}

export type order = {
    id: number,
    price: number,
    count: number,
}