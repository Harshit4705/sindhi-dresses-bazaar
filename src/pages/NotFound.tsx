
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sindhi-50 to-white">
      <div className="container-custom text-center">
        <div className="animate-slide-in">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-sindhi-800">404</h1>
          <h2 className="mt-4 text-2xl md:text-3xl font-medium text-sindhi-900">Page Not Found</h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="mt-8">
            <Link to="/" className="btn-primary">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
