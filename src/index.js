import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Create a client
const queryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}
        {/* <Provider> */}
        <ToastContainer hideProgressBar position="top-center" transition={Flip} autoClose={2000} />
            <App />
        {/* </Provider> */}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
