import Preloader from "./Preloader.tsx";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { useEffect } from "react";
import { hits, hitsRequest } from "../../redux/slices/hitsSlice.ts";
import Card from "../Card.tsx";
import {catalogItemType} from "../Catalog/interfaces.ts";
const Hits = () => {
  const { status, items, error } = useAppSelector(hits);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hitsRequest());
  }, [dispatch]);

  if (items.length == 0) return null;
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {status === "error" ? (
        <div className="text-center">
          <p>Что-то пошло не так: {error}</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => dispatch(hitsRequest())}
          >
            Попробовать ещё
          </button>
        </div>
      ) : status === "pending" ? (
        <Preloader />
      ) : (
        <div className="row">
          {items.map((item: catalogItemType) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      )}
    </section>
  );
};
export default Hits;
