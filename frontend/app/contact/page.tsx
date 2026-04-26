'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// EmailJS configuration
// These should be set in your .env file
const EMAILJS_SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID || 'service_5npyakc';
const EMAILJS_TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID || 'template_jocvom8';
const EMAILJS_PUBLIC_KEY = process.env.VITE_EMAILJS_PUBLIC_KEY || 'r6mhHEm4e7dO3wuuN';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    // Check if EmailJS credentials are properly configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS configuration is missing. Please check your .env file.');
      setSubmitStatus({
        success: false,
        message: 'Email service is not properly configured. Please try again later.'
      });
      return;
    }

    // Initialize EmailJS with the public key
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error && typeof error === 'object' && 'text' in error) {
        const errorText = (error as any).text;
        if (errorText.includes('Invalid grant') || errorText.includes('reconnect your Gmail account')) {
          errorMessage = 'Email service needs to be reconnected. Please contact the site administrator.';
        }
      }
      
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white  rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Contact Form */}
            <div className="flex items-center mb-6">
              <div className="p-2 bg-indigo-100  rounded-lg mr-3">
                <FaPaperPlane className="h-6 w-6 text-indigo-600 " />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ">Send Me a Message</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700  mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white   transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700  mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white   transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700  mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white   transition-colors"
                  placeholder="How can I help you?"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700  mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white   resize-none transition-colors"
                  placeholder="Hi there, I'd like to talk about..."
                  required
                ></textarea>
              </div>
              <div className="space-y-6">
                {submitStatus && (
                  <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitStatus.message}
                  </div>
                )}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 px-6 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin h-4 w-4" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              className="bg-white  rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-indigo-100  rounded-lg mr-3">
                  <FaEnvelope className="h-6 w-6 text-indigo-600 " />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 ">Contact Information</h2>
              </div>
              <div className="space-y-6">
                <motion.div
                  className="flex items-start p-4 rounded-xl hover:bg-gray-50  transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                >
                  <div className="flex-shrink-0 bg-indigo-100  p-3 rounded-xl">
                    <FaMapMarkerAlt className="h-5 w-5 text-indigo-600 " />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 ">Location</h3>
                    <p className="text-gray-600">Bangalore, India</p>
                  </div>
                </motion.div>

                <motion.a
                  href="mailto:kustagipavan30@gmail.com"
                  className="flex items-start p-4 rounded-xl hover:bg-gray-50  transition-colors block"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                >
                  <div className="flex-shrink-0 bg-indigo-100  p-3 rounded-xl">
                    <FaEnvelope className="h-5 w-5 text-indigo-600 " />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 ">Email</h3>
                    <p className="text-indigo-600 hover:underline">
                      kustagipavan30@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+918317383195"
                  className="flex items-start p-4 rounded-xl hover:bg-gray-50  transition-colors block"
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 5 }}
                >
                  <div className="flex-shrink-0 bg-indigo-100  p-3 rounded-xl">
                    <FaPhone className="h-5 w-5 text-indigo-600 " />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 ">Phone</h3>
                    <p className="text-gray-600">
                      +91 83173 83195
                    </p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="bg-white  rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900  mb-6">Follow Me</h2>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/pavan-ak1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100  p-3 rounded-full text-gray-700  hover:bg-gray-200 transition-colors"
                aria-label="GitHub"
                whileHover={{ y: -3 }}
                whileTap={{ y: -3, scale: 0.95 }}
              >
                <FaGithub className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/pavan-a-kustagi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100  p-3 rounded-full text-gray-700  hover:bg-gray-200 transition-colors"
                aria-label="LinkedIn"
                whileHover={{ y: -3 }}
                whileTap={{ y: -3, scale: 0.95 }}
              >
                <FaLinkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com/Pavan_Kustagi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100  p-3 rounded-full text-gray-700  hover:bg-gray-200 transition-colors"
                aria-label="Twitter"
                whileHover={{ y: -3 }}
                whileTap={{ y: -3, scale: 0.95 }}
              >
                <FaTwitter className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
