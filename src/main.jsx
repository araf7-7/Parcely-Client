import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  // createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { router } from "./Routes/Routes";
import FirebaseProvider from "./FirebaseProvider/FirebaseProvider";
import { Toaster } from "react-hot-toast";
// import { Toaster } from "sonner";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </FirebaseProvider>
  </React.StrictMode>
); 