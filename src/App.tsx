
import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplateSelector from "./pages/TemplateSelector";
import CozyLuxeHaven from "./pages/CozyLuxeHaven";
import VintageCharmManor from "./pages/VintageCharmManor";
import UrbanChicRetreat from "./pages/UrbanChicRetreat";
import TropicalBohoEscape from "./pages/TropicalBohoEscape";
import RoyalHeritageHomecoming from "./pages/RoyalHeritageHomecoming";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TemplateSelector />} />
            <Route path="/cozy-luxe-haven" element={<CozyLuxeHaven />} />
            <Route path="/vintage-charm-manor" element={<VintageCharmManor />} />
            <Route path="/urban-chic-retreat" element={<UrbanChicRetreat />} />
            <Route path="/tropical-boho-escape" element={<TropicalBohoEscape />} />
            <Route path="/royal-heritage-homecoming" element={<RoyalHeritageHomecoming />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
