import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { getProfile, upsertProfile } from '../supabase/db/profile'

interface AuthContextType {
  user: User | null
  profile: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on app start
  useEffect(() => {
    console.log('Getting initial session')
    getInitialSession()
  }, [])

  // Check for existing session on app start
  useEffect(() => {
    console.log('Getting initial session')
    getInitialSession()
  }, [])

  const getInitialSession = async () => {
    try {
      console.log('Getting session from Supabase')
      const { data: { session }, error } = await supabase.auth.getSession()
      console.log('Session data:', session, 'Error:', error)
      
      if (session?.user) {
        console.log('User found in session:', session.user)
        setUser(session.user)
        // vrApi.setAccessToken(session.access_token) // Removed vrApi call
        await fetchProfile()
      } else {
        console.log('No user in session')
      }
    } catch (error) {
      console.error('Error getting initial session:', error)
      toast.error('Authentication error occurred')
    } finally {
      console.log('Setting loading to false in getInitialSession')
      setLoading(false)
    }
  }

  const fetchProfile = async () => {
    if (!user) return; // Ensure user exists before fetching profile
    console.log('Fetching profile for user:', user.id)
    try {
      const data = await getProfile(user.id) // Use direct Supabase profile function
      console.log('Profile data:', data)
      setProfile(data)
    } catch (error: any) {
      console.error('Error fetching profile:', error)
      
      // If profile doesn't exist, create a default one
      // Check for specific error code if possible, otherwise rely on message
      if ((error.message?.includes('Profile not found') || error.message?.includes('PGRST')) && user) {
        try {
          const defaultProfile = {
            id: user.id, // Add user ID for upsert
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'VR User',
            level: 1,
            experiencesPlayed: 0,
            totalPlayTime: 0,
            achievements: []
          }
          
          console.log('Creating default profile:', defaultProfile)
          const updatedData = await upsertProfile(defaultProfile) // Use direct Supabase profile function
          console.log('Default profile created:', updatedData)
          setProfile(updatedData)
        } catch (createError) {
          console.error('Error creating default profile:', createError)
        }
      }
    }
  }

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      console.log('Attempting to sign in with:', email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign in error:', error)
        toast.error(`Sign in failed: ${error.message}`)
        setLoading(false)
        return false
      }

      console.log('Sign in successful:', data)
      toast.success('Successfully signed in!')
      setLoading(false)
      return true
    } catch (error) {
      console.error('Sign in error during authentication:', error)
      toast.error('Failed to sign in')
      setLoading(false)
      return false
    }
  }

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true)
      console.log('Attempting to sign up with:', email)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name, // Pass name to user metadata
          },
        },
      })

      if (error) {
        console.error('Sign up error:', error)
        toast.error(`Sign up failed: ${error.message}`)
        setLoading(false)
        return false
      }

      console.log('Sign up successful:', data)
      toast.success('Account created successfully!')
      setLoading(false)
      
      // Now sign them in (Supabase signUp often signs in automatically, but this ensures it)
      if (data.user) {
        return true; // User is already signed in
      } else {
        return await signIn(email, password) // Fallback to sign in if not automatically signed in
      }
    } catch (error: any) {
      console.error('Sign up error:', error)
      toast.error(error.message || 'Failed to create account')
      setLoading(false)
      return false
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      console.log('Attempting to sign out')
      await supabase.auth.signOut()
      console.log('Sign out successful')
      toast.success('Signed out successfully')
      setLoading(false)
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Failed to sign out')
      setLoading(false)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile()
    }
  }

  // Check for existing session on app start
  useEffect(() => {
    console.log('Getting initial session')
    getInitialSession()
  }, [])

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        
        if (session?.user) {
          setUser(session.user)
          // vrApi.setAccessToken(session.access_token) // Removed vrApi call
          await fetchProfile()
        } else {
          setUser(null)
          setProfile(null)
          // vrApi.setAccessToken(null) // Removed vrApi call
        }
        setLoading(false)
      }
    )

    return () => {
      console.log('Unsubscribing from auth state changes')
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}