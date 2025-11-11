import React, { useState, useEffect } from 'react';
import { User, TrendingUp, Target, Flame, Calendar, Award, } from 'lucide-react';
import { apiClient } from '../../utils/api';
import { generatePersonalizedTips } from '../../utils/ai';

interface DashboardProps {
  user: any;
  onViewChange: (view: string) => void;
}

interface DashboardData {
    currentWeight: number | null;
    bmi: number | null;
    bmiCategory: string;
    caloriesToday: number;
    workoutsThisWeek: number;
}

const Dashboard: React.FC<DashboardProps> = ({ user,onViewChange }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiClient.get<DashboardData>('/dashboard/');
        setData(response.data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (error || !data) {
    return <div className="p-8 text-center text-red-500">{error || 'No dashboard data available.'}</div>;
  }

  const stats = [
    { label: 'Current Weight', value: `${data.currentWeight || 'N/A'} kg`, icon: TrendingUp, color: 'blue' },
    { label: 'BMI', value: data.bmi ? data.bmi.toFixed(1) : 'N/A', icon: Target, color: 'green' },
    { label: 'Calories Today', value: data.caloriesToday.toLocaleString(), icon: Flame, color: 'orange' },
    { label: 'Workouts This Week', value: data.workoutsThisWeek, icon: Calendar, color: 'purple' }
  ];

  const tips = generatePersonalizedTips(user);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-blue-100 text-lg">Ready to crush your fitness goals today?</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BMI Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">BMI</span>
              <span className="font-semibold">{data.bmi ? data.bmi.toFixed(1) : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Category</span>
              <span className={`font-semibold ${
              data. bmiCategory === 'Normal weight' ? 'text-green-600' : 
              data.bmiCategory === 'Overweight' ? 'text-yellow-600' : 
              data.bmiCategory === 'Underweight' ? 'text-blue-600' :'text-red-600'
              }`}>{data.bmiCategory}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                style={{ width: `${Math.min(((data.bmi || 0)/ 30) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* AI Tips */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <Award className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">AI Fitness Recommendations</h3>
          </div>
          <div className="space-y-3">
            {tips.slice(0, 3).map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Nutrition Plan - Placeholder */}
        {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nutrition Plan</h3>
          <p className="text-sm text-gray-600">No meal plan generated yet. Visit the Diet Tracker to create one.</p>
        </div> */}

      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button onClick={() => onViewChange('workouts')} className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">Start Workout</button>
                <button onClick={() => onViewChange('diet')} className="flex-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">Log Meal</button>
                <button onClick={() => onViewChange('progress')} className="flex-1 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">Update Progress</button>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;