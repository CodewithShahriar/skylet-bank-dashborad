
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BankDataProvider } from "@/contexts/BankDataContext";
import DashboardLayout from "@/components/layout/DashboardLayout";

import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Cards from "@/pages/Cards";
import Payments from "@/pages/Payments";
import History from "@/pages/History";
import Reports from "@/pages/Reports";
import Transfer from "@/pages/Transfer";
import Withdraw from "@/pages/Withdraw";
import MFSTransfer from '@/pages/MFSTransfer';
import Support from "@/pages/Support";
import Settings from "@/pages/Settings";
import MobileTopup from "@/pages/MobileTopup";
import NotFound from "@/pages/NotFound";
// Ensure the correct path to the OpenAccount component
import OpenAccount from "@/pages/OpenAccount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <BankDataProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Index />} />
              <Route path="/open-account" element={<OpenAccount />} />
              
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="cards" element={<Cards />} />
                <Route path="payments" element={<Payments />} />
                <Route path="history" element={<History />} />
                <Route path="reports" element={<Reports />} />
                <Route path="transfer" element={<Transfer />} />
                <Route path="support" element={<Support />} />
                <Route path="settings" element={<Settings />} />
                <Route path="topup" element={<MobileTopup />} />
                <Route path="mfs-transfer" element={<MFSTransfer />} />
                <Route path="withdraw" element={<Withdraw />} />

              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BankDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
