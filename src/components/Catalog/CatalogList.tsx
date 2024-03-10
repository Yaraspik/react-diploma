import {useAppSelector, useAppDispatch} from "../../redux/store.ts";
import {SyntheticEvent, useEffect} from "react";
import Preloader from "./Preloader.tsx";
import Card from "../Card.tsx";
import {
    _status,
    catalog, getItems,
    getMore,
    items as catalogItems,
} from "../../redux/slices/catalogSlice.ts";
import {activate, category, status, request} from "../../redux/slices/categorySlice.ts";
import {NavLink} from "react-router-dom";
import {useNavigation} from "react-router-dom";
import {catalogItemType} from "./interfaces.ts";

export default function CatalogList() {
    const {list, activatedCategory} = useAppSelector(category);
    let {itemLength, offset} = useAppSelector(catalog);
    const items = useAppSelector(catalogItems);
    const catalogStatus = useAppSelector(_status);
    const categoryStatus = useAppSelector(status);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();


    useEffect(() => {
        dispatch(request());
        dispatch(getItems({activatedCategory: 0}));
    },[])

    const handleGetMoreList = () => {
        dispatch(getMore({activatedCategory, offset: offset + 6}));
    };
    const handleChange = (e: SyntheticEvent, id: string) => {
        e.preventDefault();
        dispatch(activate(id));
    };

    return (
        <>
            {categoryStatus === "pending" && <Preloader/>}
            <ul className="catalog-categories nav justify-content-center">
                {list.map((category) => {
                    return (
                        <li className="nav-item" key={category.id}>
                            <NavLink
                                className={({isActive, isPending}) =>
                                    isActive
                                        ? "nav-link active"
                                        : isPending
                                            ? "pending"
                                            : "nav-link"
                                }
                                to="#"
                                onClick={(e) => handleChange(e, String(category.id))}
                            >
                                {category.title}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <div className="row">
                {
                    items.map((item: catalogItemType) => (
                        <Card item={item} key={item.id}/>
                    ))
                }
            </div>
            <div>{catalogStatus == "pending" ? <Preloader/> : <></>}</div>
            {catalogStatus == "pending" ? <></> : itemLength > 5 && (
                <div className="text-center">
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleGetMoreList}
                        disabled={navigation.state === "loading"}
                    >
                        Загрузить еще
                    </button>
                </div>
            )}
        </>
    );
}
