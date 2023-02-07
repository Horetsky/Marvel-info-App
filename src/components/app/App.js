import AppHeader from "../appHeader/AppHeader";

import { MainPage, ComicsPage } from "../pages";

const App = () => {


    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <MainPage/> */}
                <ComicsPage/>
            </main>
        </div>
    )
}

export default App;