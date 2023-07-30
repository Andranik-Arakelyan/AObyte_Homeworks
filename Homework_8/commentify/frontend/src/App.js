import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import { HOME_PAGE, PAGE_DETAIL, SIGN_UP } from "./constants/path";
import HomePage from "./pages/HomePage";
import SignUpPage, { action as authAction } from "./pages/SignUpPage";
import PostDetailPage from "./pages/PostDetailPage";
import AddPost from "./pages/AddPost";

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
    action: authAction,
  },
  {
    path: "/addPost",
    element: <AddPost />,
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
