import {Link} from "react-router-dom";

const CategoryItem = ({category, activatedCategory, setActivatedCategory, q}: {
    category: {id: number, title: string}, activatedCategory: number, setActivatedCategory: Function, q: string
}) => {
    return (
        <>
            <li className="nav-item">
                <Link
                    className={
                        activatedCategory == category.id
                            ? "nav-link active"
                            : "nav-link"
                    }
                    to="#"
                    state={{category: category.id, query: q}}
                    onClick={(e) => {
                        e.preventDefault();
                        setActivatedCategory(category.id);
                    }}
                >
                    {category.title}
                </Link>
            </li>
        </>
    );
}
export default CategoryItem;