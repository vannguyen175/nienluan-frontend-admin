import React from "react";
// import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
// import { useQuery } from "@tanstack/react-query";

export function App() {
    // const fetchApi = async () => {
    //     const res = await axios.get(
    //         `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll/dien-thoai`
    //     );
    //     return res.data;
    // };

    // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
    // console.log('query.data: ', query.data);
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.page;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
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
