import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MainPage } from "./components/MainPage";

export function Main() {
    return (
        <section className="hoxtify-app">
            <Header/>
            <section className="main-wrapper">
                <Sidebar />
                <MainPage />
            </section>
            
        </section>
    )
}