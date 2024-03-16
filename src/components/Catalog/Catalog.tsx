import { useState, useEffect } from "react";
import {useLoaderData, useNavigation} from "react-router-dom";
import Card from "../Card";
import Preloader from "./Preloader.tsx";
import { getItems, getMoreItems, getCategories } from "../../api/fetchApi";
import { catalogItemType, category } from "./interfaces";
import RebootButton from "./RebootButton.tsx";
import Search from "./Search.tsx";
import CategoryItem from "./CategoryItem.tsx";
const Catalog = ({ disabledSearch = false }) => {
  const { paramsQ, paramsCategory } = useLoaderData() as { paramsQ: string, paramsCategory: number };
  const [q, setQ] = useState(paramsQ);
  const [items, setItems] = useState<catalogItemType[] | []>([]);
  const [categories, setCategories] = useState<category[]>([]);
  const [activatedCategory, setActivatedCategory] = useState(paramsCategory);
  const [offset, setOffset] = useState(0);
  const [next, setNext] = useState(true);
  const [status, setStatus] = useState("idle");
  const [categoryError, setCategoryError] = useState("");
  const [mainError, setMainError] = useState("");
  const [getMoreError, setGetMoreError] = useState("");
  const navigation = useNavigation();
  const getItemsApi = async () => {
    setMainError("");
    setItems([]);
    setQ(paramsQ);
    setStatus("pending");
    try {
      const data: catalogItemType[] = await getItems({
        search: paramsQ,
        category: activatedCategory,
      });
      if (Array.isArray(data)) {
        setItems(data);
        setNext(data.length == 6);
      }
      setOffset(data.length);
      setStatus("success");
    } catch (e: unknown) {
      setStatus("error");
      if (e instanceof Error) {
        setMainError(e.message);
      }
    }
  };
  const getCategoriesApi = async () => {
    setCategoryError("");
    setQ(paramsQ);
    setStatus("pending");
    try {
      const categories = await getCategories();
      if (Array.isArray(categories)) {
        setCategories([{ id: 0, title: "Все" }, ...categories]);
      }
      setStatus("success");
    } catch (e: unknown) {
      setStatus("error");
      if (e instanceof Error) {
        setCategoryError(e.message);
      }
    }
  }
  useEffect(() => {
    (async () => {
      try {
        setStatus("pending");
        const categories = await getCategories();
        if (Array.isArray(categories)) {
          setCategories([{ id: 0, title: "Все" }, ...categories]);
        }
        setStatus("success");
      } catch (e: unknown) {
        setStatus("error");
        if (e instanceof Error) {
          setMainError(e.message);
        }
      }
    })();
  }, []);
  useEffect(() => {
    setMainError("");
    getItemsApi();
    getCategoriesApi();
  }, [paramsQ, activatedCategory]);
  const handleGetMore = () => {
    (async () => {
      setGetMoreError("");
      try {
        setStatus("pending");
        const data = await getMoreItems(activatedCategory, offset + 6);
        setNext(data.length == 6);
        setItems((items) => [...items, ...data]);
        setOffset(offset + data.length);
        setStatus("success");
      } catch (e: unknown) {
        if (e instanceof Error) {
          setGetMoreError(e.message);
        }
        setStatus("error");
      }
    })();
  };

  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {status === "error" && mainError !== "" ? <RebootButton message={mainError} callback={getItemsApi}/> : (
          <>
            {!disabledSearch && <Search q={q} setQ={setQ}/>}
            <ul className="catalog-categories nav justify-content-center">
              {categoryError ? <RebootButton message={categoryError} callback={getCategoriesApi}/> :
              categories.map((category: category) => <CategoryItem category={category} activatedCategory={activatedCategory} setActivatedCategory={setActivatedCategory} q={q} key={category.id}/>)}
            </ul>
            <div className="row">
              {items.length == 0 && status == "pending" && <Preloader/>}
              {items.map((item: catalogItemType) => (
                  <Card item={item} key={item.id}/>
              ))}
            </div>
            {status == "pending" ? <Preloader/> : (
                next && (
                    <div className="text-center">
                      {getMoreError !== "" ? (
                          <p>Что-то пошло не так: {getMoreError}</p>
                  ) : (
                    <></>
                  )}
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleGetMore}
                    disabled={navigation.state === "loading"}
                  >
                    Загрузить еще
                  </button>
                </div>
              )
            )}
          </>
        )}
      </section>
    </>
  );
};
export default Catalog;
