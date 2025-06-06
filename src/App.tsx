import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LandingPage } from './pages/landing/landing-page';
import { ForCreatorsPage } from './pages/marketing/for-creators';
import { ForBrandsPage } from './pages/marketing/for-brands';
import { PricingPage } from './pages/marketing/pricing';
import { AboutPage } from './pages/marketing/about';
import { LoginPage } from './pages/auth/login-page';
import { SignupCreatorPage } from './pages/auth/signup-creator';
import { SignupBrandPage } from './pages/auth/signup-brand';
import { SignupAgencyPage } from './pages/auth/signup-agency';
import { CreatorDashboard } from './pages/dashboard/creator-dashboard';
import { BrandDashboard } from './pages/dashboard/brand-dashboard';
import { AgencyDashboard } from './pages/dashboard/agency-dashboard';
import { CheckoutSuccessPage } from './pages/checkout/success';
import { CheckoutCanceledPage } from './pages/checkout/canceled';
import { OrdersPage } from './pages/orders/orders-page';
import { ProductsPage } from './pages/products/products-page';
import { DashboardLayout } from './components/layout/dashboard-layout';
import { Toaster } from './components/ui/toaster';
import { getCurrentUser, DummyUser } from '@/lib/dummy-auth';

// Placeholder components for sub-routes
function CreatorGigs() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Gigs</h1>
      <p className="text-gray-600">Manage your active gigs and collaborations here.</p>
    </div>
  );
}

function CreatorAffiliate() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Affiliate Links</h1>
      <p className="text-gray-600">View your affiliate links created by brands here.</p>
    </div>
  );
}

function BrandCampaigns() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Campaigns</h1>
      <p className="text-gray-600">Manage your marketing campaigns here.</p>
    </div>
  );
}

function BrandAnalytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      <p className="text-gray-600">View your campaign analytics and performance metrics here.</p>
    </div>
  );
}

function BrandCreators() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Creators</h1>
      <p className="text-gray-600">Browse and connect with creators here.</p>
    </div>
  );
}

function AgencyInvite() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Invite Brand</h1>
      <p className="text-gray-600">Invite brands to join your agency here.</p>
    </div>
  );
}

function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      <p className="text-gray-600">Manage your account settings here.</p>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children, allowedRoles, currentUser }: { 
  children: React.ReactNode; 
  allowedRoles: string[]; 
  currentUser: DummyUser | null; 
}) {
  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Dashboard wrapper with layout
function DashboardWrapper({ userRole }: { userRole: string }) {
  return (
    <DashboardLayout userRole={userRole as any}>
      <Outlet />
    </DashboardLayout>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState<DummyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Listen for storage changes (when user logs in/out)
  useEffect(() => {
    const handleStorageChange = () => {
      const user = getCurrentUser();
      setCurrentUser(user);
    };

    // Listen for custom events when auth state changes
    window.addEventListener('authStateChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('authStateChange', handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/for-creators" element={<ForCreatorsPage />} />
        <Route path="/for-brands" element={<ForBrandsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Auth routes - redirect to dashboard if already logged in */}
        <Route 
          path="/login" 
          element={currentUser ? <Navigate to={`/dashboard/${currentUser.role}`} replace /> : <LoginPage />} 
        />
        <Route 
          path="/signup/creator" 
          element={currentUser ? <Navigate to={`/dashboard/${currentUser.role}`} replace /> : <SignupCreatorPage />} 
        />
        <Route 
          path="/signup/brand" 
          element={currentUser ? <Navigate to={`/dashboard/${currentUser.role}`} replace /> : <SignupBrandPage />} 
        />
        <Route 
          path="/signup/agency" 
          element={currentUser ? <Navigate to={`/dashboard/${currentUser.role}`} replace /> : <SignupAgencyPage />} 
        />
        
        {/* Checkout routes */}
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/checkout/canceled" element={<CheckoutCanceledPage />} />
        
        {/* Protected routes */}
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute allowedRoles={['creator', 'brand', 'agency']} currentUser={currentUser}>
              <OrdersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProtectedRoute allowedRoles={['creator', 'brand', 'agency']} currentUser={currentUser}>
              <ProductsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected dashboard routes with nested routing */}
        <Route 
          path="/dashboard/creator" 
          element={
            <ProtectedRoute allowedRoles={['creator']} currentUser={currentUser}>
              <DashboardWrapper userRole="creator" />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreatorDashboard />} />
          <Route path="gigs" element={<CreatorGigs />} />
          <Route path="affiliate" element={<CreatorAffiliate />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route 
          path="/dashboard/brand" 
          element={
            <ProtectedRoute allowedRoles={['brand']} currentUser={currentUser}>
              <DashboardWrapper userRole="brand" />
            </ProtectedRoute>
          }
        >
          <Route index element={<BrandDashboard />} />
          <Route path="campaigns" element={<BrandCampaigns />} />
          <Route path="analytics" element={<BrandAnalytics />} />
          <Route path="creators" element={<BrandCreators />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route 
          path="/dashboard/agency" 
          element={
            <ProtectedRoute allowedRoles={['agency']} currentUser={currentUser}>
              <DashboardWrapper userRole="agency" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AgencyDashboard />} />
          <Route path="campaigns" element={<BrandCampaigns />} />
          <Route path="analytics" element={<BrandAnalytics />} />
          <Route path="creators" element={<BrandCreators />} />
          <Route path="invite" element={<AgencyInvite />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Generic dashboard redirect */}
        <Route 
          path="/dashboard" 
          element={
            currentUser ? (
              <Navigate to={`/dashboard/${currentUser.role}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;