import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./components/pages/homePage/HomePage.jsx";
import GraphPage from "./components/pages/graphPage/GraphPage.jsx";
import DataStructurePage from "./components/pages/dataStructure/DataStructurePage.jsx";
import {Provider} from "react-redux";
import store from "./assets/dataStructureStore/store.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage/>,
	},
	{
		path: "/graph",
		element: <GraphPage/>,
	},
	{
		path: "/dataStructure",
		element: <Provider store={store}>
			<DataStructurePage/>
		</Provider>
	}
])

function App() {
	return (
			<RouterProvider router={router}/>
	)
}

export default App
