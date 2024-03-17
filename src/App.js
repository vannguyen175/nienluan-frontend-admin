import React from "react";
// import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";

// window.addEventListener("touchstart, wheel", (event) => {
// 	event.preventDefault();
// }, {passive: true});

// import { useQuery } from "@tanstack/react-query";

export function App() {
	const getisAdminString = localStorage.getItem("isAdmin");
	const isAdmin = getisAdminString?.toLowerCase?.() === "true"; //convert string to boolean

	return (
		<div>
			<Router>
				<Routes>
					{routes.map((route, index) => {
						let Page = route.page;
						const Layout = route.layout;
						const isCheckAuth = !route.isPrivate || Boolean(isAdmin);
						return (
							<Route
								key={index}
								path={isCheckAuth === true ? route.path : "*"}
								element={
									<Layout>
										{isCheckAuth === true ? <Page /> : <NotFoundPage />}
									</Layout>
								}
							/>
						);
					})}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
