"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { Order } from "@/types/order";

// Extract ISO date safely
function extractDate(input: any): string | null {
  if (!input) return null;
  if (typeof input === "string") return input;
  if (input.$date && typeof input.$date === "string") return input.$date;
  return null;
}

async function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

// Load logo
async function loadLogo() {
  try {
    const res = await fetch("/logo.png");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await blobToBase64(blob);
  } catch {
    return null;
  }
}

export async function generateOrderPDF(order: Order) {
  try {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    let y = 30;

    // HEADER BAR
    pdf.setFillColor(15, 76, 129);
    pdf.rect(0, 0, pageWidth, 70, "F");

    const logo = await loadLogo();
    if (logo) {
      pdf.addImage(logo, "PNG", margin, 18, 110, 36);
    } else {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text("Shidah Online Store", margin, 42);
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255);
    pdf.text("Shidah.in", pageWidth - margin, 26, { align: "right" });

    pdf.setFontSize(10);
    pdf.text("Kozhikode, Kerala - 673001", pageWidth - margin, 44, {
      align: "right",
    });
    pdf.text("Phone: +91 8592980406", pageWidth - margin, 58, {
      align: "right",
    });
    pdf.text("Email: support@shidah.com", pageWidth - margin, 72, {
      align: "right",
    });

    y = 110;

    // INVOICE TITLE + META
    const dISO = extractDate(order.createdAt);
    const dateStr = dISO
      ? new Date(dISO).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Invalid Date";

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(0, 0, 0);
    pdf.text("INVOICE", pageWidth - margin, y, { align: "right" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text(`Invoice No: INV-${order._id}`, margin, y);
    pdf.text(`Date: ${dateStr}`, margin, y + 15);
    pdf.text(`Order ID: ${order.razorpayOrderId}`, margin, y + 30);

    y += 60;

    // BILLING BOX
    pdf.setFillColor(245, 245, 245);
    pdf.rect(margin, y, pageWidth - margin * 2, 90, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Billing Details", margin + 10, y + 20);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    const billingY = y + 36;
    const billing = [
      `${order.userInfo.FirstName} ${order.userInfo.LastName}`,
      order.userInfo.EmailAddress,
      order.userInfo.PhoneNumber,
      order.shippingAddress.StreetAddress,
      `${order.shippingAddress.City}, ${order.shippingAddress.State} - ${order.shippingAddress.PinCode}`,
    ];

    let line = billingY;
    billing.forEach((t) => {
      pdf.text(t, margin + 10, line);
      line += 14;
    });

    y += 120;

    // ORDER ITEMS TABLE
    autoTable(pdf, {
      startY: y,
      head: [["Item", "Qty", "Unit", "Total"]],
      theme: "grid",
      headStyles: { fillColor: [15, 76, 129], textColor: [255, 255, 255] },
      styles: { font: "helvetica", fontSize: 10, cellPadding: 6 },
      columnStyles: {
          1: { halign: "center", cellWidth: 40 }, 
        // 0: { cellWidth: 240 },
        // 1: { cellWidth: 40, halign: "center" },
        // 2: { cellWidth: 90, halign: "right" },
        // 3: { cellWidth: 90, halign: "right" },
      },
      body: order.orderItems.map((it) => [
        it.name,
        it.quantity,
        it.price.toLocaleString("en-IN"),
        (it.price * it.quantity).toLocaleString("en-IN"),
      ]),
    });

    const tableEnd = (pdf as any).lastAutoTable.finalY + 30;

    // PAYMENT SUMMARY (LEFT) + QR CODE (RIGHT)
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Payment Summary", margin, tableEnd);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    const summary = [
      ["Subtotal", order.subtotal.toLocaleString("en-IN")],
      ["Shipping", String(order.shippingCharge)],
      ["Tax", String(order.tax)],
      ["Grand Total", order.total.toLocaleString("en-IN")],
    ];

    let sY = tableEnd + 20;
    summary.forEach(([k, v]) => {
      pdf.text(k, margin, sY);
      pdf.text(v, pageWidth - margin, sY, { align: "right" });
      sY += 18;
    });

    // QR CODE RIGHT SIDE
    const qr = await QRCode.toDataURL(
      `Order: ${order.razorpayOrderId} | Amount: ${order.total}`
    );

    const qrY = tableEnd + 80; // 30px space below table
    const qrX = pageWidth - margin - 120;

    pdf.addImage(qr, "PNG", qrX, qrY, 100, 100);
    pdf.setFontSize(9);
    pdf.text("Scan to view order", pageWidth - margin - 70, tableEnd + 200, {
      align: "center",
    });

    // WATERMARK behind content
    // pdf.setFontSize(70);
    // pdf.setTextColor(240, 240, 240);
    // pdf.text("shidah.in", pageWidth / 2, pageHeight / 2, {
    //   align: "center",
    //   angle: 25,
    // });

    // FOOTER
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    pdf.text(
      "Thank you for shopping with us!",
      pageWidth / 2,
      pageHeight - 30,
      { align: "center" }
    );

    pdf.save(`Invoice-${order.razorpayOrderId}.pdf`);
  } catch (err) {
    console.error("PDF ERROR:", err);
  }
}
