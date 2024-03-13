import { useAppSelector, useAppDispatch } from "../../redux/store.ts";
import { NavLink } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import { cartAdd, _cart, cartReset } from "../../redux/slices/cartSlice.ts";
import {
  _order,
  orderRequest,
  orderReset,
} from "../../redux/slices/orderSlice.ts";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader.tsx";
import { cartItemType } from "./interfaces.ts";

const Cart = () => {
  const cart: cartItemType[] = useAppSelector(_cart);
  const { loading, error } = useAppSelector(_order);
  const navigate = useNavigate();

  const [data, setData] = useState({ phone: "", address: "" });
  const dispatch = useAppDispatch();
  let sum;

  if (cart !== null) {
    sum = cart.reduce((sum, item) => sum + item.price * item.amount, 0);
  }

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (!localCart) return;
    const items = JSON.parse(localCart);
    dispatch(cartAdd(items));
  }, [dispatch]);

  const deleteHandler = (id: string) => {
    const product = deleteProductBasketStorage(id);
    dispatch(cartAdd(product));
  };

  const handelChange = ({
    target: { id, value },
  }: {
    target: { id: string; value: string };
  }) => {
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      return;
    }

    const order = {
      owner: {
        phone: data.phone,
        address: data.address,
      },
      items: cart.map((product) => ({
        id: product.id,
        price: product.price,
        count: product.amount,
      })),
    };
    dispatch(orderRequest(order));
    clearData();
  };

  const clearData = () => {
    localStorage.removeItem("cart");
    dispatch(cartReset());
    dispatch(orderReset());
    navigate("/thankYouPage");
  };

  function deleteProductBasketStorage(idSize: string) {
    const localCart = localStorage.getItem("cart");
    if (!localCart) return;
    let productList = JSON.parse(localCart);
    productList = productList.filter(
      (item: cartItemType) => `${item.id}${item.size}` !== idSize,
    );
    localStorage.setItem("cart", JSON.stringify(productList));
    return productList;
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {cart.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>
                    <NavLink to={`/catalog/${item.id}`}>{item.title}</NavLink>
                  </td>
                  <td>{item.size}</td>
                  <td>{item.amount}</td>
                  <td>{item.price} руб.</td>
                  <td>{item.amount * item.price} руб.</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteHandler(`${item.id}${item.size}`)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="text-right">Общая стоимость</td>
                <td>{sum}руб.</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <>
            <div className="empty__cart">Корзина пустая!</div>
          </>
        )}
      </section>
      {cart.length > 0 ? (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  value={data.phone}
                  onChange={handelChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  value={data.address}
                  onChange={handelChange}
                  required
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                  required
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">
                Оформить
              </button>
            </form>
          </div>
        </section>
      ) : (
        <></>
      )}

      {loading && <Preloader />}
      {error && (
        <div className="error-msg">
          <p>Произошла ошибка</p>
          <div onClick={handleSubmit}>Повтрорить запрос</div>
        </div>
      )}
    </>
  );
};

export default Cart;
