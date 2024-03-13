import { useState, useEffect } from "react";
import { useLoaderData, Form, useNavigation, Link } from "react-router-dom";
import Card from "../Card";
import Preloader from "../Preloader";
import { getItems, getMoreItems, getCategories } from "../../api/fetchApi";
import { catalogItemType, category } from "./interfaces";

const Catalog = ({ disabledSearch = false }) => {
  const { paramsQ } = useLoaderData() as { paramsQ: string };
  const [q, setQ] = useState(paramsQ);
  const [items, setItems] = useState<catalogItemType[] | []>([]);
  const [categories, setCategories] = useState<category[]>([]);
  const [activatedCategory, setActivatedCategory] = useState(0);
  const [offset, setOffset] = useState(0);
  const [next, setNext] = useState(true);
  const [status, setStatus] = useState("idle");
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
        {status === "error" && mainError !== "" ? (
          <div className="text-center">
            <p>Что-то пошло не так: {mainError}</p>
            <button className="btn btn-outline-primary" onClick={getItemsApi}>
              Попробовать ещё
            </button>
          </div>
        ) : (
          <>
            {!disabledSearch && (
              <Form className="catalog-search-form form-inline">
                <input
                  className="form-control"
                  name="q"
                  value={q}
                  onChange={({
                    target: { value },
                  }: {
                    target: { value: string };
                  }) => setQ(value)}
                  placeholder="Поиск"
                />
              </Form>
            )}
            <ul className="catalog-categories nav justify-content-center">
              {categories.map((category: category) => {
                return (
                  <li className="nav-item" key={category.id}>
                    <Link
                      className={
                        activatedCategory == category.id
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="#"
                      onClick={() => setActivatedCategory(category.id)}
                    >
                      {category.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="row">
              {items.length == 0 && status == "pending" && <Preloader />}
              {items.map((item: catalogItemType) => (
                <Card item={item} key={item.id} />
              ))}
            </div>
            {status == "pending" ? (
              <Preloader />
            ) : (
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
