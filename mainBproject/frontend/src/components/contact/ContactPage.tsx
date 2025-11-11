import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon, Globe } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@aifitnesstrainer.com',
      description: 'Get help with technical issues and account questions',
      color: 'blue'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: '8548011136',
      description: 'Speak directly with our support team',
      color: 'green'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: '123 Fitness Street, bangalore City, 560005',
      description: 'Visit our main office and training facility',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: 'Mon-Fri: 9AM-6PM PST',
      description: 'Weekend support available via email',
      color: 'orange'
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'partnership', label: 'Partnership' }
  ];

  const faqItems = [
    {
      question: 'How does the AI personalization work?',
      answer: 'Our AI analyzes your fitness profile, goals, and progress to create customized workout and nutrition plans that adapt as you improve.'
    },
    {
      question: 'Can I use the app without equipment?',
      answer: 'Absolutely! We offer extensive bodyweight workout programs that require no equipment, perfect for home workouts.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we use industry-standard encryption and never share your personal data. Your privacy and security are our top priorities.'
    },
    {
      question: 'How accurate is the virtual trainer?',
      answer: 'Our pose detection technology is highly accurate, providing real-time feedback on form and counting reps with 95%+ accuracy.'
    },
    {
      question: 'Can I sync with other fitness apps?',
      answer: 'We support integration with popular fitness trackers and health apps to provide a comprehensive view of your fitness journey.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-blue-100">
          We're here to help you succeed in your fitness journey. Reach out anytime!
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className={`w-12 h-12 bg-${info.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-6 h-6 text-${info.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-900 font-medium mb-2">{info.details}</p>
              <p className="text-sm text-gray-600">{info.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {supportCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Support Options */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Support</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-medium">Live Chat Support</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <HeadphonesIcon className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Schedule a Call</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Globe className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-medium">Help Center</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Hours */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">24/7 Customer Support Available</h2>
            <p className="text-green-100 mb-4">
              Our  Customer Support Available is available around the clock to help with common questions and guide you through the app features.
            </p>
            <p className="text-green-100">
              For complex issues, our human support team is available Monday through Friday, 9 AM to 6 PM PST.
            </p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeadphonesIcon className="w-12 h-12 text-white" />
            </div>
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Chat with US
            </button>
          </div>
        </div>
      </div>

      {/* Social Media & Community */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connect with Our Community</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Facebook', users: '50K+', color: 'blue' },
            { name: 'Instagram', users: '75K+', color: 'pink' },
            { name: 'Twitter', users: '30K+', color: 'blue' },
            { name: 'YouTube', users: '100K+', color: 'red' }
          ].map((social, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className={`w-12 h-12 bg-${social.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <Globe className={`w-6 h-6 text-${social.color}-600`} />
              </div>
              <h3 className="font-semibold text-gray-900">{social.name}</h3>
              <p className="text-sm text-gray-600">{social.users} followers</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;