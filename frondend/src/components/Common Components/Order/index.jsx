import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Order.css";
import Invoice from "../../../Invoice"

export default function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const invoiceRef = useRef(null);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Function to generate and download PDF
  const generatePDF = async () => {
    if (!invoiceRef.current) {
      console.error("Invoice element not found!");
      return;
    }

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      <section className="order-status" id="order-status">
        <h1 className="heading">
          Order <span>Status</span>
        </h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Books</th>
                  <th>Total Amount</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      <ul>
                        {order.products.map((product) => (
                          <li key={product.productId}>
                            {product.name} (x{product.quantity})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>₹{order.amount}</td>
                    <td>{order.transactionId}</td>
                    <td className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </td>
                    <td>
                      <button style={{cursor: "pointer", padding: "5px 20px"}}
                        onClick={() => {
                          setSelectedOrder(order);
                          setTimeout(generatePDF, 500);
                        }}
                      >
                        Download Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Hidden Invoice Component */}
      {selectedOrder && (
        <Invoice ref={invoiceRef} selectedOrder={selectedOrder} />
      )}

    </div>
  );
}
