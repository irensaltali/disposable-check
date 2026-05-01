import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const BulkCheck = lazy(() => import("./pages/BulkCheck"));
const ReportDomain = lazy(() => import("./pages/ReportDomain"));
const ApiDocs = lazy(() => import("./pages/ApiDocs"));
const GetApiKey = lazy(() => import("./pages/GetApiKey"));
const Terms = lazy(() => import("./pages/Terms"));
const Research = lazy(() => import("./pages/Research"));
const ValueProposition = lazy(() => import("./pages/ValueProposition"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Glossary = lazy(() => import("./pages/Glossary"));
const GlossaryTerm = lazy(() => import("./pages/GlossaryTerm"));
const Comparisons = lazy(() => import("./pages/Comparisons"));
const ComparisonDetail = lazy(() => import("./pages/ComparisonDetail"));
const UseCases = lazy(() => import("./pages/UseCases"));
const UseCaseDetail = lazy(() => import("./pages/UseCaseDetail"));

const RouteFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="h-6 w-6 animate-pulse rounded-full bg-muted" aria-label="Loading" />
  </div>
);

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
        <Route path="/the-disposable-email-epidemic" element={<Research />} />
        <Route path="/value-proposition" element={<ValueProposition />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
