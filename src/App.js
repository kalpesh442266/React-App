import "./App.css";
import { Lists, MyNav, Home } from "./components";
import { Routes, Route } from "react-router-dom";
import { ListContextProvider } from "./contexts/ListContext";

function App() {
  return (
    <div>
      <MyNav expand="sm" />
      <div className="App">
        <ListContextProvider>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
          </Routes>
        </ListContextProvider>
      </div>
    </div>
  );
}

export default App;
