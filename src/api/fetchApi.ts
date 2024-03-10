const url = "http://localhost:7070/api";
export const getHits = async () => {
    const res = await fetch(`${url}/top-sales`);
    return res.json().catch((e) => e.message);
};
export const getCategory = async () => {
    const res = await fetch(`${url}/categories`);
    return res.json().catch((e) => e.message);
};
export const getCatalog = async () => {
    const res = await fetch(`${url}/items`);
    return res.json().catch((e) => e.message);
};
// другой выбранной категории
export const getCatalogItemById = async (id: number) => {
    const res = await fetch(`${url}/items?categoryId=${id}`);
    return res.json().catch((e) => e.message);
};
export const getLoadMoreItems = async (id: number, offset: number) => {
    const res = await fetch(
        `${url}/items?categoryId=${id}&offset=${offset}`,
    );
    return res.json().catch((e) => e.message);
};
// поиска
export const getItems = async (search: string, category: number) => {
    const params = new URLSearchParams({q: search, categoryId: String(category)});
    const res = await fetch(`${url}/items?${params}`);
    return res.json().catch((e) => e.message);
};
// загрузка полной информации о товара
export const getItemInfo = async (id: string) => {
    const res = await fetch(`${url}/items/${id}`);
    return res.json().catch((e) => e.message);
};
// оформить заказ
export const sendOrder = async (order: {}) => {
    try {
        const response = await fetch(`${url}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.ok;
    } catch (e: any) {
        throw new Error(e);
    }
};
