import { useAppSelector, useAppDispatch } from "../../redux/store.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { _item, _status, findItem } from "../../redux/slices/catalogSlice.ts";
import Preloader from "../Preloader.tsx";
import { cartItemType } from "../Cart/interfaces.ts";
import { catalogItemDetailType, sizesType } from "./interfaces.ts";

const CatalogItem = () => {
  const item: catalogItemDetailType | null = useAppSelector(_item);
  const loadingCatalog = useAppSelector(_status);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(1);
  const [selected, setSelect] = useState({ selectedSize: false, size: "" });
  const { id } = useParams();
  const navigate = useNavigate();
  let quantity = 0;

  useEffect(() => {
    dispatch(findItem(Number(id)));
  }, [id, dispatch]);

  function addProductBasketStorage(item: cartItemType) {
    const localCart = localStorage.getItem("cart");

    if (localCart === null) {
      localStorage.setItem("cart", JSON.stringify([item]));
      return;
    }

    const cart = JSON.parse(localCart);
    const index = cart.findIndex(
      (el: cartItemType) => el.id === item.id && el.size === item.size,
    );

    if (index !== -1) {
      cart[index].amount += Number(item.amount);
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }

  const handleChangeAmount = (value: number) => {
    const changeAmount = amount + value;

    if (changeAmount > 0 && changeAmount <= 10) {
      setAmount(changeAmount);
    }
  };

  const handleSelected = (size: string) => {
    setSelect(() => ({
      selectedSize: !selected.selectedSize,
      size: !selected.selectedSize ? size : "",
    }));
  };

  const handleAddBasket = () => {
    if (!selected.size) return;

    if (item === null) return;
    const product: cartItemType = {
      title: item.title,
      size: +selected.size,
      price: item.price,
      id: +item.id,
      amount,
    };

    addProductBasketStorage(product);
    navigate("/cart");
  };

  return (
    <>
      {loadingCatalog === "pending" ? (
        <Preloader />
      ) : (
        <section className="catalog-item">
          <h2 className="text-center">{item?.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={item?.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item?.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item?.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item?.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item?.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item?.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item?.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {item?.sizes.map((el: sizesType, index) => {
                    if (el.available) {
                      quantity += 1;
                      return (
                        <span
                          key={index}
                          className={
                            selected.size === el.size
                              ? "catalog-item-size selected"
                              : "catalog-item-size"
                          }
                          onClick={() => handleSelected(el.size)}
                        >
                          {el.size}
                        </span>
                      );
                    }
                  })}
                  {quantity === 0 ? (
                    <span className="product__out__stock">
                      Товара нет в наличие!
                    </span>
                  ) : (
                    <></>
                  )}
                </p>

                {item?.sizes[0].available || item?.sizes[1].available ? (
                  <>
                    <p>
                      Количество:
                      <span className="btn-group btn-group-sm pl-2">
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleChangeAmount(-1)}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-primary">
                          {amount}
                        </span>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleChangeAmount(1)}
                        >
                          +
                        </button>
                      </span>
                    </p>
                    <button
                      className="btn btn-danger btn-block btn-lg"
                      onClick={handleAddBasket}
                    >
                      В корзину
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CatalogItem;
