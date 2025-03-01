// backend/src/config/constants.js
module.exports = {
    // User roles
    ROLES: {
      SUPER_ADMIN: 'SUPER_ADMIN',
      GROUP_ADMIN: 'GROUP_ADMIN',
      FRANCHISE_ADMIN: 'FRANCHISE_ADMIN',
      CUSTOMER: 'CUSTOMER'
    },
    
    // Booking statuses
    BOOKING_STATUS: {
      PENDING: 'PENDING',
      CONFIRMED: 'CONFIRMED',
      CANCELLED: 'CANCELLED',
      COMPLETED: 'COMPLETED'
    },
    
    // Payment statuses
    PAYMENT_STATUS: {
      PENDING: 'PENDING',
      PAID: 'PAID',
      FAILED: 'FAILED',
      REFUNDED: 'REFUNDED'
    }
  };