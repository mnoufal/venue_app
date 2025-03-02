import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero-image.jpg'; // You'll need to add this image

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-[#7a1d56]">VenueHub</div>
            </div>
            <div className="flex items-center">
              <nav className="hidden md:flex space-x-8 ml-10">
                <Link to="#features" className="text-gray-700 hover:text-[#7a1d56]">Features</Link>
                <Link to="#pricing" className="text-gray-700 hover:text-[#7a1d56]">Pricing</Link>
                <Link to="#about" className="text-gray-700 hover:text-[#7a1d56]">About</Link>
                <Link to="#contact" className="text-gray-700 hover:text-[#7a1d56]">Contact</Link>
              </nav>
              <div className="ml-6 flex items-center">
                <Link
                  to="/login"
                  className="px-4 py-2 mr-2 text-sm font-medium text-[#7a1d56] hover:text-[#5d1641]"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#7a1d56] hover:bg-[#5d1641] rounded-md shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                  Simplify Event Venue Management
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                  The all-in-one platform for managing venues, bookings, and schedules.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/register"
                    className="px-6 py-3 text-base font-medium text-white bg-[#7a1d56] hover:bg-[#5d1641] rounded-md shadow-md"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="#demo"
                    className="px-6 py-3 text-base font-medium text-[#7a1d56] bg-white hover:bg-gray-100 border border-[#7a1d56] rounded-md shadow-sm"
                  >
                    Book a Demo
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={heroImage}
                  alt="Event venue management"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Powerful Features</h2>
              <p className="mt-4 text-lg text-gray-600">
                Everything you need to manage your venues and bookings efficiently
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#9b3974] rounded-md flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Scheduling</h3>
                <p className="mt-2 text-base text-gray-600">
                  Manage your venue's calendar with real-time availability and automatic buffer time.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#9b3974] rounded-md flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Dynamic Pricing</h3>
                <p className="mt-2 text-base text-gray-600">
                  Flexible pricing options based on time slots, seasons, and special dates.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#9b3974] rounded-md flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Integrated Bookings</h3>
                <p className="mt-2 text-base text-gray-600">
                  Streamlined booking process with automated confirmations and reminders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#7a1d56] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">Start managing your venues today</h2>
            <p className="mt-4 text-xl text-[#f8d0e3]">
              Join thousands of venue owners who trust our platform
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/register"
                className="px-6 py-3 text-base font-medium text-[#7a1d56] bg-white hover:bg-gray-100 rounded-md shadow-md"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold">VenueHub</h3>
              <p className="mt-2 text-gray-300 text-sm">
                The complete solution for venue management and booking.
              </p>
            </div>
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="#features" className="text-gray-300 hover:text-white text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#pricing" className="text-gray-300 hover:text-white text-sm">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="#about" className="text-gray-300 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#contact" className="text-gray-300 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="#privacy" className="text-gray-300 hover:text-white text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#terms" className="text-gray-300 hover:text-white text-sm">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} VenueHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;