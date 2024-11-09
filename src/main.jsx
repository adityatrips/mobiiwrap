import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store, persistor } from "./stores";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import LoginModalProvider from "./context/LoginModalContext";
import NavigationMenu from "./components/NavigationMenu";
import AboutScreen from "./pages/AboutScreen";
import CartScreen from "./pages/CartScreen";
import CheckOutPage from "./pages/CheckOutPage";
import ContactUs from "./pages/ContactUsPage";
import FaqPage from "./pages/FaqPage";
import FeelingLucky from "./pages/FeelingLucky";
import Policies from "./pages/Policies";
import SignUp from "./pages/SignUpPage";
import AllProductsPage from "./pages/AllProductsPage";
import OneProductsPage from "./pages/OneProductsPage";
import OrderDetails from "./pages/OrderDetails";
import OneOrderDetail from "./pages/OneOrderDetail";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoginModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <NavigationMenu />
              <Routes>
                <Route path="/" element={<App />} />
                <Route
                  path="/about"
                  element={
                    <div className="mx-auto mt-20 container">
                      <AboutScreen />
                    </div>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <div className="mx-auto mt-20 container">
                      <AllProductsPage />
                    </div>
                  }
                />
                <Route
                  path="/products/:id"
                  element={
                    <div className="mx-auto mt-20 container">
                      <OneProductsPage />
                    </div>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <div className="mx-auto mt-20 container">
                      <CartScreen />
                    </div>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <div className="mx-auto mt-20 container">
                      <CheckOutPage />
                    </div>
                  }
                />
                <Route
                  path="/contact-us"
                  element={
                    <div className="mx-auto mt-20 container">
                      <ContactUs />
                    </div>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <div className="mx-auto mt-20 container">
                      <FaqPage />
                    </div>
                  }
                />
                <Route
                  path="/feeling-lucky"
                  element={
                    <div className="mx-auto mt-20 container">
                      <FeelingLucky />
                    </div>
                  }
                />
                <Route
                  path="/order-details"
                  element={
                    <div className="mx-auto mt-20 container">
                      <OrderDetails />
                    </div>
                  }
                />
                <Route
                  path="/order-details/:id"
                  element={
                    <div className="mx-auto mt-20 container">
                      <OneOrderDetail />
                    </div>
                  }
                />
                <Route
                  path="/policies"
                  element={
                    <div className="mx-auto mt-20 container">
                      <Policies />
                    </div>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <div className="mx-auto mt-20 container">
                      <SignUp />
                    </div>
                  }
                />
              </Routes>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </LoginModalProvider>
    </BrowserRouter>
  </StrictMode>
);
