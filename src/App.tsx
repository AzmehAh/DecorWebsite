import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import ProductDetailsNew from "./pages/ProductDetailsNew";
import ProductsNew from "./pages/ProductsNew";
import About from "./pages/About";
import Login from "./pages/Login";
import ReferenceData from "./pages/admin/ReferenceData";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import ProductForm from "./pages/admin/ProductForm";
import FAQsAdmin from "./pages/admin/FAQsAdmin";
import { supabase } from "./lib/supabase";

import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          await supabase.auth.refreshSession();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      }
    };

    initAuth();
  }, []);

  // ScrollToTop component to reset scroll position on navigation
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Login Route - Top level so it's accessible directly */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes - Protected by authentication */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route index element={<ProductsAdmin />} />
                      <Route path="products" element={<ProductsAdmin />} />
                      <Route path="products/new" element={<ProductForm />} />
                      <Route
                        path="products/:id/edit"
                        element={<ProductForm />}
                      />
                      <Route path="faqs" element={<FAQsAdmin />} />
                      <Route
                        path="reference-data"
                        element={<ReferenceData />}
                      />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Public Routes with Layout */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <main className="pt-16">
                    <Routes>
                      <Route index element={<Home />} />
                      <Route path="products" element={<ProductsNew />} />
                      <Route
                        path="products/:id"
                        element={<ProductDetailsNew />}
                      />
                      <Route path="about" element={<About />} />
                    </Routes>
                    <Footer />
                  </main>
                </>
              }
            />
            
            {/* Catch-all route for 404 - redirects to home */}
            <Route 
              path="*" 
              element={
                <>
                  <Header />
                  <main className="pt-16 py-20">
                    <div className="container mx-auto text-center">
                      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                      <p className="mb-6">The page you're looking for doesn't exist.</p>
                      <a href="/" className="inline-block bg-[#233054] text-white px-6 py-3 rounded-lg">
                        Return to Home
                      </a>
                    </div>
                    <Footer />
                  </main>
                </>
              } 
            />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;