import { order } from "../components/Cart/interfaces";

const url = "https://qh8y4d-7070.csb.app/api";

export const getHits = async () => {
  const res = await fetch(`${url}/top-sales`);
  return res.json().catch((e) => e.message);
};
export const getCategories = async () => {
  const res = await fetch(`${url}/categories`);
  return res.json().catch((e) => e.message);
};
export const getCatalog = async () => {
  const res = await fetch(`${url}/items`);
  return res.json().catch((e) => e.message);
};
export const getCatalogItemById = async (id: number) => {
  const res = await fetch(`${url}/items?categoryId=${id}`);
  return res.json().catch((e) => e.message);
};
export const getMoreItems = async (id: number, offset: number) => {
  const res = await fetch(`${url}/items?categoryId=${id}&offset=${offset}`);
  return res.json().catch((e) => e.message);
};
export const getItems = async ({
  search,
  category,
}: {
  search: string;
  category: number;
}) => {
  const params = new URLSearchParams({
    q: search,
    categoryId: String(category),
  });
  const res = await fetch(`${url}/items?${params}`);
  return res.json().catch((e) => e.message);
};
export const getItemInfo = async (id: string) => {
  const res = await fetch(`${url}/items/${id}`);
  return res.json().catch((e) => e.message);
};
export const sendOrder = async (order: order) => {
  try {
    const res = await fetch(`${url}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.ok;
  } catch (e: unknown) {
    if (e instanceof Error) return e.message;
  }
};
