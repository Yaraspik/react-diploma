import {NavLink} from "react-router-dom";
import {cartItemType} from "./interfaces.ts";

const CartItem = ({item, deleteHandler}: { item: cartItemType, deleteHandler: Function }) => {
    return (
        <div className="cart-item">
            <div>
                <div>
                    <NavLink to={`/catalog/${item.id}`}>{item.title}</NavLink>
                </div>
                <p>Размер - {item.size}</p>
                <p>Количество - {item.amount}</p>
                <p>Цена - {item.price} руб.</p>
                <p>Стоимость - {item.amount * item.price} руб.</p>
            </div>
            <div>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteHandler(`${item.id}${item.size}`)}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}
export default CartItem;