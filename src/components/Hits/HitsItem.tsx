import {NavLink} from "react-router-dom";
import {itemType} from "./interfaces.ts";

const HitsItem = ({item}: { item: itemType }) => {
    return (
        <>
            <div className="col-4" key={item.id}>
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
                        <p className="card-text">{item.price}</p>
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

export default HitsItem;