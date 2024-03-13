export type catalogItemType = {
    id: number,
    images: string[],
    title: string,
    price: number,
    amount: number,
    size: number,
}

export type catalogItemDetailType = {
    id: string,
    images: string[],
    title: string,
    price: number,
    sku: string,
    manufacturer: string,
    color: string,
    material: string,
    season: string,
    reason: string,
    sizes: sizesType[],
}

export type sizesType = {
    available: boolean,
    size: string,
}

export type category = {
    id: number,
    title: string,
}
