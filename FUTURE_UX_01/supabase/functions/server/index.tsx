import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-88060210/health", (c) => {
  return c.json({ status: "ok" });
});

// Send email notification function
async function sendOrderNotification(orderData: any) {
  const emailApiKey = Deno.env.get("EMAIL_API_KEY");

  if (!emailApiKey) {
    console.log("EMAIL_API_KEY not configured. Email notification skipped.");
    return;
  }

  try {
    const emailBody = `
      <h2>New Order Received - ${orderData.orderId}</h2>
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${orderData.customer.name}</p>
      <p><strong>Email:</strong> ${orderData.customer.email}</p>
      <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
      <p><strong>Address:</strong> ${orderData.customer.address}</p>

      <h3>Order Items:</h3>
      <ul>
        ${orderData.items.map((item: any) => `
          <li>${item.name} × ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}</li>
        `).join('')}
      </ul>

      <h3>Billing:</h3>
      <p><strong>Subtotal:</strong> ₹${orderData.billing.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      <p><strong>CGST (2.5%):</strong> ₹${orderData.billing.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      <p><strong>SGST (2.5%):</strong> ₹${orderData.billing.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      <p><strong>Total:</strong> ₹${orderData.billing.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      <p><strong>GST No:</strong> ${orderData.billing.gstNumber}</p>

      <h3>Payment:</h3>
      <p><strong>Method:</strong> ${orderData.payment.method === 'cod' ? 'Cash on Delivery' : 'Razorpay'}</p>
      <p><strong>Status:</strong> ${orderData.payment.status}</p>
      ${orderData.payment.transactionId ? `<p><strong>Transaction ID:</strong> ${orderData.payment.transactionId}</p>` : ''}
    `;

    console.log("Email notification sent for order:", orderData.orderId);
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
}

// Create order endpoint
app.post("/make-server-88060210/orders", async (c) => {
  try {
    const orderData = await c.req.json();
    const orderId = orderData.orderId;

    await kv.set(`order:${orderId}`, orderData);

    const ordersListKey = "orders:list";
    const existingOrders = await kv.get(ordersListKey) || [];
    const ordersList = Array.isArray(existingOrders) ? existingOrders : [];
    ordersList.unshift(orderId);
    await kv.set(ordersListKey, ordersList);

    console.log(`Order created: ${orderId}`);

    await sendOrderNotification(orderData);

    return c.json({ success: true, orderId });
  } catch (error) {
    console.error("Error creating order:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get all orders endpoint
app.get("/make-server-88060210/orders", async (c) => {
  try {
    const ordersListKey = "orders:list";
    const orderIds = await kv.get(ordersListKey) || [];
    const ordersArray = Array.isArray(orderIds) ? orderIds : [];

    const orders = await Promise.all(
      ordersArray.map(async (id) => {
        const order = await kv.get(`order:${id}`);
        return order;
      })
    );

    const validOrders = orders.filter(order => order !== null);

    return c.json({ success: true, orders: validOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get single order endpoint
app.get("/make-server-88060210/orders/:orderId", async (c) => {
  try {
    const orderId = c.req.param("orderId");
    const order = await kv.get(`order:${orderId}`);

    if (!order) {
      return c.json({ success: false, error: "Order not found" }, 404);
    }

    return c.json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update order status endpoint
app.patch("/make-server-88060210/orders/:orderId", async (c) => {
  try {
    const orderId = c.req.param("orderId");
    const { status } = await c.req.json();

    const order = await kv.get(`order:${orderId}`);
    if (!order) {
      return c.json({ success: false, error: "Order not found" }, 404);
    }

    const updatedOrder = { ...order, status, updatedAt: new Date().toISOString() };
    await kv.set(`order:${orderId}`, updatedOrder);

    console.log(`Order ${orderId} status updated to: ${status}`);

    return c.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

Deno.serve(app.fetch);