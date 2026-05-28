# Spice Garden - Setup Instructions

## Overview
Spice Garden is a restaurant website with online ordering, billing with GST, payment integration, and order management.

## Features
- 🛒 Shopping Cart System
- 💳 Razorpay Payment Integration (UPI, Card, Wallets)
- 💰 Cash on Delivery Option
- 📄 GST Billing (CGST 2.5% + SGST 2.5% = 5%)
- 📦 Order Management System
- 👨‍💼 Admin Panel
- 📧 Email Notifications (optional)

## Setup Instructions

### 1. Razorpay Integration

#### Get Razorpay API Keys
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
2. Navigate to Settings → API Keys
3. Generate Test Mode keys (for development)
4. Generate Live Mode keys (for production)

#### Configure Razorpay Key in Checkout
Open `/src/app/pages/Checkout.tsx` and replace the dummy key:

```typescript
const options = {
  key: "rzp_test_YOUR_KEY_HERE", // Replace with your actual Razorpay key
  // ... rest of options
};
```

**Test Mode Key Format:** `rzp_test_xxxxxxxxxxxxx`
**Live Mode Key Format:** `rzp_live_xxxxxxxxxxxxx`

#### Test Razorpay Integration
Use these test credentials in test mode:
- **UPI:** success@razorpay
- **Card Number:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date

### 2. GST Configuration

The GST number is configured in:
- `/src/app/pages/Cart.tsx`
- `/src/app/pages/Checkout.tsx`

```typescript
const GST_NUMBER = "07AAACS2781N1ZT"; // Replace with your actual GST number
```

### 3. Email Notifications (Optional)

To enable email notifications when orders are placed:

1. Set up an email service (SendGrid, Mailgun, or similar)
2. Get your API key
3. Use the `create_supabase_secret` tool to add it:
   - Environment variable name: `EMAIL_API_KEY`
4. Update the `sendOrderNotification` function in `/supabase/functions/server/index.tsx` with your email service API

### 4. Admin Panel Access

Access the admin panel at: `/admin`

Features:
- View all orders
- Filter by status (pending, preparing, completed, cancelled)
- View order details
- Update order status
- Real-time order monitoring

### 5. Payment Methods

**Razorpay (Online)**
- UPI (Google Pay, PhonePe, Paytm, etc.)
- Credit/Debit Cards
- Net Banking
- Wallets

**Cash on Delivery**
- Pay when order arrives
- No online payment required

## API Endpoints

### Orders API
- `POST /make-server-88060210/orders` - Create new order
- `GET /make-server-88060210/orders` - Get all orders
- `GET /make-server-88060210/orders/:orderId` - Get single order
- `PATCH /make-server-88060210/orders/:orderId` - Update order status

## Testing

### Test the Complete Flow

1. **Browse Menu** → `/menu`
2. **Add Items to Cart** → Click "Order" button
3. **View Cart** → Click cart icon in header
4. **Proceed to Checkout** → `/checkout`
5. **Fill Details** and select payment method
6. **Complete Payment**:
   - For Razorpay: Use test credentials
   - For COD: Order is placed immediately
7. **View in Admin Panel** → `/admin`

### Test Order Statuses

1. Go to `/admin`
2. Click on any order
3. Update status using buttons:
   - Preparing
   - Completed
   - Cancelled

## Environment Variables

Required environment variables (automatically configured in Figma Make):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `EMAIL_API_KEY` (optional) - Email service API key

## Bill Format

All bills include:
- Itemized list with quantities and prices
- Subtotal
- CGST (2.5%)
- SGST (2.5%)
- Total GST (5%)
- Total Amount
- GST Number

## Important Notes

⚠️ **Before Going Live:**
1. Replace Razorpay test key with live key
2. Update GST number with your actual GSTIN
3. Configure email service for notifications
4. Test all payment methods thoroughly
5. Set up proper authentication for admin panel

## Support

For issues or questions:
- Razorpay: [docs.razorpay.com](https://docs.razorpay.com)
- GST: [gst.gov.in](https://www.gst.gov.in)

## Restaurant Details

Current configuration:
- **Name:** Spice Garden
- **Location:** 45 MG Road, Connaught Place, New Delhi, Delhi 110001
- **Phone:** +91 11 2345 6789
- **Email:** info@spicegarden.com
- **GST No:** 07AAACS2781N1ZT

Update these in `/src/app/layout/Layout.tsx`
