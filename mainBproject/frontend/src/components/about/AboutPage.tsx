import React from 'react';
import { Heart, Target, Users, Award, Zap, Shield, Globe, Smartphone } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: 'AI-Powered Personalization',
      description: 'Our advanced AI algorithms create personalized workout and nutrition plans based on your unique profile, goals, and progress.'
    },
    {
      icon: Zap,
      title: '3D Exercise Demonstrations',
      description: 'Professional-quality 3D animations show proper form for every exercise, ensuring safe and effective workouts.'
    },
    {
      icon: Users,
      title: 'Virtual Personal Trainer',
      description: 'Real-time pose detection and form correction provide instant feedback during your workouts.'
    },
    {
      icon: Award,
      title: 'Comprehensive Tracking',
      description: 'Track workouts, nutrition, goals, and progress with detailed analytics and visual charts.'
    },
    {
      icon: Shield,
      title: 'Science-Based Approach',
      description: 'All recommendations are based on proven fitness science and nutrition research.'
    },
    {
      icon: Globe,
      title: 'Accessible Anywhere',
      description: 'Web-based platform works on any device - desktop, tablet, or mobile.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Lead Fitness Scientist',
      description: 'PhD in Exercise Physiology with 15+ years of experience in fitness research and program development.'
    },
    {
      name: 'Mike Chen',
      role: 'AI/ML Engineer',
      description: 'Specialist in machine learning algorithms for health and fitness applications.'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Certified Nutritionist',
      description: 'Registered Dietitian with expertise in sports nutrition and meal planning.'
    },
    {
      name: 'Alex Thompson',
      role: 'UX/UI Designer',
      description: 'Award-winning designer focused on creating intuitive and engaging fitness experiences.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users' },
    { number: '1M+', label: 'Workouts Completed' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '24/7', label: 'Customer Support ' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">About AI Fitness Trainer</h1>
          <p className="text-xl text-blue-100 mb-6">
            Revolutionizing fitness through artificial intelligence, personalized training, and cutting-edge technology.
          </p>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-300" />
            <span className="text-lg">Empowering your fitness journey with intelligent guidance</span>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At AI Fitness Trainer, we believe that everyone deserves access to personalized, professional-quality fitness guidance. Our mission is to democratize fitness coaching through advanced artificial intelligence and make healthy living accessible to all.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We combine cutting-edge technology with proven fitness science to deliver personalized workout plans, nutrition guidance, and real-time coaching that adapts to your unique needs and goals.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To become the world's leading AI-powered fitness platform, helping millions of people achieve their health and fitness goals through intelligent, personalized, and accessible training solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose AI Fitness Trainer?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet Our Expert Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology & Innovation</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced AI Algorithms</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Machine Learning for personalized recommendations
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Computer Vision for pose detection and form analysis
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Natural Language Processing for intelligent coaching
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Predictive analytics for progress optimization
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern Tech Stack</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                React & TypeScript for robust frontend
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                WebRTC for real-time video processing
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Progressive Web App capabilities
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Cloud-based AI processing
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
        <p className="text-lg text-green-100 mb-6">
          Join thousands of users who have already achieved their fitness goals with AI Fitness Trainer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Your Free Trial
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
            View Pricing Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;