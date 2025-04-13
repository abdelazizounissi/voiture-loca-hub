
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-gray-600 mb-8">Last Updated: April 13, 2025</p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                <p className="text-gray-700 mb-3">
                  Welcome to CarFlow ("we," "our," or "us"). These Terms and Conditions govern your use of the CarFlow website and services, 
                  including the booking and rental of vehicles through our platform.
                </p>
                <p className="text-gray-700">
                  By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, 
                  you may not access the service.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
                <p className="text-gray-700 mb-3">
                  When you create an account with us, you must provide accurate, complete, and updated information. You are responsible 
                  for safeguarding the password that you use to access the service and for any activities or actions under your password.
                </p>
                <p className="text-gray-700">
                  We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">3. Booking and Reservation</h2>
                <p className="text-gray-700 mb-3">
                  3.1. All bookings made through our platform are subject to the vehicle's availability and confirmation by the rental agency.
                </p>
                <p className="text-gray-700 mb-3">
                  3.2. The prices displayed on our website include the basic rental fee but may not include additional services, 
                  insurance, or fees that can be selected during the booking process.
                </p>
                <p className="text-gray-700 mb-3">
                  3.3. Payment terms, methods, and security deposits will be specified during the booking process and may vary by rental agency.
                </p>
                <p className="text-gray-700">
                  3.4. You must present a valid driver's license, identification, and credit card in your name at the time of vehicle pickup.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">4. Cancellation and Modification</h2>
                <p className="text-gray-700 mb-3">
                  4.1. Cancellation policies vary by rental agency and are displayed before confirming your booking.
                </p>
                <p className="text-gray-700 mb-3">
                  4.2. Modifications to bookings are subject to vehicle availability and may result in price adjustments.
                </p>
                <p className="text-gray-700">
                  4.3. No-shows may result in the forfeiture of your payment or deposit according to the rental agency's policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">5. Vehicle Use</h2>
                <p className="text-gray-700 mb-3">
                  5.1. The vehicle must be used in accordance with the rental agreement provided by the rental agency.
                </p>
                <p className="text-gray-700 mb-3">
                  5.2. Unauthorized use, including but not limited to off-road driving, racing, or transporting illegal substances, 
                  is strictly prohibited.
                </p>
                <p className="text-gray-700">
                  5.3. The renter is responsible for any damage to the vehicle during the rental period, subject to the terms of the 
                  insurance coverage selected.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">6. Liability</h2>
                <p className="text-gray-700 mb-3">
                  6.1. CarFlow acts as an intermediary between customers and rental agencies. We are not responsible for the quality, 
                  condition, or mechanical reliability of the vehicles provided by the rental agencies.
                </p>
                <p className="text-gray-700 mb-3">
                  6.2. We are not liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting 
                  from your use or inability to use our services.
                </p>
                <p className="text-gray-700">
                  6.3. In the event of a dispute between you and a rental agency, we will make reasonable efforts to facilitate a resolution 
                  but cannot guarantee an outcome.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">7. Privacy Policy</h2>
                <p className="text-gray-700">
                  Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at 
                  least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms shall be governed by and construed in accordance with the laws of Tunisia, without regard to its conflict of law provisions.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms, please contact us at legal@carflow.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
