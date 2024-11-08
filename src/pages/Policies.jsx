import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { brandName, email, phone } from "@/lib/constants";
import { Link } from "react-router-dom";

const Policies = () => {
  return (
    <Accordion
      defaultValue="privacy"
      type="single"
      collapsible
      className="px-2 "
    >
      <AccordionItem value="privacy">
        <AccordionTrigger>
          <h3>Privacy Policy</h3>
        </AccordionTrigger>
        <AccordionContent>
          <b className="text-blue-400">
            <small>
              Welcome to <b className="text-blue-400">{brandName}</b>. We value
              your privacy and are committed to protecting your personal
              information. This Privacy Policy outlines how we collect, use, and
              safeguard your data when you visit our website and purchase our
              products.
            </small>
          </b>
          <br />
          <b className="mb-5">
            <small>Effective Date: 20th October 2024</small>
          </b>
          <ul className="flex flex-col gap-5">
            <li className="flex flex-col">
              <h4></h4>
              <p></p>
            </li>
            <li className="flex flex-col">
              <h4>How We Use Your Information</h4>
              <p>
                We use the information we collect in various ways, including to:
                <ul className="flex flex-col ml-5">
                  <li>Process and fulfill your orders.</li>
                  <li>
                    Communicate with you about your order status, products, and
                    promotional offers.
                  </li>
                  <li>Improve our website and services.</li>
                  <li>Monitor and analyze trends, usage, and activities.</li>
                  <li>
                    Detect and prevent fraudulent transactions. Comply with
                    legal obligations and enforce our terms and conditions.
                  </li>
                  <li></li>
                </ul>
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Sharing Your Information</h4>
              <p>
                We respect your privacy and do not sell your personal
                information to third parties. However, we may share your
                information with third parties in the following circumstances:
                <ul className="flex flex-col ml-5">
                  <li>
                    <b className="text-blue-400">Service Providers</b>: We
                    engage third-party service providers to perform functions on
                    our behalf, such as payment processing, shipping, and
                    marketing services.
                  </li>
                  <li>
                    <b className="text-blue-400">Legal Requirements</b>: We may
                    disclose your information if required to do so by law or in
                    response to valid requests by public authorities.
                  </li>
                </ul>
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Data Security</h4>
              <p>
                We implement appropriate security measures to protect your
                personal information from unauthorized access, alteration,
                disclosure, or destruction. However, please note that no method
                of transmission over the Internet or electronic storage is 100%
                secure.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Your Rights</h4>
              <p>
                Depending on your location, you may have certain rights
                regarding your personal information, including the right to:
                <ul className="flex flex-col ml-5">
                  <li> Access the personal information we hold about you.</li>
                  <li>Request correction of inaccurate information.</li>
                  <li>Request deletion of your personal information.</li>
                  <li>Opt-out of marketing communication</li>
                </ul>
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Cookies and Tracking Technologies</h4>
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our website. You can control the use of cookies
                through your browser settings. For more information, please see
                our Cookie Policy.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Changes to This Privacy Policy</h4>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We will notify you of any significant
                changes by posting the new policy on our website.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Contact Us </h4>
              <p>
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:
                <br />
                <b className="text-blue-400">{brandName}</b>
                <br />
                Email: <b className="text-blue-400">{email}</b>
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Children&apos;s Privacy</h4>
              <p>
                Our services are not directed to individuals under the age of
                13. We do not knowingly collect personal information from
                children under 13. If you are a parent or guardian and believe
                that your child has provided us with personal information,
                please contact us so that we can take appropriate action.
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="return">
        <AccordionTrigger>
          <h3>Return and Refund Policy</h3>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          <b className="mb-5">
            <small>Effective Date: 20th October 2024</small>
          </b>
          <ul className="flex flex-col gap-5">
            <li className="flex flex-col">
              <h4>No Returns or Exchanges</h4>
              <p>
                At <b className="text-blue-400">{brandName}</b>, we strive to
                ensure that our device skins meet the highest standards of
                quality. As a result, we do not accept returns or exchanges for
                any items purchased.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Defective Products</h4>
              <p>
                If you receive a defective device skin, please contact our
                customer service team immediately at{" "}
                <b className="text-blue-400">{email}</b>. We are committed to
                resolving such issues to your satisfaction. In the case of a
                defective product, we will provide you with a discount on your
                next purchase.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Discount on Next Purchase</h4>
              <p>
                To receive a discount on your next purchase due to a defective
                product, follow these steps:
                <ul className="ml-5">
                  <li>
                    Contact our customer service team at{" "}
                    <b className="text-blue-400">{email}</b> to report the
                    defect.
                  </li>
                  <li>
                    Provide proof of purchase (order number or receipt) and
                    details of the defect.
                  </li>
                  <li>
                    Our team will assess the defect and issue a discount code
                    for your next purchase if the defect is confirmed.
                  </li>
                </ul>
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Non-Returnable Items</h4>
              <p>
                As our product line consists exclusively of device skins, these
                are not eligible for return or exchange.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Contact Us</h4>
              <p>
                If you have any questions or concerns about our policy, please
                reach out to our customer service team at{" "}
                <b className="text-blue-400">{email}</b>. We are here to assist
                you and ensure your satisfaction with every purchase.
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tnc">
        <AccordionTrigger>
          <h3>Terms and Conditions</h3>
        </AccordionTrigger>
        <AccordionContent>
          <b className="text-blue-400">
            <small>
              Throughout this policy,{" "}
              <b className="text-blue-400">{brandName}</b> refers to{" "}
              <b className="text-blue-400">{brandName}</b> LLC having its
              registered office at [Your Office Address], including its
              affiliates and subsidiaries (also referred to as &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            </small>
          </b>
          <br />
          <b className="text-blue-400">
            <small>Last Updated: 20th October 2024</small>
          </b>
          <ul className="mt-5 flex flex-col gap-5">
            <li className="flex flex-col">
              <h4>Terms</h4>
              <p>
                By accessing this website, available at [Your Website URL], you
                agree to adhere to these Website Terms and Conditions of Use and
                accept responsibility for compliance with any applicable local
                laws. If you disagree with any of these terms, you are
                prohibited from using or accessing this site. The materials
                contained on this website are protected by copyright and
                trademark law.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Use License</h4>
              <p>
                Permission is granted to temporarily download one copy of the
                materials on <b className="text-blue-400">{brandName}</b>{" "}
                LLC&apos;s website for personal, non-commercial transitory
                viewing only. This is the grant of a license, not a transfer of
                title, and under this license, you may not:
                <ul className="ml-5">
                  <li>Modify or copy the materials;</li>
                  <li>
                    Use the materials for any commercial purpose or for any
                    public display;
                  </li>
                  <li>
                    Attempt to decompile or reverse engineer any software
                    contained on <b className="text-blue-400">{brandName}</b>{" "}
                    LLC&apos;s website;
                  </li>
                  <li>
                    Remove any copyright or other proprietary notations from the
                    materials; or
                  </li>
                  <li>
                    Transfer the materials to another person or
                    &ldquo;mirror&rdquo; the materials on any other server.
                  </li>
                </ul>
                <b className="text-blue-400">{brandName}</b> LLC may terminate
                this license upon violations of any of these restrictions. Upon
                termination, your right to view these materials will also be
                terminated, and you must destroy any downloaded materials in
                your possession, whether in printed or electronic format.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Disclaimer</h4>
              <p>
                All the materials on{" "}
                <b className="text-blue-400">{brandName}</b> LLC&apos;s website
                are provided &ldquo;as is&rdquo;.{" "}
                <b className="text-blue-400">{brandName}</b> LLC makes no
                warranties, expressed or implied, and hereby disclaims and
                negates all other warranties. Furthermore,{" "}
                <b className="text-blue-400">{brandName}</b> LLC makes no
                representations concerning the accuracy or reliability of the
                use of the materials on its website or otherwise relating to
                such materials or any sites linked to this site.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Limitations</h4>
              <p>
                In no event shall <b className="text-blue-400">{brandName}</b>{" "}
                LLC or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due
                to business interruption) arising out of the use or inability to
                use the materials on{" "}
                <b className="text-blue-400">{brandName}</b>
                LLC&apos;s website, even if{" "}
                <b className="text-blue-400">{brandName}</b> LLC or an
                authorized representative has been notified orally or in writing
                of the possibility of such damage. Some jurisdictions do not
                allow limitations on implied warranties or limitations of
                liability for incidental or consequential damages; these
                limitations may not apply to you.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Revisions and Errata</h4>
              <p>
                The materials appearing on{" "}
                <b className="text-blue-400">{brandName}</b> LLC&apos;s website
                may include technical, typographical, or photographic errors.
                <b className="text-blue-400">{brandName}</b> LLC does not
                warrant that any of the materials on its website are accurate,
                complete, or current.{" "}
                <b className="text-blue-400">{brandName}</b> LLC may make
                changes to the materials contained on its website at any time
                without notice. However,{" "}
                <b className="text-blue-400">{brandName}</b> LLC does not make
                any commitment to update the materials.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Site Terms of Use Modifications</h4>
              <p>
                <b className="text-blue-400">{brandName}</b> LLC may revise
                these Terms of Use for its website at any time without prior
                notice. By using this website, you agree to be bound by the
                current version of these Terms and Conditions of Use.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Your Privacy</h4>
              <p>Please review our Privacy Policy.</p>
            </li>
            <li className="flex flex-col">
              <h4>Governing Law</h4>
              <p>
                Any claim related to{" "}
                <b className="text-blue-400">{brandName}</b> LLC&apos;s website
                shall be governed by the laws of [Your State/Country] without
                regard to its conflict of law provisions.
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>
          <h3>Shipping Policy</h3>
        </AccordionTrigger>
        <AccordionContent>
          <b className="mb-5">
            <strong>Effective Date: 20th October 2024</strong>
          </b>
          <ul className="flex flex-col gap-5">
            <li className="flex flex-col">
              <h4>Order Processing</h4>
              <p>
                Orders placed on <b className="text-blue-400">{brandName}</b>{" "}
                are typically processed within 1-2 business days. Once your
                order is processed, you will receive a confirmation email with
                your order details.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Shipping Rates and Delivery Times</h4>
              <p>
                We offer the following shipping options:
                <ul className="flex flex-col ml-5">
                  <li>Standard Shipping: 5-7 business days</li>
                  <li>Express Shipping: 2-3 business days</li>
                  <li>
                    International Shipping: Delivery times vary by destination.
                    Please allow 7-14 business days for international orders.
                  </li>
                </ul>
                Shipping rates are calculated at checkout based on your location
                and the selected shipping method.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Order Tracking</h4>
              <p>
                Once your order has shipped, you will receive a shipping
                confirmation email containing a tracking number. You can track
                the status of your shipment on our website or directly through
                the carrier&apos;s website using the provided tracking number.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Shipping Destinations</h4>
              <p>
                We ship to most countries worldwide. However, please note that
                shipping times may vary depending on your location.
                International customers are responsible for any customs duties,
                taxes, or fees imposed by their country&apos;s customs
                regulations.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Shipping Restrictions </h4>
              <p>
                Certain products may have shipping restrictions due to size,
                weight, or regulatory requirements. If your order is affected by
                these restrictions, we will notify you promptly and work to find
                a suitable solution.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Undeliverable Packages</h4>
              <p>
                If a package is returned to us as undeliverable due to incorrect
                address information provided by the customer or if the package
                is unclaimed, we will attempt to contact you to arrange
                reshipment. Additional shipping charges may apply for
                reshipment.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Holiday Shipping</h4>
              <p>
                During peak seasons and holidays, shipping times may be longer
                than usual due to high order volumes and carrier delays. We
                recommend placing your orders in advance to ensure timely
                delivery.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Lost or Damaged Shipments</h4>
              <p>
                In the rare event that your package is lost or damaged in
                transit, please contact our customer service team immediately.
                We will work with the carrier to resolve the issue and ensure a
                satisfactory resolution for you.
              </p>
            </li>
            <li className="flex flex-col">
              <h4>Contact Us</h4>
              <p>
                If you have any questions or concerns about our shipping policy
                or need assistance with your order, please contact our customer
                service team at <b className="text-blue-400">{email}</b>. We are
                here to help!
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="contact">
        <AccordionTrigger>
          <h3>Contact Us</h3>
        </AccordionTrigger>
        <AccordionContent>
          <p>
            If you have any questions or need further assistance, please contact
            our customer service team at{" "}
            <b className="text-blue-400">{email}</b> or WhatsApp at{" "}
            <b className="text-blue-400">{phone}</b>. You can also reach us
            through our Contact Us page on the website.
          </p>
          <br />
          <Link
            className="text-blue-400 underline cursor-pointer"
            to="/contact-us"
          >
            Not satisfied? Submit a ticket!
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Policies;
