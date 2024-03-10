import Preloader from "./Preloader.tsx";
import HitsItem from "./HitsItem.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useEffect} from "react";
import {hits, hitsRequest} from "../../redux/slices/hitsSlice.ts";
import {itemType} from "./interfaces.ts";

const Hits = () => {
    const {status, items} = useAppSelector(hits);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hitsRequest());
    }, []);

    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {status === "pending" ? <Preloader/> :
                <div className="row">
                    {items.map((item: itemType) => (
                        <HitsItem item={item} key={item.id}/>
                    ))}
                </div>
            }
        </section>
    )
}
export default Hits;