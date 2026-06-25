export default function OrdersPage() {
  const whatsappUrl =
    "https://wa.me/923001803448?text=New%20Order";

  return (
    <div>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        View Orders on WhatsApp
      </a>
    </div>
  );
}