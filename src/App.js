import Header from './features/Header/Header';
import Home from './features/Home/Home';
import Subreddits from './features/Subreddits/Subreddits';

function App() {
    return (
        <div>
            <Header/>
            <main>
                <Home/>
            </main>

            {
                /*
                    The aside tag is related to the main tag in semantic HTML,
                    and is used as a sidebar toward the right side of the web
                */
            }

            <aside>
                <Subreddits/>
            </aside>
        </div>
    );
};

export default App;
