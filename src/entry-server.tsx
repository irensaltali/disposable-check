import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

// Eager imports so React.lazy/Suspense fallbacks don't appear in prerendered HTML.
// Research and ValueProposition are excluded — they import Chart.js/Plotly which
// access `window` at module load time and crash in Node.js.
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BulkCheck from "./pages/BulkCheck";
import ReportDomain from "./pages/ReportDomain";
import ApiDocs from "./pages/ApiDocs";
import GetApiKey from "./pages/GetApiKey";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Glossary from "./pages/Glossary";
import GlossaryTerm from "./pages/GlossaryTerm";
import Comparisons from "./pages/Comparisons";
import ComparisonDetail from "./pages/ComparisonDetail";
import UseCases from "./pages/UseCases";
import UseCaseDetail from "./pages/UseCaseDetail";

export async function prerender(data: { url: string }) {
  const queryClient = new QueryClient();

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="disposable-check-theme">
        <TooltipProvider>
          <StaticRouter location={data.url}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/bulk" element={<BulkCheck />} />
              <Route path="/report" element={<ReportDomain />} />
              <Route path="/docs" element={<ApiDocs />} />
              <Route path="/get-api-key" element={<GetApiKey />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/glossary/:slug" element={<GlossaryTerm />} />
              <Route path="/compare" element={<Comparisons />} />
              <Route path="/compare/:slug" element={<ComparisonDetail />} />
              <Route path="/use-cases" element={<UseCases />} />
              <Route path="/use-cases/:slug" element={<UseCaseDetail />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StaticRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );

  return { html };
}
