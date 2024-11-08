const brandName = "MobiiWrap";
const brandAbbr = "MW";
const email = "contact@mobiiwrap.in";
const phone = "+91 7838880955";
const links = [
  {
    name: "Home",
    url: "/",
    className: "",
  },
  {
    name: "About",
    url: "/about",
    className: "",
  },
  {
    name: "Products",
    url: "/products",
    className: "",
  },
  {
    name: "Feeling Lucky",
    url: "/feeling-lucky",
    className: "block md:hidden",
  },
  {
    name: "Policies",
    url: "/policies",
    className: "",
  },
  {
    name: "FAQ",
    url: "/faq",
    className: "",
  },
  {
    name: "Contact Us",
    url: "/contact-us",
    className: "",
  },
  {
    name: "Track Order",
    url: "/order-details",
    className: "block md:hidden",
  },
];
const faqs = [
  {
    id: 1,
    title: "What is Mobiiwrap?",
    content:
      "Mobiiwrap specializes in high-quality device skins for a variety of gadgets, including phones, earphones, gaming consoles, watches, and more. Our skins are designed to protect your devices while adding a personalized touch.",
  },
  {
    id: 2,
    title: "What materials are used in Mobiiwrap skins?",
    content:
      "Our skins are made from premium vinyl that is durable, long-lasting, and easy to apply. They provide a sleek, stylish look while protecting your device from scratches and minor impacts.",
  },
  {
    id: 3,
    title: "How do I apply a Mobiiwrap skin?",
    content:
      "Applying a Mobiiwrap skin is easy. Each order includes detailed instructions, and you can also find application videos on our website. Make sure your device is clean and dry before application for the best results.",
  },
  {
    id: 4,
    title: "Are Mobiiwrap skins removable?",
    content:
      "Yes, our skins are designed to be removable without leaving any residue on your device. If you want to change the look of your device, you can easily peel off the old skin and apply a new one.",
  },
  {
    id: 5,
    title: "Will the skin affect the functionality of my device?",
    content:
      "No, Mobiiwrap skins are precisely cut to fit your device without covering essential ports, buttons, or sensors. Your device's functionality will remain unaffected.",
  },
  {
    id: 6,
    title: "Do you offer custom designs?",
    content:
      "Yes, we offer custom design options. You can upload your own artwork or choose from a variety of design templates to create a unique look for your device. Please contact us for more details on custom orders.",
  },
  {
    id: 7,
    title: "How long will it take to receive my order?",
    content:
      "Orders are typically processed within 1-2 business days. Shipping times vary based on your location, but standard shipping usually takes 5-7 business days. Expedited shipping options are also available at checkout.",
  },
  {
    id: 8,
    title: "What is your return policy?",
    content:
      "We offer a 30-day return policy. If you're not satisfied with your purchase, you can return the product in its original condition for a full refund or exchange. Please refer to our Return Policy page for more details.",
  },
  {
    id: 9,
    title: "How can I track my order?",
    content:
      "Once your order is shipped, you will receive a tracking number via email. You can use this number to track the status of your shipment on our website or the carrier's website.",
  },
  {
    id: 10,
    title: "Do you ship internationally?",
    content:
      "Yes, we offer international shipping to most countries. Shipping rates and delivery times vary depending on the destination. Please check our Shipping Policy page for more information.",
  },
  {
    id: 11,
    title: "Can I change or cancel my order after it's been placed?",
    content:
      "If you need to change or cancel your order, please contact us as soon as possible. We will do our best to accommodate your request, but please note that once an order has been processed and shipped, it cannot be changed or canceled.",
  },
  {
    id: 12,
    title: "How can I contact Mobiiwrap for further assistance?",
    content:
      "If you have any other questions or need further assistance, please contact our customer service team at [your email address]. You can also reach us through our Contact Us page on the website.",
  },
  {
    id: 13,
    title: "Are Mobiiwrap skins compatible with wireless charging?",
    content:
      "Yes, Mobiiwrap skins are thin enough to be compatible with most wireless chargers. However, if you experience any issues, please ensure the skin is properly applied and the charger is functioning correctly.",
  },
  {
    id: 14,
    title: "How durable are Mobiiwrap skins?",
    content:
      "Our skins are designed to be highly durable, providing long-lasting protection against scratches, minor dings, and wear and tear. They are made from high-quality vinyl to ensure they withstand daily use.",
  },
  {
    id: 15,
    title: "Will the skin leave any residue on my device?",
    content:
      "No, Mobiiwrap skins are engineered to be residue-free. When you remove the skin, it will not leave any sticky residue or damage your device's surface.",
  },
  {
    id: 16,
    title: "Can I reapply a Mobiiwrap skin after removing it?",
    content:
      "While Mobiiwrap skins are removable, they are not designed to be reapplied once removed. Removing the skin may cause it to lose its adhesive properties, making it difficult to reapply effectively.",
  },
  {
    id: 17,
    title: "Are the skins waterproof?",
    content:
      "Mobiiwrap skins are water-resistant and will protect your device from splashes and spills. However, they are not waterproof and should not be submerged in water.",
  },
  {
    id: 18,
    title: "Do you offer skins for older or less common devices?",
    content:
      "Yes, we offer a wide range of skins for various devices, including older and less common models. If you don't see your device listed, please contact us, and we will do our best to accommodate your request.",
  },
  {
    id: 19,
    title: "Can I clean my device with the skin applied?",
    content:
      "Yes, you can clean your device with the skin applied. Use a soft, damp cloth to gently wipe the surface of the skin. Avoid using harsh chemicals or abrasive materials that may damage the skin.",
  },
  {
    id: 20,
    title: "How thick are Mobiiwrap skins?",
    content:
      "Mobiiwrap skins are ultra-thin, typically around 0.2mm thick. This ensures a sleek look and feel without adding bulk to your device.",
  },
  {
    id: 21,
    title: "What if my skin has a defect or damage upon arrival?",
    content:
      "If you receive a defective or damaged skin, please contact our customer service team within 7 days of receiving your order. We will arrange for a replacement or a refund as per our policy.",
  },
  {
    id: 22,
    title: "Can I use a case with a Mobiiwrap skin?",
    content:
      "Yes, you can use a case with a Mobiiwrap skin applied. Our skins are thin enough to fit comfortably under most cases, providing an extra layer of protection and style.",
  },
  {
    id: 23,
    title: "How do I remove air bubbles during application?",
    content:
      "If air bubbles form during application, use a soft cloth or a squeegee to gently smooth them out towards the edges of the skin. For stubborn bubbles, you can use a pin to puncture and release the trapped air.",
  },
  {
    id: 24,
    title: "Are Mobiiwrap skins eco-friendly?",
    content:
      "We strive to minimize our environmental impact by using recyclable materials for our packaging. While our skins are not biodegradable, they are designed to be long-lasting, reducing the need for frequent replacements.",
  },
];

export { brandName, brandAbbr, email, phone, links, faqs };
