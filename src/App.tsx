import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import BulkCheck from "./pages/BulkCheck";
import ReportDomain from "./pages/ReportDomain";
import ApiDocs from "./pages/ApiDocs";
import GetApiKey from "./pages/GetApiKey";
import Terms from "./pages/Terms";
import Research from "./pages/Research";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="disposable-check-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bulk" element={<BulkCheck />} />
            <Route path="/report" element={<ReportDomain />} />
            <Route path="/docs" element={<ApiDocs />} />
            <Route path="/get-api-key" element={<GetApiKey />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/the-disposable-email-epidemic" element={<Research />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
