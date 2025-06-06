// Dummy authentication system for development
export interface DummyUser {
  id: string;
  email: string;
  password: string;
  role: 'creator' | 'brand' | 'agency';
  profile: {
    display_name?: string;
    company_name?: string;
    organization_name?: string;
    bio?: string;
    niche_tags?: string[];
    website_url?: string;
  };
}

export const dummyUsers: DummyUser[] = [
  // Creators
  {
    id: 'creator-1',
    email: 'sarah@creator.com',
    password: 'password123',
    role: 'creator',
    profile: {
      display_name: 'Sarah Johnson',
      bio: 'Fashion and lifestyle content creator',
      niche_tags: ['Fashion', 'Lifestyle']
    }
  },
  {
    id: 'creator-2',
    email: 'mike@creator.com',
    password: 'password123',
    role: 'creator',
    profile: {
      display_name: 'Mike Chen',
      bio: 'Tech reviewer and gaming enthusiast',
      niche_tags: ['Tech', 'Gaming']
    }
  },
  
  // Brands
  {
    id: 'brand-1',
    email: 'marketing@nike.com',
    password: 'password123',
    role: 'brand',
    profile: {
      company_name: 'Nike',
      website_url: 'https://nike.com',
      niche_tags: ['Sports', 'Fitness', 'Fashion']
    }
  },
  {
    id: 'brand-2',
    email: 'team@spotify.com',
    password: 'password123',
    role: 'brand',
    profile: {
      company_name: 'Spotify',
      website_url: 'https://spotify.com',
      niche_tags: ['Music', 'Entertainment']
    }
  },
  
  // Agencies
  {
    id: 'agency-1',
    email: 'hello@creativeco.com',
    password: 'password123',
    role: 'agency',
    profile: {
      organization_name: 'Creative Co Agency',
      bio: 'Full-service digital marketing agency'
    }
  },
  {
    id: 'agency-2',
    email: 'contact@digitalmax.com',
    password: 'password123',
    role: 'agency',
    profile: {
      organization_name: 'Digital Max',
      bio: 'Performance marketing specialists'
    }
  }
];

// Dispatch custom event when auth state changes
const dispatchAuthChange = () => {
  window.dispatchEvent(new CustomEvent('authStateChange'));
};

export const authenticateUser = (email: string, password: string): DummyUser | null => {
  const user = dummyUsers.find(u => u.email === email && u.password === password);
  return user || null;
};

export const createDummyUser = (email: string, password: string, role: 'creator' | 'brand' | 'agency', profileData: any): DummyUser => {
  const newUser: DummyUser = {
    id: `${role}-${Date.now()}`,
    email,
    password,
    role,
    profile: profileData
  };
  
  dummyUsers.push(newUser);
  return newUser;
};

// Store current user in localStorage
export const setCurrentUser = (user: DummyUser | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
  
  // Dispatch event to notify App component of auth state change
  dispatchAuthChange();
};

export const getCurrentUser = (): DummyUser | null => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
};

export const signOut = () => {
  localStorage.removeItem('currentUser');
  dispatchAuthChange();
};