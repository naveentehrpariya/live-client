import React from 'react'
import HomeLayout from '../layout/HomeLayout'

export default function Support() {
  return (
    <HomeLayout title="Customer Support">
     <div className="container">
     <div className="py-6 md:py-12 text-white ">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Customer Support</h1>
      <div className="my-4">
         <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-2 mt-6">Contact Information</h2>
            <ul className="list-disc pl-5">
            <li>Website: <a href="https://www.runstream.co" className="text-blue-500 hover:text-blue-600">runstream.co</a></li>
            <li>Email: <a href="mailto:support@runstream.co" className="text-blue-500 hover:text-blue-600">support@runstream.co</a></li>
            </ul>
            <p className="text-gray-300 mt-4">Response Time: We are committed to providing prompt assistance and aim to respond to all inquiries within 24 hours.</p>
         </div>
         <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-2 mt-6">Support Channels</h2>
            <ul className="list-disc pl-5">
            <li>Email: For any inquiries or assistance, please reach out to us at <a href="mailto:support@runstream.co" className="text-blue-500 hover:text-blue-600">support@runstream.co</a>.</li>
            <li>Contact Form: You can also fill out our contact form on our website for direct assistance.</li>
            <li>Live Chat Support: Coming soon! Stay tuned for real-time support options.</li>
            </ul>
            <p className="text-gray-300 mt-4">Support Hours: Our dedicated support team is available to assist you during our operating hours:</p>
            <ul className="list-disc pl-5">
            <li>Monday - Friday: 9:00 AM to 6:00 PM (GMT)</li>
            </ul>
         </div>
      </div>
      <div className="my-4">
         <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-2 mt-6">Frequently Asked Questions (FAQs)</h2>
            <p className="text-gray-300">Explore our comprehensive <a href='https://runstream.co#faq' className='text-blue-500' >FAQ</a> section for quick answers to common queries. </p>
         </div>
         <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-2 mt-6">Additional Resources</h2>
            <p className="text-gray-300">Access our library of tutorials, guides, and troubleshooting articles for self-help assistance.</p>
         </div>
      </div>
      <div className="my-4">
         <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-2 mt-6">Connect with Us</h2>
            <ul className="list-disc pl-5">
            <li>Stay updated and engage with us on social media:</li>
            <li><a href="https://twitter.com/runstreamCo" className="text-blue-500 hover:text-blue-600">Twitter: @runstreamCo</a></li>
            <li><a href="https://www.facebook.com/runstream.co" className="text-blue-500 hover:text-blue-600">Facebook: runstream.co</a></li>
            <li><a href="https://www.instagram.com/runstream.Co" className="text-blue-500 hover:text-blue-600">Instagram: @runstream.Co</a></li>
            </ul>
         </div>
         <div className="w-full mt-4">
            <p className="text-gray-100 text-center md:text-left">Your satisfaction is our priority. Thank you for choosing runstream.co.</p>
         </div>
      </div>
      </div>
      </div>
    </HomeLayout>
  )
}
