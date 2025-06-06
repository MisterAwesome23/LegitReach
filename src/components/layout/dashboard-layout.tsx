import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, BarChart3, Settings, LogOut, 
  Package, User, Home, Briefcase, 
  Link as LinkIcon, UserPlus, ShoppingBag, Receipt
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SubscriptionStatus } from '@/components/stripe/subscription-status';
import { signOut } from '@/lib/dummy-auth';

type UserRole = 'creator' | 'brand' | 'agency' | 'admin';

interface SidebarLink {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: UserRole[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: UserRole | null;
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const navigate = useNavigate();

  // Define sidebar links based on role
  const sidebarLinks: SidebarLink[] = [
    // Links for all roles
    { 
      label: 'Dashboard', 
      icon: <Home size={20} />, 
      href: `/dashboard/${userRole || ''}`,
      roles: ['creator', 'brand', 'agency', 'admin']
    },
    
    // Creator specific links
    { 
      label: 'My Gigs', 
      icon: <Briefcase size={20} />, 
      href: '/dashboard/creator/gigs',
      roles: ['creator']
    },
    { 
      label: 'Affiliate Links', 
      icon: <LinkIcon size={20} />, 
      href: '/dashboard/creator/affiliate',
      roles: ['creator']
    },
    
    // Brand specific links
    { 
      label: 'Campaigns', 
      icon: <Package size={20} />, 
      href: '/dashboard/brand/campaigns',
      roles: ['brand', 'agency']
    },
    { 
      label: 'Analytics', 
      icon: <BarChart3 size={20} />, 
      href: '/dashboard/brand/analytics',
      roles: ['brand', 'agency']
    },
    { 
      label: 'Creators', 
      icon: <Users size={20} />, 
      href: '/dashboard/brand/creators',
      roles: ['brand', 'agency']
    },
    
    // Agency specific links
    { 
      label: 'Invite Brand', 
      icon: <UserPlus size={20} />, 
      href: '/dashboard/agency/invite',
      roles: ['agency']
    },
    
    // Admin specific links
    { 
      label: 'All Campaigns', 
      icon: <Package size={20} />, 
      href: '/admin/campaigns',
      roles: ['admin']
    },
    { 
      label: 'All Users', 
      icon: <Users size={20} />, 
      href: '/admin/users',
      roles: ['admin']
    },
    
    // Products and Orders for all authenticated users
    { 
      label: 'Products', 
      icon: <ShoppingBag size={20} />, 
      href: '/products',
      roles: ['creator', 'brand', 'agency', 'admin']
    },
    { 
      label: 'Orders', 
      icon: <Receipt size={20} />, 
      href: '/orders',
      roles: ['creator', 'brand', 'agency', 'admin']
    },
    
    // Settings link for all roles
    { 
      label: 'Settings', 
      icon: <Settings size={20} />, 
      href: `/dashboard/${userRole || ''}/settings`,
      roles: ['creator', 'brand', 'agency', 'admin']
    },
  ];
  
  const filteredLinks = sidebarLinks.filter(link => 
    userRole && link.roles.includes(userRole)
  );

  const handleLogout = async () => {
    try {
      signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Force navigation even if signOut fails
      navigate('/login');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200"
      >
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary-600">LegitReach</span>
          </Link>
        </div>
        
        {/* Subscription Status */}
        <div className="px-4 mb-4">
          <SubscriptionStatus />
        </div>
        
        <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg",
                "text-gray-600 hover:bg-gray-100 hover:text-primary-600",
                "transition-colors duration-200"
              )}
            >
              <span className="mr-3 text-gray-500">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-error-600"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-6 py-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}