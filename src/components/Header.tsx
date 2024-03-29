import logo from "../../public/img/header-logo.png";
import { NavLink, useNavigate, Form } from "react-router-dom";
import { useAppSelector } from "../redux/store.ts";
import { useState } from "react";
import { _cart } from "../redux/slices/cartSlice.ts";

export default function Header() {
  const [invisible, setInvisible] = useState(false);
  const [q, setQ] = useState("");
  const cart = useAppSelector(_cart);
  const navigate = useNavigate();

  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <NavLink className="navbar-brand" to="/">
                <img src={logo} alt="Bosa Noga" />
              </NavLink>
              <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/">
                      Главная
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="catalog">
                      Каталог
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="about">
                      О магазине
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="contacts">
                      Контакты
                    </NavLink>
                  </li>
                </ul>
                <div className="control__elements">
                  <div className="header-controls-pics">
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                      onClick={() => setInvisible(!invisible)}
                    ></div>
                    <div
                      className="header-controls-pic header-controls-cart"
                      onClick={() => navigate("/cart")}
                    >
                      {cart.length !== 0 && (
                        <div className="header-controls-cart-full">
                          {cart.length}
                        </div>
                      )}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <Form
                    data-id="search-form"
                    className={`header-controls-search-form form-inline ${!invisible && "invisible"}`}
                    action="/catalog"
                    onSubmit={() => {
                      setQ("");
                      setInvisible(false);
                    }}
                  >
                    <input
                      className="form-control"
                      placeholder="Поиск"
                      onChange={({
                        target: { value },
                      }: {
                        target: { value: string };
                      }) => setQ(value)}
                      value={q}
                      name="q"
                    />
                  </Form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
