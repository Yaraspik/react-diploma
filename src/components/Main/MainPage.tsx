import Hits from "../Hits/Hits.tsx";
import CatalogList from "../Catalog/CatalogList.tsx";

const MainPage = () => {
    return (
        <>
            <Hits/>
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <CatalogList/>
            </section>
        </>
    );
}

export default MainPage;
