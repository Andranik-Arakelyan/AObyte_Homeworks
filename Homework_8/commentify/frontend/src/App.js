import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import { HOME_PAGE, PAGE_DETAIL, SIGN_UP } from "./constants/path";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import PostDetailPage from "./pages/PostDetailPage";

const router = createBrowserRouter([
  {
    path: HOME_PAGE,
    element: <HomePage />,
  },
  {
    path: SIGN_UP,
    element: <SignUpPage />,
  },
  {
    path: PAGE_DETAIL,
    element: <PostDetailPage />,
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
