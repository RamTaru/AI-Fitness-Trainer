// import React, { useState, useEffect } from 'react';
// import { Line, Bar, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';
// import { TrendingUp, Weight, Activity, Calendar } from 'lucide-react';
// import { storage } from '../../utils/storage';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// interface ProgressDashboardProps {
//   user: any;
// }

// const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ user }) => {
//   const [progressData, setProgressData] = useState<any[]>([]);
//   const [timeRange, setTimeRange] = useState('30'); // days

//   useEffect(() => {
//     const savedProgress = storage.getProgress();
//     setProgressData(savedProgress);
//   }, []);

//   // Generate sample data if none exists
//   useEffect(() => {
//     if (progressData.length === 0) {
//       const sampleData = [];
//       for (let i = 30; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         sampleData.push({
//           id: `sample-${i}`,
//           userId: user.id,
//           date: date.toISOString().split('T')[0],
//           weight: user.weight + (Math.random() - 0.5) * 2,
//           bodyFat: 15 + (Math.random() - 0.5) * 3,
//           muscle: 45 + (Math.random() - 0.5) * 2,
//           workoutCompleted: Math.random() > 0.3,
//           caloriesConsumed: 1800 + Math.random() * 400
//         });
//       }
//       setProgressData(sampleData);
//     }
//   }, [user.id, user.weight, progressData.length]);

//   const filteredData = progressData.slice(-parseInt(timeRange));

//   const weightData = {
//     labels: filteredData.map(d => new Date(d.date).toLocaleDateString()),
//     datasets: [
//       {
//         label: 'Weight (kg)',
//         data: filteredData.map(d => d.weight),
//         borderColor: 'rgb(59, 130, 246)',
//         backgroundColor: 'rgba(59, 130, 246, 0.1)',
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const bodyCompositionData = {
//     labels: filteredData.map(d => new Date(d.date).toLocaleDateString()),
//     datasets: [
//       {
//         label: 'Body Fat %',
//         data: filteredData.map(d => d.bodyFat),
//         borderColor: 'rgb(239, 68, 68)',
//         backgroundColor: 'rgba(239, 68, 68, 0.1)',
//         yAxisID: 'y',
//       },
//       {
//         label: 'Muscle Mass (kg)',
//         data: filteredData.map(d => d.muscle),
//         borderColor: 'rgb(34, 197, 94)',
//         backgroundColor: 'rgba(34, 197, 94, 0.1)',
//         yAxisID: 'y1',
//       },
//     ],
//   };

//   const workoutData = {
//     labels: ['Completed', 'Missed'],
//     datasets: [
//       {
//         data: [
//           filteredData.filter(d => d.workoutCompleted).length,
//           filteredData.filter(d => !d.workoutCompleted).length,
//         ],
//         backgroundColor: [
//           'rgba(34, 197, 94, 0.8)',
//           'rgba(239, 68, 68, 0.8)',
//         ],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const caloriesData = {
//     labels: filteredData.map(d => new Date(d.date).toLocaleDateString()),
//     datasets: [
//       {
//         label: 'Calories Consumed',
//         data: filteredData.map(d => d.caloriesConsumed),
//         backgroundColor: 'rgba(168, 85, 247, 0.8)',
//         borderColor: 'rgb(168, 85, 247)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: false,
//         grid: {
//           color: 'rgba(0, 0, 0, 0.1)',
//         },
//       },
//     },
//   };

//   const dualAxisOptions = {
//     ...chartOptions,
//     scales: {
//       ...chartOptions.scales,
//       y1: {
//         type: 'linear' as const,
//         display: true,
//         position: 'right' as const,
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//     },
//   };

//   const stats = [
//     {
//       label: 'Current Weight',
//       value: `${filteredData[filteredData.length - 1]?.weight?.toFixed(1) || user.weight} kg`,
//       change: filteredData.length > 1 ? 
//         (filteredData[filteredData.length - 1]?.weight - filteredData[0]?.weight).toFixed(1) : '0',
//       icon: Weight,
//       color: 'blue'
//     },
//     {
//       label: 'Workouts Completed',
//       value: filteredData.filter(d => d.workoutCompleted).length,
//       change: `${((filteredData.filter(d => d.workoutCompleted).length / filteredData.length) * 100).toFixed(0)}%`,
//       icon: Activity,
//       color: 'green'
//     },
//     {
//       label: 'Avg Daily Calories',
//       value: Math.round(filteredData.reduce((sum, d) => sum + d.caloriesConsumed, 0) / filteredData.length) || 0,
//       change: '±200',
//       icon: TrendingUp,
//       color: 'purple'
//     },
//     {
//       label: 'Days Tracked',
//       value: filteredData.length,
//       change: 'Last 30 days',
//       icon: Calendar,
//       color: 'orange'
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Progress Dashboard</h1>
//         <select
//           value={timeRange}
//           onChange={(e) => setTimeRange(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="7">Last 7 days</option>
//           <option value="30">Last 30 days</option>
//           <option value="90">Last 90 days</option>
//         </select>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">{stat.label}</p>
//                   <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
//                   <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
//                 </div>
//                 <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
//                   <Icon className={`w-6 h-6 text-${stat.color}-600`} />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Weight Trend */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Trend</h3>
//           <div className="h-64">
//             <Line data={weightData} options={chartOptions} />
//           </div>
//         </div>

//         {/* Body Composition */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Body Composition</h3>
//           <div className="h-64">
//             <Line data={bodyCompositionData} options={dualAxisOptions} />
//           </div>
//         </div>

//         {/* Workout Completion */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Completion</h3>
//           <div className="h-64">
//             <Doughnut data={workoutData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>

//         {/* Calorie Intake */}
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Calorie Intake</h3>
//           <div className="h-64">
//             <Bar data={caloriesData} options={chartOptions} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressDashboard;
import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { TrendingUp, Weight, Activity, Calendar } from 'lucide-react';
import { apiClient } from '../../utils/api';
import { format, parseISO } from 'date-fns';

// Register all the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define the props the component will receive
interface ProgressDashboardProps {
  user: any;
  currentView: string;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ user, currentView }) => {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState('30'); // Default to 30 days
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend when the component is viewed or the time range changes
  useEffect(() => {
    // Only fetch data if this component is the one being actively viewed
    if (currentView === 'progress') {
      const fetchProgressData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await apiClient.get('/progress/', {
            params: { days: timeRange }
          });
          setProgressData(response.data);
        } catch (err) {
          setError('Failed to load progress data.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProgressData();
    }
  }, [timeRange, currentView]); // Re-fetch when timeRange or currentView changes

  // --- Chart Data Preparation ---
  const chartLabels = progressData.map(d => format(parseISO(d.date), 'd MMM'));

  const weightData = {
    labels: chartLabels,
    datasets: [{
      label: 'Weight (kg)',
      data: progressData.map(d => d.weight),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  const bodyCompositionData = {
    labels: chartLabels,
    datasets: [
      { label: 'Body Fat %', data: progressData.map(d => d.bodyFat), borderColor: 'rgb(239, 68, 68)', yAxisID: 'y' },
      { label: 'Muscle Mass (kg)', data: progressData.map(d => d.muscle), borderColor: 'rgb(34, 197, 94)', yAxisID: 'y1' },
    ],
  };

  const workoutData = {
    labels: ['Completed', 'Missed'],
    datasets: [{
      data: [
        progressData.filter(d => d.workoutCompleted).length,
        progressData.filter(d => !d.workoutCompleted).length,
      ],
      backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(239, 68, 68, 0.8)'],
      borderColor: ['#ffffff'],
      borderWidth: 2,
    }],
  };

  const caloriesData = {
    labels: chartLabels,
    datasets: [{
      label: 'Calories Consumed',
      data: progressData.map(d => d.caloriesConsumed),
      backgroundColor: 'rgba(168, 85, 247, 0.8)',
    }],
  };

  // --- Chart Options ---
  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' as const } },
    scales: { x: { grid: { display: false } }, y: { beginAtZero: false } },
  };

  const dualAxisOptions: any = { ...chartOptions, scales: { ...chartOptions.scales, y1: { type: 'linear' as const, display: true, position: 'right' as const, grid: { drawOnChartArea: false } } } };
  const doughnutOptions: any = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const } } };

  // --- Summary Card Data ---
  const lastRecord = progressData[progressData.length - 1];
  const stats = [
    { label: 'Current Weight', value: `${lastRecord?.weight?.toFixed(1) || 'N/A'} kg`, icon: Weight, color: 'blue' },
    { label: 'Workouts Completed', value: progressData.reduce((sum, d) => sum + (d.workoutsCompletedCount || 0), 0), icon: Activity, color: 'green' },
    { label: 'Avg Daily Calories', value: Math.round(progressData.reduce((sum, d) => sum + d.caloriesConsumed, 0) / progressData.length) || 0, icon: TrendingUp, color: 'purple' },
    { label: 'Days Tracked', value: progressData.length, icon: Calendar, color: 'orange' }
  ];

  // --- Render Logic ---
  if (isLoading) return <div className="p-8 text-center">Loading progress charts...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Progress Dashboard</h1>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Trend</h3><div className="h-64"><Line data={weightData} options={chartOptions} /></div></div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h3 className="text-lg font-semibold text-gray-900 mb-4">Body Composition</h3><div className="h-64"><Line data={bodyCompositionData} options={dualAxisOptions} /></div></div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Completion</h3><div className="h-64 flex items-center justify-center"><Doughnut data={workoutData} options={doughnutOptions} /></div></div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Calorie Intake</h3><div className="h-64"><Bar data={caloriesData} options={chartOptions} /></div></div>
      </div>
    </div>
  );
};

export default ProgressDashboard;