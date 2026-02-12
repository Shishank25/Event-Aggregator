export const endpoints = {
  // Public
  events: {
    list: "/events",
  },

  // Email subscriptions
  subscription: {
    create: "/subscriptions",
  },

  // Auth
  auth: {
    google: "/auth/google",

    // OTP
    sendOtp: "/auth/send-otp",
    verifyOtp: "/auth/verify-otp",
  },

  // Admin dashboard (protected)
  dashboard: {
    events: {
      list: "/dashboard/events",
      import: (id) => `/dashboard/events/${id}/import`,
    },
  },
};
