import logo from "../../public/img/header-logo.png";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "../redux/store.ts";
import {SyntheticEvent, useState} from "react";
import {getItems} from "../redux/slices/catalogSlice";
import {_cart} from "../redux/slices/cartSlice.ts";

export default function Header() {
    const [visible, setVisible] = useState(true);
    const [q, setQ] = useState("");
    const cart = useAppSelector(_cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSearch = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(getItems({searchQuery:q, activatedCategory: 0}));
        setQ("");
        setVisible(!visible);
        navigate("./catalog");
    };

    return (
        <>
            <header className="container">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-sm navbar-light bg-light">
                            <NavLink className="navbar-brand" to="/">
                                <img src={logo} alt="Bosa Noga"/>
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
                                            onClick={() => setVisible(!visible)}
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
                                    <form
                                        data-id="search-form"
                                        className={`header-controls-search-form form-inline ${
                                            visible && "invisible"
                                        }`}
                                        onSubmit={handleSearch}
                                    >
                                        <input
                                            className="form-control"
                                            placeholder="Поиск"
                                            onChange={({target: {value}}: { target: { value: string } }) => setQ(value)}
                                            value={q}
                                        />
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}
