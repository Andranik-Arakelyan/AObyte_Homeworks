import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Main } from "./components";

import "./App.css";
import { HOME_PAGE } from "./constants/path";

const router = createBrowserRouter([
  {
    path: HOME_PAGE,
  },
]);

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
