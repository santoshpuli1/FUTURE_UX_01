import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RefreshCw, Package, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";

type Order = {
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  billing: {
    subtotal: number;
    cgst: number;
    sgst: number;
    totalGst: number;
    total: number;
    gstNumber: string;
  };
  payment: {
    method: string;
    status: string;
    transactionId: string | null;
  };
  status: string;
  timestamp: string;
  updatedAt?: string;
};

export function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'}/functions/v1/make-server-88060210/orders`, {
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'}/functions/v1/make-server-88060210/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
        if (selectedOrder?.orderId === orderId) {
          const updatedOrder = { ...selectedOrder, status: newStatus };
          setSelectedOrder(updatedOrder);
        }
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "preparing":
        return <Package className="w-4 h-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "preparing":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const filteredOrders = filterStatus === "all"
    ? orders
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="flex flex-col w-full bg-[#0F0F0F] min-h-screen pt-24 text-white pb-24">
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-['Playfair_Display',serif] text-white mb-2">Order Management</h1>
              <p className="text-[#BDBDBD]">{orders.length} total orders</p>
            </div>
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E56000] text-white px-6 py-3 text-sm font-semibold transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 border-b border-[#333] mb-6">
            {["all", "pending", "preparing", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors border-b-2 ${
                  filterStatus === status
                    ? "border-[#FF6B00] text-[#FF6B00]"
                    : "border-transparent text-[#BDBDBD] hover:text-white"
                }`}
              >
                {status}
                {status !== "all" && (
                  <span className="ml-2 text-xs">
                    ({orders.filter(o => o.status === status).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-[#FF6B00] animate-spin mx-auto mb-4" />
            <p className="text-[#BDBDBD]">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-[#151515] border border-[#333]">
            <Package className="w-16 h-16 text-[#333] mx-auto mb-4" />
            <p className="text-[#BDBDBD]">No orders found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-[#151515] border p-4 cursor-pointer hover:border-[#FF6B00] transition-colors ${
                    selectedOrder?.orderId === order.orderId ? "border-[#FF6B00]" : "border-[#333]"
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(order.status)}
                        <span className={`text-sm font-semibold uppercase ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#BDBDBD]">
                        {new Date(order.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <span className="text-[#FF6B00] font-semibold">
                      ₹{order.billing.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-white font-medium">{order.customer.name}</p>
                    <p className="text-xs text-[#BDBDBD]">{order.customer.phone}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#BDBDBD]">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </span>
                    <span className="text-[#FF6B00] text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      View Details
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Details */}
            <div className="sticky top-32">
              {selectedOrder ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#151515] border border-[#333] p-6"
                >
                  <div className="flex justify-between items-start mb-6 border-b border-[#333] pb-4">
                    <div>
                      <h2 className="text-2xl font-['Playfair_Display',serif] text-white mb-1">
                        {selectedOrder.orderId}
                      </h2>
                      <p className="text-xs text-[#BDBDBD]">
                        {new Date(selectedOrder.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedOrder.status)}
                      <span className={`text-sm font-semibold uppercase ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Customer</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-[#BDBDBD]"><span className="text-white">Name:</span> {selectedOrder.customer.name}</p>
                      <p className="text-[#BDBDBD]"><span className="text-white">Email:</span> {selectedOrder.customer.email}</p>
                      <p className="text-[#BDBDBD]"><span className="text-white">Phone:</span> {selectedOrder.customer.phone}</p>
                      <p className="text-[#BDBDBD]"><span className="text-white">Address:</span> {selectedOrder.customer.address}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm bg-[#0F0F0F] p-3">
                          <div>
                            <p className="text-white">{item.name}</p>
                            <p className="text-xs text-[#BDBDBD]">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                          </div>
                          <p className="text-white font-semibold">
                            ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Billing */}
                  <div className="mb-6 border-t border-[#333] pt-4">
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Billing</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#BDBDBD]">Subtotal</span>
                        <span className="text-white">₹{selectedOrder.billing.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#BDBDBD]">CGST (2.5%)</span>
                        <span className="text-white">₹{selectedOrder.billing.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#BDBDBD]">SGST (2.5%)</span>
                        <span className="text-white">₹{selectedOrder.billing.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#333]">
                        <span className="text-white font-semibold">Total</span>
                        <span className="text-[#FF6B00] font-bold">
                          ₹{selectedOrder.billing.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <p className="text-xs text-[#BDBDBD] pt-2">GST No: {selectedOrder.billing.gstNumber}</p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="mb-6 border-t border-[#333] pt-4">
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Payment</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-[#BDBDBD]">
                        <span className="text-white">Method:</span> {selectedOrder.payment.method === "cod" ? "Cash on Delivery" : "Razorpay"}
                      </p>
                      <p className="text-[#BDBDBD]">
                        <span className="text-white">Status:</span> {selectedOrder.payment.status}
                      </p>
                      {selectedOrder.payment.transactionId && (
                        <p className="text-[#BDBDBD]">
                          <span className="text-white">Transaction ID:</span> {selectedOrder.payment.transactionId}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="border-t border-[#333] pt-4">
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Update Status</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.orderId, "preparing")}
                        disabled={selectedOrder.status === "preparing"}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:opacity-50 text-white px-4 py-2 text-sm font-semibold transition-colors"
                      >
                        Preparing
                      </button>
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.orderId, "completed")}
                        disabled={selectedOrder.status === "completed"}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:opacity-50 text-white px-4 py-2 text-sm font-semibold transition-colors"
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.orderId, "cancelled")}
                        disabled={selectedOrder.status === "cancelled"}
                        className="col-span-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:opacity-50 text-white px-4 py-2 text-sm font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-[#151515] border border-[#333] p-12 text-center">
                  <Package className="w-16 h-16 text-[#333] mx-auto mb-4" />
                  <p className="text-[#BDBDBD]">Select an order to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
