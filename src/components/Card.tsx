import {NavLink} from "react-router-dom";
import {catalogItemType} from "./Catalog/interfaces.ts";

const Card = ({item}: {item: catalogItemType}) => {
    return (
        <>
            <div className="col-4">
                <div className="card catalog-item-card">
                    <div className="images">
                        <img
                            src={item.images[0]}
                            className="card-img-top img-fluid"
                            alt={`"${item.title}"`}
                        />
                    </div>
                    <div className="card-body">
                        <p className="card-text">{item.title}</p>
                        <p className="card-text">{item.price}₽</p>
                        <NavLink
                            to={`/catalog/${item.id}`}
                            className="btn btn-outline-primary"
                        >
                            Заказать
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
