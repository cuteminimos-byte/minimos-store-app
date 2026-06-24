"use client";

import React, { useState } from 'react';

export default function FAQsPage() {
  // State to track which accordion is open (null means all closed)
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    // Main Container
    <div className="w-full md:w-[92%] max-w-7xl mx-auto px-4 py-8 md:py-12 select-none">
      
      {/* Main Page Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
        FAQs
      </h1>

      {/* Accordions Stack */}
      <div className="space-y-4">

        {/* 1. Payments Section */}
        <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
          <button
            onClick={() => toggleSection('payments')}
            className="w-full flex items-center justify-between p-6 md:p-7 text-left font-medium text-gray-800 hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
          >
            <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">Payments</span>
            <span className="text-2xl font-light text-gray-600 w-6 h-6 flex items-center justify-center transition-transform duration-300">
              {openSection === 'payments' ? '−' : '+'}
            </span>
          </button>
          <div className={`transition-all duration-300 ease-in-out ${openSection === 'payments' ? 'max-h-[1500px] opacity-100 border-t border-gray-200/60' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="p-6 md:p-12 text-gray-800 leading-relaxed space-y-6 text-[14px] md:text-[15px]">
              
              {/* Question 1 */}
              <div className="space-y-3">
                <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                  1. Which Payment Method Does SWOC CLOTHING Support?
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                  <li>You can purchase on our website using a Cash on Delivery (COD) method (available nationwide).</li>
                  <li>For advance payment, please contact us using the website's LIVE CHAT option or WhatsApp us on <span className="font-semibold text-gray-900">+92 300 100 3187</span>.</li>
                  <li>Online Payments – Debit Card / Credit Card (Local & International Orders)</li>
                </ul>
              </div>

              {/* Question 2 */}
              <div className="space-y-3 pt-2">
                <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">
                  2. Is Cash on Delivery (COD) available internationally?
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                  <li>Unfortunately, COD is only available in Pakistan. For International orders, we require advance payment.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* 2. Shipping & Delivery Section */}
        <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between p-6 md:p-7 text-left font-medium text-gray-800 hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
          >
            <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">Shipping & Delivery</span>
            <span className="text-2xl font-light text-gray-600 w-6 h-6 flex items-center justify-center transition-transform duration-300">
              {openSection === 'shipping' ? '−' : '+'}
            </span>
          </button>
          <div className={`transition-all duration-300 ease-in-out ${openSection === 'shipping' ? 'max-h-[2000px] opacity-100 border-t border-gray-200/60' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="p-6 md:p-12 text-gray-800 leading-relaxed space-y-6 text-[14px] md:text-[15px] text-justify">
              
              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">1. What Courier Do You Use?</h2>
                <p>SWOC CLOTHING partners with major shipping companies such as TCS, Leopards, M&P & CallCourier.</p>
                <p>We will only know what shipping courier has your package when the package actually shipped out, for you to be able to know what shipping courier has your package, you will have to track your package first; Unfortunately, you don’t have the option to Change the courier, we select the best courier available in your location.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">2. What is the order delivery time?</h2>
                <p><span className="font-semibold text-gray-900">Pre Booked Orders:</span> Pre booking orders usually take 4-6 weeks, depending on customization and how big your order is. Time frame for your pre-booked order will be shared through Email, WhatsApp OR text message/SMS.</p>
                <p><span className="font-semibold text-gray-900">Stock available orders:</span> Normally for stock available goods, it will take 3-4 days (besides 1-2 days processing time) for the courier company to deliver goods at your doorstep.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">3. Why is my Order taking too long to ship?</h2>
                <p>Please note orders will go through TWO phases before being delivered:</p>
                <p><span className="font-semibold text-gray-900">Order processing time:</span> Normally it will take us 1-2 days to prepare your order.</p>
                <p><span className="font-semibold text-gray-900">Shipping time:</span> It can vary depending on your location and shipping methods. Normally for stock available goods, it will take 3-4 days (besides 1-2 days processing time) for the courier company to deliver goods at your doorstep.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">4. How Do I Know If My Order Has Been Shipped?</h2>
                <p>Once you have successfully placed an order, you will be receiving a confirmation sms (Mobile/WhatsApp) & email listing the items you ordered and tracking i.d along with your shipping address. Make sure to provide your correct and most updated cell number & email address upon placing the order to ensure you will be receiving the confirmation sms, email and updates about your order.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">5. What are the delivery charges?</h2>
                <p>We offer flexible shipping rates across Pakistan and worldwide:</p>
                <p><span className="font-semibold text-gray-900">Local Shipping:</span> Standard rates apply across Pakistan.</p>
                <p><span className="font-semibold text-gray-900">International Shipping:</span> Fees are calculated at checkout based on your destination.</p>
                <p><span className="font-semibold text-gray-900">Customs & Duties:</span> International orders may be subject to local customs duties and taxes. These fees are determined by your country's government and are the sole responsibility of the customer.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">6. Can I Change my Shipping Address?</h2>
                <p>To ensure you will receive the package in time, please make sure the shipping address is accurate when placing an order.</p>
                <p>For changing shipping address, please contact our Customer Service. Please note that: We can only help you modify your shipping address BEFORE PACKING.</p>
                <p>If the order has already been shipped to destination and you need to make changes on the address, we highly recommend to track your package, find out the shipping courier and reach out to them for arrangements, so they can reroute the package to the address where you want your package to be delivered.</p>
                <p>If you want us to change the address after the order has been shipped, it will approximately take 15 to 20 days to reroute the parcel to your changed address and an extra shipping cost, which you have to pay.</p>
                <p className="font-semibold text-gray-900">Our WhatsApp Support: +92 300 100 3187</p>
              </div>

            </div>
          </div>
        </div>

        {/* 3. Order Issues Section */}
        <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
          <button
            onClick={() => toggleSection('orderIssues')}
            className="w-full flex items-center justify-between p-6 md:p-7 text-left font-medium text-gray-800 hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
          >
            <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">Order Issues</span>
            <span className="text-2xl font-light text-gray-600 w-6 h-6 flex items-center justify-center transition-transform duration-300">
              {openSection === 'orderIssues' ? '−' : '+'}
            </span>
          </button>
          <div className={`transition-all duration-300 ease-in-out ${openSection === 'orderIssues' ? 'max-h-[2000px] opacity-100 border-t border-gray-200/60' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="p-6 md:p-12 text-gray-800 leading-relaxed space-y-6 text-[14px] md:text-[15px] text-justify">
              
              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">1. How will I know that you received my order?</h2>
                <p>The Sales Order Summary emailed to you will act as confirmation that your order has been logged in our record. If you do not get this Email, please contact Customer Services:</p>
                <p><span className="font-semibold">Email:</span> <a href="mailto:customercare@swocclothing.com" className="text-blue-600 hover:underline">customercare@swocclothing.com</a></p>
                <p><span className="font-semibold">WhatsApp Live-chat:</span> +92-300-180-3448, +92-300-100-3187</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">2. Where Is My Order Confirmation?</h2>
                <p>The most common issues are an incorrect Email address or the email has gone to your “junk/spam” mail. Please check your “junk mail/spam” folder.</p>
                <p>The Email address may have been incorrectly inputted when the order was placed, Please contact customer service to change your email address.</p>
                <p>For Paid Order, the payment may have failed to be received by SWOC CLOTHING. For Cash on Delivery (COD) order, the shipping information verification may have ended in failure. Please contact our Customer Service.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">3. Can I Amend/Add/Remove An Item From My Order?</h2>
                <p>Please make sure that all details of your order should be final before you submit your order.</p>
                <p>Once your order has been confirmed via Email / WhatsApp, you can easily add or remove an item to your order with the help of our Friendly Customer Service.</p>
                <p>If you find that you placed the wrong color or size, you can reach out to us through our Contact Us page for help. Our friendly Customer Service Representatives will respond to your request within 24-48 hours.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">4. Can I Cancel my Order?</h2>
                <p>You can contact our Customer Service to request for cancellation and they will assist you further.</p>
                <p>Please note that requesting cancellation for your order is limited to the following guidelines would still be possible if: An order is still in processing status and is in the pre-packing stage. If your order has been processed and awaiting dispatch or has already been dispatched and shipped we would not be able to cancel it. Therefore, please wait for your package to arrive and you may either keep it or contact us to return for a refund.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">5. What if an incorrect/damaged item OR an incomplete order is delivered to me?</h2>
                <p>Full care is taken to ensure that complete order reaches the correct recipient. However, a mishap may occur, you can get in touch with our friendly Customer Service and we will rectify the issue.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">6. How long does it take to make handmade items?</h2>
                <p>If you PRE-ORDERED a handmade item, please note that it will take 4-6 weeks to make your order ready because most of our handmade items are prepared on order.</p>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">7. How do I know if an item is in stock?</h2>
                <p>Our stock is constantly updated. If, for an item, your desired color/design is not available in the drop-down menu of a product, it means this color/design is out of stock. For queries and special requests concerning sizing, design and/or availability, please contact Customer Services at:</p>
                <p><span className="font-semibold">Email:</span> <a href="mailto:customercare@swocclothing.com" className="text-blue-600 hover:underline">customercare@swocclothing.com</a></p>
                <p><span className="font-semibold">WhatsApp Live-chat:</span> +92-300-180-3448, +92-300-100-3187</p>
              </div>

            </div>
          </div>
        </div>

        {/* 4. Customization Charges Section */}
        <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
          <button
            onClick={() => toggleSection('customization')}
            className="w-full flex items-center justify-between p-6 md:p-7 text-left font-medium text-gray-800 hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
          >
            <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">Customization Charges</span>
            <span className="text-2xl font-light text-gray-600 w-6 h-6 flex items-center justify-center transition-transform duration-300">
              {openSection === 'customization' ? '−' : '+'}
            </span>
          </button>
          <div className={`transition-all duration-300 ease-in-out ${openSection === 'customization' ? 'max-h-[1500px] opacity-100 border-t border-gray-200/60' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="p-6 md:p-12 text-gray-800 leading-relaxed space-y-6 text-[14px] md:text-[15px]">
              
              <div className="space-y-1">
                <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">Advance Payment:</h2>
                <p>75% of the total amount is required.</p>
              </div>

              <div className="space-y-3">
                <h2 className="text-[15px] md:text-[16px] font-bold text-gray-900">Additional Customization charges are as follows:</h2>
                
                {/* Image Nested Bullet List layout */}
                <ul className="list-disc pl-6 space-y-2">
                  <li>Base color change: <span className="font-medium text-gray-900">10%</span></li>
                  <li>Work color customization: <span className="font-medium text-gray-900">25%</span></li>
                  <li>Sleeves customization in wool articles: <span className="font-medium text-gray-900">10%</span></li>
                  
                  <li className="space-y-1">
                    <span>Fabric simple sleeves customization: <span className="font-medium text-gray-900">5%</span></span>
                    <ul className="list-[circle] pl-6 space-y-1 text-gray-700">
                      <li>with Laces: <span className="font-medium text-gray-900">10%</span></li>
                      <li>with Adda work: <span className="font-medium text-gray-900">15%</span></li>
                    </ul>
                  </li>

                  <li className="space-y-1">
                    <span>Fabric puffy sleeves customization: <span className="font-medium text-gray-900">10%</span></span>
                    <ul className="list-[circle] pl-6 space-y-1 text-gray-700">
                      <li>with Laces: <span className="font-medium text-gray-900">15%</span></li>
                      <li>with Adda work: <span className="font-medium text-gray-900">20%</span></li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-white/60 rounded-lg p-4 border border-gray-200/50 pt-3">
                <p className="font-bold text-gray-900 text-[13px] tracking-wider">NOTE:</p>
                <p className="text-gray-700">Charges for multiple customizations will be cumulative and added to the total bill...</p>
              </div>

            </div>
          </div>
        </div>

        {/* 5. Refunds, Returns and Exchanges Section */}
        <div className="bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
          <button
            onClick={() => toggleSection('refunds')}
            className="w-full flex items-center justify-between p-6 md:p-7 text-left font-medium text-gray-800 hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none"
          >
            <span className="text-[14px] md:text-[15px] font-semibold text-gray-900">Refunds, Returns and Exchanges</span>
            <span className="text-2xl font-light text-gray-600 w-6 h-6 flex items-center justify-center transition-transform duration-300">
              {openSection === 'refunds' ? '−' : '+'}
            </span>
          </button>
          <div className={`transition-all duration-300 ease-in-out ${openSection === 'refunds' ? 'max-h-[4000px] opacity-100 border-t border-gray-200/60' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="p-6 md:p-12 text-gray-800 leading-relaxed space-y-6 text-[14px] md:text-[15px] text-justify">
              
              {/* 1. Return Policy */}
              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">1. What is your Return Policy?</h2>
                <p><span className="font-bold">10 Days Return</span> If you aren’t satisfied with the size or quality of the items you receive, you may initiate a Return Request within 10 days from the date of the item’s arrival.</p>
                <ul className="list-disc pl-6 space-y-1 text-[13.5px] text-gray-700">
                  <li>Items should be unworn, unwashed, undamaged, and unaltered to be eligible for returns/exchanges.</li>
                  <li>To minimize inconvenience, we do not offer free return shipping. However, if you receive a product with an error caused by our company, we will cover the cost of return shipping.</li>
                  <li>We will only refund standard courier delivery charges in either scenario. Extra charges for urgent deliveries are non-refundable.</li>
                  <li className="text-red-600 font-semibold">Note: Sale articles cannot be returned or exchanged.</li>
                </ul>
              </div>

              {/* 2. Looking to Exchange */}
              <div className="space-y-1">
                <h2 className="font-bold text-gray-900">2. Looking to Exchange?</h2>
                <p>If you want to request an exchange, the process will still follow our stated Return Policy. Sale articles cannot be returned or exchanged.</p>
              </div>

              {/* 3. Refund Policy */}
              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">3. What is your Refund Policy?</h2>
                <p>If your order doesn’t include any promotions or discounts, you will receive a full refund equal to the item's original price. If it includes promotions, the calculated price paid is adjusted accordingly.</p>
              </div>

              {/* 4. Custom Orders */}
              <div className="space-y-1">
                <h2 className="font-bold text-gray-900">4. Are custom orders refundable?</h2>
                <p>Custom orders are non refundable/exchangeable.</p>
              </div>

              {/* 5. How to Initiate */}
              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">5. How to Initiate A Return/ Refund?</h2>
                <p><span className="font-semibold text-gray-900">Step 1:</span> Contact Customer Service. They will provide alternative solutions or a RAN (Return Authorization Number) within 24-48 hours.</p>
                <p><span className="font-semibold text-gray-900">Step 2:</span> Print the RAN email and put it inside the package. Ship the package back to our warehouse.</p>
                <p><span className="font-semibold text-gray-900">Step 3:</span> Share the tracking number with us on WhatsApp Helpline: +92 300 1003187.</p>
              </div>

              {/* 6. Processing Time */}
              <div className="space-y-1">
                <h2 className="font-bold text-gray-900">6. How long is the Processing Time for Refund?</h2>
                <p>Refunds take up to 15 business days for internal processing before being transferred to your bank, depending on your bank's routing time frame.</p>
              </div>

              {/* 7. What Happens After */}
              <div className="space-y-1">
                <h2 className="font-bold text-gray-900">7. What Happens After I Returned Items?</h2>
                <p>Within 3 business days of receiving your return, we will confirm your resolution via Email or WhatsApp. Replacement orders work just like standard orders regarding shipping timelines.</p>
              </div>

              {/* 8. Customization, Production Errors Policy */}
              <div className="space-y-2">
                <h2 className="font-bold text-gray-900">8. Customization, Production Errors, and Resolution Policy</h2>
                <p>Due to the bespoke nature of our garments, systematic production errors may occasionally occur. If an error happens on our end, customers can claim: a Full Refund, Product Exchange, or a Complimentary Remake.</p>
              </div>

              {/* 9 & 10. Contact Info */}
              <div className="space-y-1 pt-2 border-t border-gray-200/60">
                <p className="font-semibold text-gray-900">Still have questions or feedback?</p>
                <p>Email: <a href="mailto:customercare@swocclothing.com" className="text-blue-600 hover:underline">customercare@swocclothing.com</a> | WhatsApp: +92 300 1003187</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}