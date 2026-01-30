import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { VolunteerProvider } from "@/contexts/VolunteerContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import VolunteerHome from "./pages/volunteer/VolunteerHome";
import VolunteerAvailability from "./pages/volunteer/VolunteerAvailability";
import VolunteerAssignments from "./pages/volunteer/VolunteerAssignments";
import VolunteerActivePickup from "./pages/volunteer/VolunteerActivePickup";
import VolunteerCompleted from "./pages/volunteer/VolunteerCompleted";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <VolunteerProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donor"
                element={
                  <ProtectedRoute allowedRoles={['donor']}>
                    <DonorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/consumer"
                element={
                  <ProtectedRoute allowedRoles={['consumer']}>
                    <ConsumerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer"
                element={
                  <ProtectedRoute allowedRoles={['volunteer']}>
                    <VolunteerHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/availability"
                element={
                  <ProtectedRoute allowedRoles={['volunteer']}>
                    <VolunteerAvailability />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/assignments"
                element={
                  <ProtectedRoute allowedRoles={['volunteer']}>
                    <VolunteerAssignments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/active"
                element={
                  <ProtectedRoute allowedRoles={['volunteer']}>
                    <VolunteerActivePickup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer/completed"
                element={
                  <ProtectedRoute allowedRoles={['volunteer']}>
                    <VolunteerCompleted />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </VolunteerProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
