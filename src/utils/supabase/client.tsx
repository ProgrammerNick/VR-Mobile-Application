import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

const supabaseUrl = `https://${projectId}.supabase.co`

export const supabase = createClient(supabaseUrl, publicAnonKey)

// API client for our custom server endpoints
class VRApiClient {
  private baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-342abf80`
  private accessToken: string | null = null

  setAccessToken(token: string | null) {
    this.accessToken = token
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    } else {
      headers['Authorization'] = `Bearer ${publicAnonKey}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        // If JSON parsing fails, likely received HTML error page
        const textData = await response.text()
        console.error(`Non-JSON response for ${endpoint}:`, textData)
        throw new Error(`Server returned non-JSON response: ${response.status}`)
      }

      if (!response.ok) {
        console.error(`API Error (${response.status}):`, data)
        throw new Error(data.error || `API request failed with status ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`Network error for ${endpoint}:`, error)
      throw error
    }
  }

  // Auth methods
  async signup(email: string, password: string, name: string) {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  }

  // Profile methods
  async getProfile() {
    return this.request('/profile')
  }

  async updateProfile(updates: any) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  // Content methods
  async getContent() {
    return this.request('/content')
  }

  async purchaseContent(contentId: string, price: number) {
    return this.request('/content/purchase', {
      method: 'POST',
      body: JSON.stringify({ contentId, price }),
    })
  }

  async getPurchases() {
    return this.request('/purchases')
  }

  // Friends methods
  async addFriend(friendEmail: string) {
    return this.request('/friends/add', {
      method: 'POST',
      body: JSON.stringify({ friendEmail }),
    })
  }

  async getFriends() {
    return this.request('/friends')
  }

  // Activity methods
  async updateActivity(activity: string, contentId?: string) {
    return this.request('/activity', {
      method: 'POST',
      body: JSON.stringify({ activity, contentId }),
    })
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }
}

export const vrApi = new VRApiClient()