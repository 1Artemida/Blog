import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PagePostsDashboard from "./pages/features/PagePostsDashboard";
import PagePosts from "./pages/features/PagePosts";
import PageSinglePost from "./pages/features/PageSinglePost";
import { Navbar } from "./components/Navbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PagePostsDashboard />}></Route>
        <Route
          path="/posts"
          element={<PagePosts id={0} title={""} body={""} />}
        ></Route>
        <Route
          path="/posts/:id"
          element={<PageSinglePost id={0} title={""} body={""} comments={[]} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
