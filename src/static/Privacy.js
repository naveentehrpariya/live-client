import React from 'react'
import { Link } from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'

export default function Privacy() {
  return (
    <HomeLayout title="Privacy Policy">
      <div className="container static mx-auto py-8 md:py-12 text-gray-200">
        <div className="p-2">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <p className="mb-4">
            Welcome to <strong>Run Stream</strong>! This Privacy Policy governs the manner in which{" "}
            <a href="https://runstream.co" className="text-blue-600 underline">runstream.co</a>, operated by Runstream, Inc. ("us", "we", or "our"), collects,
            uses, maintains, and discloses information collected from users ("User" or "You") of the
            runstream.co website and services (the "Service").
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Information Collection and Use</h2>
          <p className="mb-4">
            While using our Service, we may ask you to provide certain personally identifiable
            information, such as your email address, name, and account-related information. This is used
            for account management, communication, analytics, and improving our service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Google User Data</h2>
          <p className="mb-2">
            If you choose to log in or connect your YouTube or Google account with our platform, we may
            access certain Google user data via OAuth and YouTube API Services. This data may include:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Your Google account email address</li>
            <li>YouTube channel ID and name</li>
            <li>Stream metadata (e.g., title, description)</li>
            <li>Live stream status and analytics</li>
          </ul>
          <p className="mb-4">
            We only use this data to provide streaming-related features (e.g., scheduling,
            starting/stopping streams, monitoring stream status) and do not share it with third parties
            except as required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Data Retention and Deletion</h2>
          <p className="mb-4">
            We retain your Google user data only for as long as is necessary to provide the Service to
            you or as required by applicable law.
          </p>
          <p className="mb-4">
            You can request deletion of your data, including any Google user data, by contacting us at{" "}
            <a href="mailto:support@runstream.co" className="text-blue-600 underline">support@runstream.co</a>. Upon receiving your request, we will delete
            your data from our systems within 7 business days, unless retention is required for legal or
            compliance purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Account Disconnection</h2>
          <p className="mb-2">You may disconnect your Google account at any time by:</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Visiting your Google account permissions page at{" "}
              <a
                href="https://myaccount.google.com/permissions"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://myaccount.google.com/permissions
              </a>
            </li>
            <li>Revoking access to Run Stream</li>
          </ul>
          <p className="mb-4">
            Upon disconnection, we immediately stop accessing your Google account data and will delete
            any previously stored data related to your Google account, unless otherwise required by law.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">YouTube API Services</h2>
          <p className="mb-2">
            Our Service uses YouTube API Services to provide streaming functionality. By using our
            Service, you agree to be bound by:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.youtube.com/t/terms"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube Terms of Service
              </a>
            </li>
            <li>
              <a
                href="https://policies.google.com/privacy"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
            </li>
          </ul>
          <p className="mb-4">
            You may also manage your permissions via the Google security settings page:{" "}
            <a
              href="https://myaccount.google.com/permissions"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://myaccount.google.com/permissions
            </a>
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Cookies, Log Data, and Security</h2>
          <p className="mb-4">
            We use cookies to improve your experience. Log data, including IP addresses and usage
            statistics, may be collected to monitor performance. We implement security measures to
            protect your data, though no method of transmission is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Children’s Privacy</h2>
          <p className="mb-4">
            Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly
            collect personally identifiable information from children under 13. If you are a parent or
            guardian and believe your child has provided us with Personal Information, please contact
            us. We will delete such information immediately.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, data retention, or how we use Google
            user data, please contact us at{" "}
            <a href="mailto:support@runstream.co" className="text-blue-600 underline">
              support@runstream.co
            </a>
            .
          </p>

        </div>
      </div>
    </HomeLayout>
  )
}