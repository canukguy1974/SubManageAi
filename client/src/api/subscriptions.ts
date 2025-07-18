import api from './api';

export interface Subscription {
  _id: string;
  name: string;
  cost: number;
  billingFrequency: 'monthly' | 'yearly' | 'weekly';
  nextPaymentDate: string;
  category: string;
  status: 'active' | 'paused' | 'cancelled' | 'due_soon' | 'overdue';
  logo?: string;
  paymentMethod?: string;
  description?: string;
  lastPaymentDate?: string;
  createdAt: string;
  cancellationUrl?: string;
  supportEmail?: string;
}

export interface SubscriptionStats {
  totalMonthlySpending: number;
  totalYearlySpending: number;
  activeSubscriptions: number;
  upcomingPayments: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    count: number;
  }>;
}

// Description: Get all user subscriptions
// Endpoint: GET /api/subscriptions
// Request: {}
// Response: { subscriptions: Subscription[] }
export const getSubscriptions = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        subscriptions: [
          {
            _id: '1',
            name: 'Netflix',
            cost: 15.99,
            billingFrequency: 'monthly',
            nextPaymentDate: '2024-01-15',
            category: 'Entertainment',
            status: 'active',
            logo: '🎬',
            paymentMethod: 'Visa ****1234',
            description: 'Premium streaming service',
            lastPaymentDate: '2023-12-15',
            createdAt: '2023-01-01',
            cancellationUrl: 'https://netflix.com/cancel',
            supportEmail: 'support@netflix.com'
          },
          {
            _id: '2',
            name: 'Spotify',
            cost: 9.99,
            billingFrequency: 'monthly',
            nextPaymentDate: '2024-01-12',
            category: 'Entertainment',
            status: 'due_soon',
            logo: '🎵',
            paymentMethod: 'Mastercard ****5678',
            description: 'Music streaming premium',
            lastPaymentDate: '2023-12-12',
            createdAt: '2023-02-01',
            cancellationUrl: 'https://spotify.com/cancel',
            supportEmail: 'support@spotify.com'
          },
          {
            _id: '3',
            name: 'Adobe Creative Cloud',
            cost: 52.99,
            billingFrequency: 'monthly',
            nextPaymentDate: '2024-01-20',
            category: 'Software',
            status: 'active',
            logo: '🎨',
            paymentMethod: 'Visa ****1234',
            description: 'Creative software suite',
            lastPaymentDate: '2023-12-20',
            createdAt: '2023-03-01',
            cancellationUrl: 'https://adobe.com/cancel',
            supportEmail: 'support@adobe.com'
          },
          {
            _id: '4',
            name: 'GitHub Pro',
            cost: 4.00,
            billingFrequency: 'monthly',
            nextPaymentDate: '2024-01-25',
            category: 'Software',
            status: 'active',
            logo: '💻',
            paymentMethod: 'Visa ****1234',
            description: 'Code repository hosting',
            lastPaymentDate: '2023-12-25',
            createdAt: '2023-04-01',
            cancellationUrl: 'https://github.com/settings/billing',
            supportEmail: 'support@github.com'
          },
          {
            _id: '5',
            name: 'Gym Membership',
            cost: 29.99,
            billingFrequency: 'monthly',
            nextPaymentDate: '2024-01-10',
            category: 'Health & Fitness',
            status: 'overdue',
            logo: '💪',
            paymentMethod: 'Mastercard ****5678',
            description: 'Local gym membership',
            lastPaymentDate: '2023-12-10',
            createdAt: '2023-05-01',
            supportEmail: 'info@localgym.com'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/subscriptions');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get subscription statistics
// Endpoint: GET /api/subscriptions/stats
// Request: {}
// Response: { stats: SubscriptionStats }
export const getSubscriptionStats = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          totalMonthlySpending: 112.96,
          totalYearlySpending: 1355.52,
          activeSubscriptions: 4,
          upcomingPayments: 2,
          categoryBreakdown: [
            { category: 'Entertainment', amount: 25.98, count: 2 },
            { category: 'Software', amount: 56.99, count: 2 },
            { category: 'Health & Fitness', amount: 29.99, count: 1 }
          ]
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/subscriptions/stats');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Add a new subscription
// Endpoint: POST /api/subscriptions
// Request: { name: string, cost: number, billingFrequency: string, nextPaymentDate: string, category: string, description?: string }
// Response: { success: boolean, subscription: Subscription }
export const addSubscription = (data: {
  name: string;
  cost: number;
  billingFrequency: string;
  nextPaymentDate: string;
  category: string;
  description?: string;
}) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        subscription: {
          _id: Date.now().toString(),
          ...data,
          status: 'active',
          createdAt: new Date().toISOString()
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/subscriptions', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Update a subscription
// Endpoint: PUT /api/subscriptions/:id
// Request: { name?: string, cost?: number, billingFrequency?: string, nextPaymentDate?: string, category?: string, description?: string, status?: string }
// Response: { success: boolean, subscription: Subscription }
export const updateSubscription = (id: string, data: Partial<Subscription>) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        subscription: { _id: id, ...data }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put(`/api/subscriptions/${id}`, data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Delete a subscription
// Endpoint: DELETE /api/subscriptions/:id
// Request: {}
// Response: { success: boolean, message: string }
export const deleteSubscription = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Subscription deleted successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.delete(`/api/subscriptions/${id}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Scan Gmail for subscriptions
// Endpoint: POST /api/subscriptions/scan
// Request: {}
// Response: { success: boolean, foundSubscriptions: Array<{ name: string, cost: number, confidence: number }> }
export const scanGmailForSubscriptions = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        foundSubscriptions: [
          { name: 'Amazon Prime', cost: 14.99, confidence: 0.95 },
          { name: 'Dropbox', cost: 9.99, confidence: 0.87 },
          { name: 'Microsoft 365', cost: 6.99, confidence: 0.92 }
        ]
      });
    }, 2000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/subscriptions/scan');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: AI-powered subscription cancellation
// Endpoint: POST /api/subscriptions/:id/cancel-ai
// Request: {}
// Response: { success: boolean, message: string, cancellationSteps?: string[], estimatedTime?: string }
export const aiCancelSubscription = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'AI cancellation process initiated',
        cancellationSteps: [
          'Analyzing subscription terms and conditions',
          'Identifying optimal cancellation timing',
          'Preparing cancellation request',
          'Submitting cancellation request',
          'Monitoring confirmation'
        ],
        estimatedTime: '2-5 minutes'
      });
    }, 1500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/subscriptions/${id}/cancel-ai`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};