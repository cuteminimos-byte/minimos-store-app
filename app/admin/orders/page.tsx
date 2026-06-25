import React from "react";

const whatsappUrl =
  "https://wa.me/923001803448?text=New%20Order";

export default function OrdersPage() {
  return (
    <div>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        View Orders on WhatsApp
      </a>
    </div>
  );
}