import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import { HOME_PAGE, PAGE_DETAIL, SIGN_UP } from "./constants/path";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import PostDetail from "./pages/PostDetail";

const router = createBrowserRouter([
  {
    path: HOME_PAGE,
    element: <Home />,
  },
  {
    path: SIGN_UP,
    element: <SignUp />,
  },
  {
    path: PAGE_DETAIL,
    element: <PostDetail />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
