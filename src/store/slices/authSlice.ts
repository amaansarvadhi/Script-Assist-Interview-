import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware'; // Import createJSONStorage

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  id: number | null;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  image: string | null;
  signInSuccess: (data: any) => void;
  signOutSuccess: () => void;
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        refreshToken: null,
        id: null,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        gender: null,
        image: null,
        signInSuccess: (data) => {
          console.log('SignIn Success Data:', data);
          set(
            {
              token: data.accessToken,
              refreshToken: data.refreshToken,
              id: data.id,
              username: data.username,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
              image: data.image,
            },
            false,
            'auth/signInSuccess' // Named action for devtools
          );
        },
        signOutSuccess: () => {
          console.log('User signed out. Clearing state.');
          set(
            {
              token: null,
              refreshToken: null,
              id: null,
              username: null,
              email: null,
              firstName: null,
              lastName: null,
              gender: null,
              image: null,
            },
            false,
            'auth/signOutSuccess' // Named action for devtools
          );
        },
      }),
      {
        name: 'auth-storage', // Storage key name
        storage: createJSONStorage(() => localStorage), // Use createJSONStorage for correct type handling
      }
    ),
    { name: 'AuthStore' } // Name for devtools
  )
);

export default useAuthStore;
