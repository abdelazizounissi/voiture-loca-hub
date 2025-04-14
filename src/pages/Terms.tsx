
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Welcome to CarFlow. By accessing or using our car rental services, you agree to be bound by these Terms and Conditions.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">1. Rental Requirements</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Renters must be at least 21 years of age.</li>
                <li>A valid driver's license that has been held for at least one year is required.</li>
                <li>A credit card in the renter's name is required for payment and security deposit.</li>
                <li>Additional identification may be required.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">2. Reservations and Cancellations</h2>
              <p className="mb-4">
                Reservations can be made online, by phone, or in person. We require a valid credit card to secure your reservation.
              </p>
              <p className="mb-4">
                Cancellation policies:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Cancellations made 48 hours or more before pickup: Full refund</li>
                <li>Cancellations made 24-48 hours before pickup: 50% refund</li>
                <li>Cancellations made less than 24 hours before pickup: No refund</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">3. Vehicle Pickup and Return</h2>
              <p className="mb-4">
                Vehicles must be picked up and returned at the agreed-upon location, date, and time. Late returns may incur additional charges.
              </p>
              <p className="mb-4">
                The vehicle must be returned in the same condition as it was received, excluding normal wear and tear.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">4. Fees and Payments</h2>
              <p className="mb-4">
                All fees, including the base rental rate, insurance options, and additional drivers, will be disclosed at the time of reservation.
              </p>
              <p className="mb-4">
                Additional charges may apply for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Late returns</li>
                <li>Fuel refilling (if the vehicle is not returned with the same fuel level)</li>
                <li>Cleaning (if the vehicle requires excessive cleaning)</li>
                <li>Traffic or parking violations</li>
                <li>Damage to the vehicle</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">5. Insurance and Liability</h2>
              <p className="mb-4">
                Basic insurance is included in the rental rate. Additional coverage options are available for purchase.
              </p>
              <p className="mb-4">
                The renter is responsible for any damage to the vehicle that is not covered by the selected insurance option.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">6. Prohibited Uses</h2>
              <p className="mb-4">
                The vehicle may not be used for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Illegal activities</li>
                <li>Off-road driving (unless the vehicle is specifically designed for such use)</li>
                <li>Pushing or towing other vehicles</li>
                <li>Transporting hazardous materials</li>
                <li>Driving outside the agreed-upon geographic boundaries</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">7. Privacy Policy</h2>
              <p className="mb-4">
                CarFlow respects your privacy and is committed to protecting your personal information. Please refer to our Privacy Policy for details on how we collect, use, and protect your information.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">8. Modifications to Terms</h2>
              <p className="mb-4">
                CarFlow reserves the right to modify these Terms and Conditions at any time. Changes will be effective upon posting to our website.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mb-4">
                CarFlow<br />
                123 Avenue Habib Bourguiba<br />
                Tunis, Tunisia<br />
                Email: info@carflow.tn<br />
                Phone: +216 71 234 567
              </p>
              
              <p className="mt-8 text-sm text-gray-500">
                Last updated: April 14, 2023
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
