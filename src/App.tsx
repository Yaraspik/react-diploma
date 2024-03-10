import './App.css';
import React from "react";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import Header from '../src/components/Header.tsx';
import Main from './routes/Main.tsx';
import Footer from '../src/components/Footer.tsx';
import Catalog from './components/Catalog/Catalog.tsx';
import Error from "./components/Error.tsx";
import Contacts from './components/Contacts.tsx';
import About from "./components/About.tsx";
import Cart from "./components/Cart/Cart.tsx";
import CatalogItem from "./components/Catalog/CatalogItem.tsx";
import MainPage from "./components/Main/MainPage.tsx";
import ThankYouPage from "./components/ThankYouPage.tsx";

const Layout = ({children}: { children?: React.JSX.Element }) => {
    return (
        <>
            <Header/>
            <Main children={children}/>
            <Footer/>
        </>
    );
}

const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout/>} errorElement={<Layout><Error/></Layout>}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/catalog/:id" element={<CatalogItem/>}/>
                <Route path="/catalog" element={<Catalog/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/thankYouPage" element={<ThankYouPage/>}/>
            </Route>
        ),
    )
;

const App = () => {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
};

export default App;
