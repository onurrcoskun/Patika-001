import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import Footer from "./component/Footer";

import {MyProvider} from "./context/myContext";

function App() {
  return (
    <MyProvider>
      <div className="App">
        <section className="todoapp">
          <Header />
          <Main />
          <Footer />
        </section>
      </div>
    </MyProvider>
  );
}

export default App;