import React from 'react'
import { Link } from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'

export default function Privacy() {
  return (
    <HomeLayout title="Privacy Policy">
      <div className="container mx-auto py-8 md:py-12">
          <h1 className="text-2xl md:text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-gray-100 mt-5">Welcome to Run Stream!</p>
          <p className="text-gray-100 mt-5">
            This Privacy Policy governs the manner in which <a className='text-blue-500' target='_blank' rel='noopener noreferrer' href='https://runstream.co'>runstream.co</a>, operated by Runstream, Inc. ("us", "we", or "our"), collects, uses, maintains, and discloses information collected from users ("User" or "You") of the runstream.co website and services (the "Service").
          </p>
          <p className="text-gray-100 mt-5">
            This page informs you of our policies regarding the collection, use, and disclosure of Personal Information when you use our Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at <a className='text-blue-500' rel='noopener noreferrer' href='https://runstream.co/terms-of-service' target='_blank' >https://runstream.co/terms-of-service</a>.
          </p>
          <h2 className="text-2xl font-bold text-white mt-10">Information Collection And Use</h2>
          <p className="text-gray-100 mt-5">
            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address, name, and other information ("Personal Information").
          </p>
          <p className="text-gray-100 mt-5">
            We collect this information for the purpose of providing the Service, identifying and communicating with you, responding to your requests/inquiries, servicing your purchase orders, and improving our services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Streaming and Third-Party Services</h2>
          <p className="text-gray-100 mt-5">
            As part of our streaming services, you may link your YouTube account or stream directly via our RTMP server. We collect and store information from your linked accounts in accordance with YouTube’s API Services and other third-party platforms. This data may include your stream URL, metadata, and associated account information.
          </p>
          <p className="text-gray-100 mt-5">
            Please note that by linking your YouTube account, you agree to abide by <a className="text-blue-500" rel="noopener noreferrer" href="https://www.youtube.com/t/terms" target="_blank">YouTube's Terms of Service</a>. We do not share any personal or streaming data with third parties without your consent, except as required by law.
          </p> 

          <h2 className="text-2xl font-bold text-white mt-10">Log Data</h2>
          <p className="text-gray-100 mt-5">
            We may also collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Cookies</h2>
          <p className="text-gray-100 mt-5">
            Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a website and transferred to your device. We use cookies to collect information in order to improve our services for you.
          </p>
          <p className="text-gray-100 mt-5">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Do Not Track Disclosure</h2>
          <p className="text-gray-100 mt-5">
            We do not support Do Not Track ("DNT"). Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Service Providers</h2>
          <p className="text-gray-100 mt-5">
            We may employ third-party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services and/or to assist us in analyzing how our Service is used.
          </p>
          <p className="text-gray-100 mt-5">
            These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Business Transaction</h2>
          <p className="text-gray-100 mt-5">
            If Runstream, Inc. is involved in a merger, acquisition, or asset sale, your Personal Information may be transferred as a business asset. In such cases, we will provide notice before your Personal Information is transferred and/or becomes subject to a different Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Security</h2>
          <p className="text-gray-100 mt-5">
            The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Children’s Privacy</h2>
          <p className="text-gray-100 mt-5">
            Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we discover that a child under 13 has provided us with Personal Information, we will delete such information from our servers immediately.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10">Contact Us</h2>
          <p className="text-gray-100 mt-5">
            If you have any questions about this Privacy Policy, please contact us at <a className='text-blue-500' href="mailto:support@runstream.co" target='_blank' rel="noreferrer" >support@runstream.co</a>.
          </p>
      </div>
    </HomeLayout>
  )
}