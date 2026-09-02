import { useNavigate } from "react-router-dom";

function ShippingReturns() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Content */}
      <div className="flex-1 mx-auto max-w-5xl px-6 py-8 w-full">
        <div className="space-y-5">
          {/* Title with Back Button */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Shipping & Returns</h1>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
            </button>
          </div>

          <div className="space-y-5 text-gray-700">
            {/* Shipping Section */}
            <div className="space-y-2">
              <h3 className="text-[15px] font-semibold text-gray-900">Shipping</h3>
              <p className="text-sm leading-6">
                All orders are processed within 1–2 business days after payment confirmation.
                We offer Standard domestic delivery in 5–10 business days, Express domestic
                delivery in 2–4 business days, and International shipping in 10–20 business
                days depending on destination.
              </p>
            </div>

            {/* Return Policy */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <h3 className="text-[15px] font-semibold text-gray-900">Return Policy</h3>
              <p className="text-sm leading-6">
                We accept returns only for genuine issues with your order. Please read
                the points below carefully before requesting a return.
              </p>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">Returns are accepted when:</p>
                <ul className="list-disc pl-5 text-sm leading-6 space-y-1">
                  <li>The wrong product is delivered (an entirely different item than ordered).</li>
                  <li>The product is received damaged, defective, or with a manufacturing fault.</li>
                  <li>We have sent an incorrect size (not a sizing issue caused by normal wear).</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">Returns are not accepted for:</p>
                <ul className="list-disc pl-5 text-sm leading-6 space-y-1">
                  <li>Change of mind or buyer&apos;s remorse.</li>
                  <li>Colour preference or perceived difference due to screen or lighting.</li>
                  <li>Normal wear and tear, or damage caused after delivery.</li>
                </ul>
              </div>

              <p className="text-sm leading-6">
                A return request must be made <strong>within 7 days of delivery</strong>.
              </p>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">To request a return, please provide:</p>
                <ul className="list-disc pl-5 text-sm leading-6 space-y-1">
                  <li>Your order number and the product SKU or name.</li>
                  <li>A clear photo or video showing the issue.</li>
                  <li>The delivery date and the delivery address used.</li>
                </ul>
              </div>

              <p className="text-sm leading-6">
                Our support team will verify the issue and may ask for additional photos
                or details. Once verified and approved, you will receive either a
                replacement or a return/refund, with further instructions sent through
                email or WhatsApp. No online return form is provided on the website.
              </p>
            </div>

            {/* Refunds */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <h3 className="text-[15px] font-semibold text-gray-900">Refunds</h3>
              <p className="text-sm leading-6">
                Once we receive and inspect the returned item, your refund will be processed
                to the original payment method within 5–7 business days. If your order was
                placed using Cash on Delivery, our team will contact you to arrange the
                refund through your preferred method.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <h3 className="text-[15px] font-semibold text-gray-900">Questions?</h3>
              <p className="text-sm leading-6">
                If you have any questions about your shipment, a return, or a refund, our
                support team is ready to help. Reach out to us via email or phone and
                we'll get back to you as soon as possible.
              </p>
              <p className="text-sm leading-6">
                Email:{" "}
                <a href="mailto:info@woodenhive.com" className="text-blue-600 hover:text-blue-700 underline">
                  info@woodenhive.com
                </a>
                {" "}· Phone:{" "}
                <a href="tel:+923110719503" className="text-blue-600 hover:text-blue-700 underline">
                  +92 311 071 9503
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-3 px-6 text-center">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} WoodenHive. All rights reserved.</p>
      </div>
    </div>
  );
}

export default ShippingReturns;
