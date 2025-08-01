'use client';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

// const user = {
//   id: 'USR-000',
//   avatar: '/assets/avatar.png',
//   firstName: 'Sofia',
//   lastName: 'Rivers',
//   email: 'sofia@devias.io',
// } satisfies User;

export interface SignUpParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}
export interface SignUpBusinessParams {
  businessName: string;
  categoryName: string;
  startDate: string; // format: YYYY-MM-DD (e.g., '2025-08-01')
  currency: string;
  logo?: File | string; // File for upload or URL if already uploaded
  website?: string;
  businessContact: string;

  // Location
  country: string;
  state: string;
  city: string;
  postalCode: string;

  // Details
  companyDetails?: string;
  username: string;
  email: string;

  // Social Media Links
  facebookLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  youtubeLink?: string;
  twitterLink?: string;

  // Authentication
  password: string;
  confirmPassword: string;

  // Terms
  acceptTerms: boolean;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request
    try {
      const response = await fetch('http://localhost:5000/auth/users/admin-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: _.username,
          email: _.email,
          password: _.password,
          confirmPassword: _.confirmPassword,
          terms: _.terms ? 'true' : 'false',
        }),
      });
      const data = await response.json();
     
      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed');
      }
      const token= data.token;
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      return { error: 'Sign up failed' };
    }
    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    
   
 
    return {};
  }



  async signUpwithbusiness(_: SignUpBusinessParams): Promise<{ error?: string }> {
    // Make API request
    try {
      const response = await fetch(`${process.env.BackendURL}/auth/users/admin-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: _.username,
          email: _.email,
          password: _.password,
          confirmPassword: _.confirmPassword,
         
        }),
      });
      const data = await response.json();
     
      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed');
      }
      const token= data.token;
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      return { error: 'Sign up failed' };
    }
    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    
   
 
    return {};
  }
  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
  

    // Make API request
try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
    const token = data.token;
    
    localStorage.setItem('auth-token', token);
    localStorage.setItem('user', JSON.stringify(data.user));
  // Store token or perform any client-side session logic here
  // For example: localStorage.setItem('token', data.token);


} catch (err) {
 
  return { error: 'Invalid credentials' };
}




    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

   getUser(): { data?: User | null; error?: string } {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
  const token = localStorage.getItem('auth-token');
  const userJson = localStorage.getItem('user');
  if (!token || !userJson) {
    return { data: null };
  }

  const parsedUser = JSON.parse(userJson);

  return { data:  {
    id: parsedUser.id,
    avatar: '/assets/avatar.png',
    name: parsedUser.username,
    email: parsedUser.email,
  } };
}

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
