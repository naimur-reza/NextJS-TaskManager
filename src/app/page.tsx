"use client";

import { Provider } from "react-redux";
import Home from "./pages/Home";
import { store } from "./redux/store/store";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <Provider store={store}>
      <Toaster />
      <Home />
    </Provider>
  );
};

export default page;
