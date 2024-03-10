import { contact_information } from "../../public/data/contact_information.ts";
import { Link } from "react-router-dom";

const Contacts = () => {
    return (
        <>
            <section className="top-sales">
                <h2 className="text-center">Контакты</h2>
                <p>
                    Наш головной офис расположен в г.Москва, по адресу: {contact_information.address}
                    .
                </p>
                <h5 className="text-center">Координаты для связи:</h5>
                <p>
                    Телефон:{" "}
                    <Link to={`tel:${contact_information.phone}`}>{contact_information.phone}</Link> (
                    {contact_information.schedule})
                </p>
                <p>
                    Email: <Link to={`mailto:${contact_information.email}`}>{contact_information.email}</Link>
                </p>
            </section>
        </>
    );
}

export default Contacts;
