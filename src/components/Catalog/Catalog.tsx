import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {_searchQuery} from "../../redux/slices/catalogSlice.ts";
import {SyntheticEvent, useState} from "react";
import CatalogList from "./CatalogList.tsx";
import {getItems} from "../../redux/slices/catalogSlice.ts";
import {activatedCategory} from "../../redux/slices/categorySlice.ts";

const Catalog = () => {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector(_searchQuery);
    const category = useAppSelector(activatedCategory);
    const [q, setQ] = useState(searchQuery);

    const handleSearch = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(getItems({activatedCategory: category, searchQuery: q}));
    };

    return (
        <>
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <form
                    className="catalog-search-form form-inline"
                    onSubmit={handleSearch}
                >
                    <input
                        className="form-control"
                        value={q}
                        onChange={({target: {value}}: { target: { value: string } }) => setQ(value)}
                        placeholder="Поиск"
                    />
                </form>
                <CatalogList/>
            </section>
        </>
    );
}

export default Catalog;
