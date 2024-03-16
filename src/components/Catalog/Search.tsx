import {Form} from "react-router-dom";
const Search = ({q, setQ}: {q: string, setQ: Function}) => {
    return (
        <>
            <Form className="catalog-search-form form-inline">
                <input
                    className="form-control"
                    name="q"
                    value={q}
                    onChange={({
                                   target: { value },
                               }: {
                        target: { value: string };
                    }) => setQ(value)}
                    placeholder="Поиск"
                />
            </Form>
        </>
    );
}
export default Search;