import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary/20 mb-4">404</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Page Not Found</h1>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
