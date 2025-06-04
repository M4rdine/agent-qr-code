
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Agents from "./pages/Agents";
import CreateAgent from "./pages/CreateAgent";
import Setup from "./pages/Setup";
import QRCode from "./pages/QRCode";
import Leads from "./pages/Leads";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 md:ml-64">
            <Routes>
              <Route path="/" element={<Agents />} />
              <Route path="/create-agent" element={<CreateAgent />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/qrcode" element={<QRCode />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
