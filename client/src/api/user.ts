import api from './api';

export interface UserProfile {
  _id: string;
  email: string;
  name?: string;
  isPremium: boolean;
  dailyScansUsed: number;
  maxDailyScans: number;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    reminderDays: number;
  };
}

// Description: Get user profile
// Endpoint: GET /api/user/profile
// Request: {}
// Response: { user: UserProfile }
export const getUserProfile = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          _id: '1',
          email: 'user@example.com',
          name: 'John Doe',
          isPremium: false,
          dailyScansUsed: 1,
          maxDailyScans: 1,
          preferences: {
            emailNotifications: true,
            smsNotifications: false,
            reminderDays: 3
          }
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/user/profile');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Update user preferences
// Endpoint: PUT /api/user/preferences
// Request: { emailNotifications?: boolean, smsNotifications?: boolean, reminderDays?: number }
// Response: { success: boolean, preferences: object }
export const updateUserPreferences = (preferences: {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  reminderDays?: number;
}) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        preferences
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put('/api/user/preferences', preferences);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Upgrade to premium
// Endpoint: POST /api/user/upgrade
// Request: { planType: string }
// Response: { success: boolean, checkoutUrl: string }
export const upgradeToPremium = (planType: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        checkoutUrl: 'https://checkout.stripe.com/mock-session'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/user/upgrade', { planType });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};