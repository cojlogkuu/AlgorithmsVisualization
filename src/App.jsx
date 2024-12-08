import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./components/pages/homePage/HomePage.jsx";
import GraphPage from "./components/pages/graphPage/GraphPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/graph",
    element: <GraphPage/>,
  }
])

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
