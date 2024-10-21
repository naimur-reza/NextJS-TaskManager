"use client";

import { Provider } from "react-redux";
import Home from "./pages/Home";
import { store } from "./redux/store/store";

const page = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default page;
