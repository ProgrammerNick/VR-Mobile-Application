import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, vrApi } from '../utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { toast } from 'sonner@2.0.3'

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
    getInitialSession()
  }, [])

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event)
        
        if (session?.user) {
          setUser(session.user)
          vrApi.setAccessToken(session.access_token)
          await fetchProfile()
        } else {
          setUser(null)
          setProfile(null)
          vrApi.setAccessToken(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const getInitialSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(session.user)
        vrApi.setAccessToken(session.access_token)
        await fetchProfile()
      }
    } catch (error) {
      console.error('Error getting initial session:', error)
      toast.error('Authentication error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchProfile = async () => {
    try {
      const data = await vrApi.getProfile()
      setProfile(data.profile)
    } catch (error: any) {
      console.error('Error fetching profile:', error)
      
      // If profile doesn't exist, create a default one
      if (error.message?.includes('Profile not found') && user) {
        try {
          const defaultProfile = {
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'VR User',
            level: 1,
            experiencesPlayed: 0,
            totalPlayTime: 0,
            achievements: []
          }
          
          const updatedData = await vrApi.updateProfile(defaultProfile)
          setProfile(updatedData.profile)
        } catch (createError) {
          console.error('Error creating default profile:', createError)
        }
      }
    }
  }

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Sign in error:', error)
        toast.error(`Sign in failed: ${error.message}`)
        return false
      }

      toast.success('Successfully signed in!')
      return true
    } catch (error) {
      console.error('Sign in error during authentication:', error)
      toast.error('Failed to sign in')
      return false
    }
  }

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const data = await vrApi.signup(email, password, name)
      toast.success('Account created successfully!')
      
      // Now sign them in
      return await signIn(email, password)
    } catch (error: any) {
      console.error('Sign up error:', error)
      toast.error(error.message || 'Failed to create account')
      return false
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Failed to sign out')
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile()
    }
  }

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