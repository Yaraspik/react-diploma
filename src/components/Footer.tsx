import {NavLink, Link} from "react-router-dom";
import {contact_information} from "../../public/data/contact_information.ts";

const paySystems = [
    "footer-pay-systems-paypal",
    "footer-pay-systems-master-card",
    "footer-pay-systems-visa",
    "footer-pay-systems-yandex",
    "footer-pay-systems-webmoney",
    "footer-pay-systems-qiwi",
];

const Footer = () => {
    return (
        <footer className="container bg-light footer">
            <div className="row">
                <div className="col">
                    <section>
                        <h5>Информация</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">
                                    О магазине
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/catalog" className="nav-link">
                                    Каталог
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contacts" className="nav-link">
                                    Контакты
                                </NavLink>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="col">
                    <section>
                        <h5>Принимаем к оплате:</h5>
                        <div className="footer-pay">
                            {paySystems.map((el, i) => (
                            <div className={`footer-pay-systems ${el}`} key={i}></div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <div className="footer-copyright">
                            2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
                            аксессуаров. Все права защищены.
                            <br/>
                            Доставка по всей России!
                        </div>
                    </section>
                </div>
                <div className="col text-right">
                    <section className="footer-contacts">
                        <h5>Контакты:</h5>
                        <Link
                            className="footer-contacts-phone"
                            to={`tel:${contact_information.phone}`}
                        >
                            {contact_information.phone}
                        </Link>
                        <span className="footer-contacts-working-hours">
                {contact_information.schedule}
              </span>
                        <Link
                            className="footer-contacts-email"
                            to={`mailto:${contact_information.email}`}
                        >
                            {contact_information.email}
                        </Link>
                        <div className="footer-social-links">
                            <div className="footer-social-link footer-social-link-twitter"></div>
                            <div className="footer-social-link footer-social-link-vk"></div>
                        </div>
                    </section>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
