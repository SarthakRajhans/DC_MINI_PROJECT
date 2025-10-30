import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import TrainDetails from "./pages/TrainDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/search" element={<Layout><SearchResults /></Layout>} />
          <Route path="/train/:trainId" element={<Layout><TrainDetails /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/payment" element={<Layout><Payment /></Layout>} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/bookings" element={<Layout><Bookings /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/help" element={<Layout><Help /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
