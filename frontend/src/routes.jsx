import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./features/auth/pages/Login";
import { RegisterPage } from "./features/auth/pages/Register";
import NormalLayout from "./Layouts/NormalLayout";
import LandingPage from "./features/LandingPage/pages/LandingPage";
import Listings from "./features/listings/Pages/Listings";
import VerifyOtp from "./features/auth/pages/VerifyOtp";
import CreateListing from "./features/listings/Pages/CreateListing";
import UpdateListing from "./features/listings/Pages/UpdateListing";
import ListingMore from "./features/listings/Pages/ListingMore";
import Profile from "./features/Profile/Pages/Profile";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import Swaps from "./features/swap/Pages/Swaps";
import Chats from "./features/chats/Pages/Chats";
import ProtectedLayoutWithNoFooter from "./Layouts/ProtectedWithNofooterOrFootbar";

const Approutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <NormalLayout>
              <LandingPage />
            </NormalLayout>
          }
        />
        <Route
          path="/listings"
          element={
            <NormalLayout>
              <Listings />
            </NormalLayout>
          }
        />
        <Route
          path="/listings/update/:id"
          element={
            <ProtectedLayout>
              <UpdateListing />
            </ProtectedLayout>
          }
        />
        <Route
          path="/listings/more/:id"
          element={
            <NormalLayout>
              <ListingMore />
            </NormalLayout>
          }
        />
        <Route
          path="/createListing"
          element={
            <ProtectedLayout>
              <CreateListing />
            </ProtectedLayout>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <NormalLayout>
              <Profile />
            </NormalLayout>
          }
        />
        <Route
          path="/swaps"
          element={
            <ProtectedLayout>
              <Swaps />
            </ProtectedLayout>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedLayoutWithNoFooter>
              <Chats />
            </ProtectedLayoutWithNoFooter>
          }
        />
        <Route
          path="/chats/:id"
          element={
            <ProtectedLayoutWithNoFooter>
              <Chats />
            </ProtectedLayoutWithNoFooter>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Approutes;
