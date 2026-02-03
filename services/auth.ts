import { account } from '@/lib/appwrite';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { ID, OAuthProvider } from 'react-native-appwrite';

// Important for closing the auth session properly
WebBrowser.maybeCompleteAuthSession();

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    // Auto login after signup
    await signIn(email, password);
    return user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const redirectUrl = makeRedirectUri({
      scheme: 'com.movieflix.app',
      path: 'auth/callback',
    });

    const response = await account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUrl,
      redirectUrl,
    );

    return response;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error: any) {
    // Don't log error if user is just not logged in
    if (error?.code !== 401) {
      console.error('Get current user error:', error);
    }
    return null;
  }
};

export const updateName = async (name: string) => {
  try {
    return await account.updateName(name);
  } catch (error) {
    console.error('Update name error:', error);
    throw error;
  }
};

export const updateEmail = async (email: string, password: string) => {
  try {
    return await account.updateEmail(email, password);
  } catch (error) {
    console.error('Update email error:', error);
    throw error;
  }
};

export const updatePassword = async (
  newPassword: string,
  oldPassword: string,
) => {
  try {
    return await account.updatePassword(newPassword, oldPassword);
  } catch (error) {
    console.error('Update password error:', error);
    throw error;
  }
};
