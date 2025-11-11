
// import React, { useState, useEffect } from 'react';
// import { Plus, Target, Calendar, TrendingUp, CheckCircle, Trophy, Flame, Zap, Award, Star, Clock } from 'lucide-react';
// import { storage } from '../../utils/storage';
// import { format, differenceInDays } from 'date-fns';

// interface GoalTrackerProps {
//   user: any;
// }

// const GoalTracker: React.FC<GoalTrackerProps> = ({ user }) => {
//   const [goals, setGoals] = useState<any[]>([]);
//   const [showAddGoal, setShowAddGoal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [progressInputs, setProgressInputs] = useState<{ [key: string]: string }>({}); // <-- ADDED STATE

//   useEffect(() => {
//     const savedGoals = storage.getGoals();
    
//     if (savedGoals.length === 0) {
//       const sampleGoals = [
//         { id: 'goal-1', title: 'Lose 10 kg', description: 'Reach my target weight through consistent diet and exercise', targetValue: 10, currentValue: 3.5, unit: 'kg', deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], createdAt: new Date().toISOString(), category: 'weight_loss', priority: 'high' },
//         { id: 'goal-2', title: 'Run 5K in 25 minutes', description: 'Improve my running endurance and speed', targetValue: 25, currentValue: 32, unit: 'minutes', deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], createdAt: new Date().toISOString(), category: 'endurance', priority: 'medium' },
//         { id: 'goal-3', title: 'Complete 100 Push-ups', description: 'Build upper body strength to do 100 consecutive push-ups', targetValue: 100, currentValue: 45, unit: 'reps', deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], createdAt: new Date().toISOString(), category: 'strength', priority: 'medium' },
//         { id: 'goal-4', title: 'Workout 5 days a week', description: 'Maintain consistent workout routine', targetValue: 20, currentValue: 12, unit: 'workouts', deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], createdAt: new Date().toISOString(), category: 'consistency', priority: 'high' },
//         { id: 'goal-5', title: 'Increase Bench Press', description: 'Improve bench press from current weight to target', targetValue: 80, currentValue: 65, unit: 'kg', deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], createdAt: new Date().toISOString(), category: 'strength', priority: 'low' }
//       ];
//       sampleGoals.forEach(goal => storage.saveGoal(goal));
//       setGoals(sampleGoals);
//     } else {
//       setGoals(savedGoals);
//     }
//   }, []);
  
//   // <-- ADDED HANDLER FUNCTIONS
//   const handleProgressInputChange = (goalId: string, value: string) => {
//     setProgressInputs(prev => ({
//       ...prev,
//       [goalId]: value
//     }));
//   };

//   const handleUpdateClick = (goalId: string) => {
//     const inputValue = progressInputs[goalId];
//     if (inputValue) {
//       const value = parseFloat(inputValue);
//       if (!isNaN(value)) {
//         updateGoalProgress(goalId, value);
//         handleProgressInputChange(goalId, ''); // Clear input after update
//       }
//     }
//   };


//   const goalCategories = [
//     { id: 'all', label: 'All Goals', icon: Target, color: 'gray' },
//     { id: 'weight_loss', label: 'Weight Loss', icon: TrendingUp, color: 'blue' },
//     { id: 'strength', label: 'Strength', icon: Zap, color: 'red' },
//     { id: 'endurance', label: 'Endurance', icon: Flame, color: 'orange' },
//     { id: 'consistency', label: 'Consistency', icon: Calendar, color: 'green' }
//   ];

//   const filteredGoals = selectedCategory === 'all' 
//     ? goals 
//     : goals.filter(goal => goal.category === selectedCategory);

//   const completedGoals = goals.filter(goal => (goal.currentValue / goal.targetValue) * 100 >= 100);
//   const activeGoals = goals.filter(goal => (goal.currentValue / goal.targetValue) * 100 < 100);
//   const overdue = goals.filter(goal => {
//     const daysLeft = differenceInDays(new Date(goal.deadline), new Date());
//     return daysLeft < 0 && (goal.currentValue / goal.targetValue) * 100 < 100;
//   });

//   const AddGoalForm = () => {
//     const [goalData, setGoalData] = useState({ title: '', description: '', targetValue: '', unit: '', deadline: '', category: 'weight_loss', priority: 'medium' });

//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       const newGoal = { id: Date.now().toString(), ...goalData, targetValue: parseFloat(goalData.targetValue), currentValue: 0, createdAt: new Date().toISOString() };
//       storage.saveGoal(newGoal);
//       setGoals([...goals, newGoal]);
//       setShowAddGoal(false);
//       setGoalData({ title: '', description: '', targetValue: '', unit: '', deadline: '', category: 'weight_loss', priority: 'medium' });
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-md">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Goal</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
//               <input type="text" required value={goalData.title} onChange={(e) => setGoalData({ ...goalData, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Lose 10 kg" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea value={goalData.description} onChange={(e) => setGoalData({ ...goalData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Describe your goal..."></textarea>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
//                 <input type="number" required value={goalData.targetValue} onChange={(e) => setGoalData({ ...goalData, targetValue: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
//                 <input type="text" required value={goalData.unit} onChange={(e) => setGoalData({ ...goalData, unit: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="kg, lbs, etc." />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
//               <input type="date" required value={goalData.deadline} onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 <select value={goalData.category} onChange={(e) => setGoalData({ ...goalData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option value="weight_loss">Weight Loss</option>
//                   <option value="strength">Strength</option>
//                   <option value="endurance">Endurance</option>
//                   <option value="consistency">Consistency</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                 <select value={goalData.priority} onChange={(e) => setGoalData({ ...goalData, priority: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>
//             </div>
//             <div className="flex space-x-3">
//               <button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">Add Goal</button>
//               <button type="button" onClick={() => setShowAddGoal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   const updateGoalProgress = (goalId: string, newValue: number) => {
//     const updatedGoals = goals.map(goal => 
//       goal.id === goalId ? { ...goal, currentValue: newValue } : goal
//     );
//     setGoals(updatedGoals);
//     const updatedGoal = updatedGoals.find(g => g.id === goalId);
//     if (updatedGoal) {
//       storage.saveGoal(updatedGoal);
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-700 border-red-200';
//       case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
//       case 'low': return 'bg-green-100 text-green-700 border-green-200';
//       default: return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getCategoryIcon = (category: string) => {
//     const categoryData = goalCategories.find(cat => cat.id === category);
//     return categoryData ? categoryData.icon : Target;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Goal Tracker</h1>
//         <button onClick={() => setShowAddGoal(true)} className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
//           <Plus className="w-4 h-4" />
//           <span>Add Goal</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Total Goals</p><p className="text-2xl font-bold text-gray-900">{goals.length}</p></div><Target className="w-8 h-8 text-blue-600" /></div></div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Completed</p><p className="text-2xl font-bold text-green-600">{completedGoals.length}</p></div><Trophy className="w-8 h-8 text-green-600" /></div></div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">In Progress</p><p className="text-2xl font-bold text-blue-600">{activeGoals.length}</p></div><Clock className="w-8 h-8 text-blue-600" /></div></div>
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Overdue</p><p className="text-2xl font-bold text-red-600">{overdue.length}</p></div><Award className="w-8 h-8 text-red-600" /></div></div>
//       </div>

//       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
//         <div className="flex flex-wrap gap-3">
//           {goalCategories.map((category) => {
//             const Icon = category.icon;
//             const isActive = selectedCategory === category.id;
//             return (
//               <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive ? `bg-${category.color}-500 text-white shadow-lg` : `bg-${category.color}-100 text-${category.color}-700 hover:bg-${category.color}-200`}`}>
//                 <Icon className="w-4 h-4" />
//                 <span className="text-sm font-medium">{category.label}</span>
//                 <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-white/20' : `bg-${category.color}-200`}`}>
//                   {category.id === 'all' ? goals.length : goals.filter(g => g.category === category.id).length}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {completedGoals.length > 0 && (
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
//           <div className="flex items-center space-x-3 mb-4"><Trophy className="w-8 h-8" /><h3 className="text-xl font-bold">Congratulations! 🎉</h3></div>
//           <p className="text-green-100 mb-4">You've completed {completedGoals.length} goal{completedGoals.length > 1 ? 's' : ''}! Keep up the amazing work!</p>
//           <div className="flex flex-wrap gap-2">
//             {completedGoals.slice(0, 3).map((goal) => (<span key={goal.id} className="bg-white/20 px-3 py-1 rounded-full text-sm">✓ {goal.title}</span>))}
//             {completedGoals.length > 3 && (<span className="bg-white/20 px-3 py-1 rounded-full text-sm">+{completedGoals.length - 3} more</span>)}
//           </div>
//         </div>
//       )}

//       {filteredGoals.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {goals.map((goal) => {
//             const progress = (goal.currentValue / goal.targetValue) * 100;
//             const daysLeft = differenceInDays(new Date(goal.deadline), new Date());
//             const isCompleted = progress >= 100;
//             const isOverdue = daysLeft < 0 && !isCompleted;
//             const CategoryIcon = getCategoryIcon(goal.category);
            
//             return (
//               <div key={goal.id} className={`bg-white rounded-xl p-6 shadow-sm border-2 hover:shadow-md transition-all ${isCompleted ? 'border-green-200 bg-green-50' : isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-100 hover:border-blue-200'}`}>
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-2"><CategoryIcon className={`w-5 h-5 ${isCompleted ? 'text-green-600' : isOverdue ? 'text-red-600' : 'text-blue-600'}`} /><h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3></div>
//                   <div className="flex items-center space-x-2">{goal.priority && (<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(goal.priority)}`}>{goal.priority}</span>)}{isCompleted && <CheckCircle className="w-6 h-6 text-green-600" />}{isOverdue && <Clock className="w-6 h-6 text-red-600" />}</div>
//                 </div>
//                 <p className="text-gray-600 mb-4">{goal.description}</p>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Progress</span><span className="text-sm font-medium text-gray-900">{goal.currentValue} / {goal.targetValue} {goal.unit}</span></div>
//                   <div className="w-full bg-gray-200 rounded-full h-3"><div className={`h-3 rounded-full transition-all duration-300 ${isCompleted ? 'bg-green-500' : isOverdue ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`} style={{ width: `${Math.min(progress, 100)}%` }}></div></div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span className={`font-medium ${isCompleted ? 'text-green-600' : 'text-blue-600'}`}>{progress.toFixed(1)}% Complete</span>
//                     <span className={`flex items-center ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}><Calendar className="w-4 h-4 mr-1" />{daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today' : `${Math.abs(daysLeft)} days overdue`}</span>
//                   </div>
                  
//                   {/* --- MODIFIED SECTION --- */}
//                   <div className="flex space-x-2">
//                     <input
//                       type="number"
//                       step="0.1"
//                       placeholder="Update progress"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                       value={progressInputs[goal.id] || ''}
//                       onChange={(e) => handleProgressInputChange(goal.id, e.target.value)}
//                       onKeyPress={(e) => {
//                         if (e.key === 'Enter') {
//                           handleUpdateClick(goal.id);
//                         }
//                       }}
//                     />
//                     <button 
//                       onClick={() => handleUpdateClick(goal.id)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
//                     >
//                       Update
//                     </button>
//                   </div>
//                   {/* --- END OF MODIFIED SECTION --- */}

//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedCategory === 'all' ? 'No goals yet' : `No ${goalCategories.find(c => c.id === selectedCategory)?.label.toLowerCase()} goals`}</h3>
//           <p className="text-gray-600 mb-4">{selectedCategory === 'all' ? 'Set your first fitness goal and start tracking your progress' : `Create a ${goalCategories.find(c => c.id === selectedCategory)?.label.toLowerCase()} goal to get started`}</p>
//           <button onClick={() => setShowAddGoal(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
//             {selectedCategory === 'all' ? 'Add Your First Goal' : 'Add Goal'}
//           </button>
//         </div>
//       )}

//       {showAddGoal && <AddGoalForm />}
//     </div>
//   );
// };

// export default GoalTracker;

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Target, Calendar, TrendingUp, CheckCircle, Trophy, Flame, Zap, Award, Clock, Trash2 } from 'lucide-react';
import { apiClient } from '../../utils/api';
import { format, differenceInDays, parseISO, isWithinInterval, subDays } from 'date-fns';

// --- Helper Component for the "Add Goal" Modal ---
const AddGoalForm = ({ onClose, onGoalAdded }: { onClose: () => void, onGoalAdded: () => void }) => {
    const [goalData, setGoalData] = useState({ title: '', description: '', target_value: '', unit: '', deadline: '', category: 'weight_loss', priority: 'medium' });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiClient.post('/goals/', { ...goalData, current_value: 0 });
            onGoalAdded();
        } catch (error) {
            console.error("Failed to add goal:", error);
            alert("Failed to add goal. Please check the form and try again.");
        }
    };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div className="bg-white rounded-xl p-6 w-full max-w-md"><h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Goal</h3><form onSubmit={handleSubmit} className="space-y-4"><input type="text" required value={goalData.title} onChange={(e) => setGoalData({ ...goalData, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="Goal Title" /><textarea value={goalData.description} onChange={(e) => setGoalData({ ...goalData, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={2} placeholder="Description..."></textarea><div className="grid grid-cols-2 gap-4"><input type="number" required value={goalData.target_value} onChange={(e) => setGoalData({ ...goalData, target_value: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="Target Value" /><input type="text" required value={goalData.unit} onChange={(e) => setGoalData({ ...goalData, unit: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="Unit (kg, reps, etc.)" /></div><div><label className="text-sm">Deadline</label><input type="date" required value={goalData.deadline} onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div><div className="grid grid-cols-2 gap-4"><select value={goalData.category} onChange={(e) => setGoalData({ ...goalData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg"><option value="weight_loss">Weight Loss</option><option value="strength">Strength</option><option value="endurance">Endurance</option><option value="consistency">Consistency</option></select><select value={goalData.priority} onChange={(e) => setGoalData({ ...goalData, priority: e.target.value })} className="w-full px-3 py-2 border rounded-lg"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div><div className="flex space-x-3 pt-2"><button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add Goal</button><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button></div></form></div></div>
    );
};

// --- Helper Component for the "Update Goal" Modal ---
const UpdateGoalModal = ({ goal, onClose, onGoalUpdated }: { goal: any, onClose: () => void, onGoalUpdated: () => void }) => {
    const [currentValue, setCurrentValue] = useState(goal.current_value);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiClient.patch(`/goals/${goal.id}/`, { current_value: parseFloat(currentValue) });
            onGoalUpdated();
        } catch (error) {
            console.error("Failed to update goal:", error);
            alert("Failed to update goal progress.");
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Update Progress</h3>
                <p className="text-sm text-gray-600 mb-4">Goal: {goal.title}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">New Value ({goal.unit})</label><input type="number" step="0.1" required value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div className="flex space-x-3 pt-2"><button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Save</button><button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button></div>
                </form>
            </div>
        </div>
    );
};


// --- Main GoalTracker Component ---
const GoalTracker: React.FC<any> = ({ }) => {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchGoals = useCallback(async () => {
    try { setIsLoading(true); const response = await apiClient.get('/goals/'); setGoals(response.data); } 
    catch (error) { console.error("Failed to fetch goals:", error); } 
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchGoals(); }, [fetchGoals]);

  const handleDeleteGoal = async (goalId: number) => {
      if (window.confirm('Are you sure you want to delete this goal?')) {
          try { await apiClient.delete(`/goals/${goalId}/`); fetchGoals(); } 
          catch (error) { alert("Failed to delete goal."); }
      }
  };
  
  const goalCategories = [ { id: 'all', label: 'All Goals', icon: Target, color: 'gray' }, { id: 'weight_loss', label: 'Weight Loss', icon: TrendingUp, color: 'blue' }, { id: 'strength', label: 'Strength', icon: Zap, color: 'red' }, { id: 'endurance', label: 'Endurance', icon: Flame, color: 'orange' }, { id: 'consistency', label: 'Consistency', icon: Calendar, color: 'green' }];
  const filteredGoals = selectedCategory === 'all' ? goals : goals.filter(goal => goal.category === selectedCategory);
  const completedGoals = goals.filter(goal => goal.current_value >= goal.target_value);
  const inProgressGoals = goals.filter(goal => goal.current_value < goal.target_value && differenceInDays(parseISO(goal.deadline), new Date()) >= 0);
  const overdueGoals = goals.filter(goal => goal.current_value < goal.target_value && differenceInDays(parseISO(goal.deadline), new Date()) < 0);
  const getCategoryIcon = (category: string) => {
  const categoryData = goalCategories.find(cat => cat.id === category);
  return categoryData ? categoryData.icon : Target; // Default to Target icon
};
  if (isLoading) return <div className="p-8 text-center">Loading goals...</div>;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Goal Tracker</h1>
        <button onClick={() => setShowAddGoal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"><Plus className="w-5 h-5" /><span>Add Goal</span></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Total Goals</p><p className="text-2xl font-bold text-gray-900">{goals.length}</p></div><Target className="w-8 h-8 text-blue-500" /></div></div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Completed</p><p className="text-2xl font-bold text-green-600">{completedGoals.length}</p></div><Trophy className="w-8 h-8 text-green-500" /></div></div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">In Progress</p><p className="text-2xl font-bold text-blue-600">{inProgressGoals.length}</p></div><Clock className="w-8 h-8 text-blue-500" /></div></div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-600">Overdue</p><p className="text-2xl font-bold text-red-600">{overdueGoals.length}</p></div><Award className="w-8 h-8 text-red-500" /></div></div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-3">
          {goalCategories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            const count = category.id === 'all' ? goals.length : goals.filter(g => g.category === category.id).length;
            return (<button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all border ${isActive ? `bg-gray-800 text-white shadow-lg border-gray-800` : `bg-white text-gray-700 border-gray-200 hover:border-gray-400`}`}><Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} /><span className="text-sm font-medium">{category.label}</span><span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : `bg-gray-200`}`}>{category.id === 'all' ? goals.length : goals.filter(g => g.category === category.id).length}</span></button>);
          })}
        </div>
      </div>
      
      {completedGoals.length > 0 && (
         <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
           <div className="flex items-center space-x-3 mb-4"><Trophy className="w-8 h-8" /><h3 className="text-xl font-bold">Congratulations! 🎉</h3></div>
           <p className="text-green-100 mb-4">You've completed {completedGoals.length} goal{completedGoals.length > 1 ? 's' : ''}! Keep up the amazing work!</p>
           <div className="flex flex-wrap gap-2">
             {completedGoals.slice(0, 3).map((goal) => (<span key={goal.id} className="bg-white/20 px-3 py-1 rounded-full text-sm">✓ {goal.title}</span>))}
             {completedGoals.length > 3 && (<span className="bg-white/20 px-3 py-1 rounded-full text-sm">+{completedGoals.length - 3} more</span>)}
           </div>
         </div>
       )}
       
     {filteredGoals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => {
            const progress = goal.target_value > 0 ? (goal.current_value / goal.target_value) * 100 : 0;
            const daysLeft = differenceInDays(parseISO(goal.deadline), new Date());
            const isNew = isWithinInterval(parseISO(goal.created_at), { start: subDays(new Date(), 7), end: new Date() });
            
            const isCompleted = progress >= 100;
            const isOverdue = daysLeft < 0 && !isCompleted;
            const CategoryIcon = getCategoryIcon(goal.category);

            let iconColorClass = 'text-blue-500'; // Default for "In Progress"
            if (isCompleted) iconColorClass = 'text-green-500';
            if (isOverdue) iconColorClass = 'text-red-500';

            return (
              <div key={goal.id} className={`bg-white rounded-xl p-6 shadow-sm border-2 flex flex-col justify-between group transition-all ${
                  isCompleted ? 'border-green-200 bg-green-50' : 
                  isOverdue ? 'border-red-200 bg-red-50' : 
                  'border-gray-100 hover:border-blue-300'
              }`}>
                <div>
                  <div className="flex items-start justify-between mb-2">
                    {/* ICON AND TITLE SECTION */}
                    <div className="flex items-center space-x-3">
                      <CategoryIcon className={`w-6 h-6 flex-shrink-0 ${iconColorClass}`} />
                      <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                    </div>

                    {/* TAGS AND STATUS ICONS SECTION */}
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        {isNew && <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">New</span>}
                        <span className={`capitalize text-xs font-bold px-2 py-0.5 rounded-full ${goal.priority === 'high' ? 'bg-red-100 text-red-700' : goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{goal.priority}</span>

                        {/* Corrected Icons */}
                        {isCompleted && <CheckCircle className="w-5 h-5 text-green-500"><title>Completed</title></CheckCircle>}
                        {isOverdue && <Clock className="w-5 h-5 text-red-500"><title>Overdue</title></Clock>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 h-10">{goal.description}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm"><span className="text-gray-600">Progress</span><span className="font-medium">{goal.current_value} / {goal.target_value} {goal.unit}</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5"><div className={`h-2.5 rounded-full ${isCompleted ? 'bg-green-500' : isOverdue ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(progress, 100)}%` }}></div></div>
                  <div className="flex justify-between items-center text-xs text-gray-500"><span>{progress.toFixed(0)}% Complete</span><span className={isOverdue ? 'text-red-500 font-semibold' : ''}>{daysLeft >= 0 ? `${daysLeft} days left` : 'Overdue'}</span></div>
                  <div className="pt-2 flex items-center space-x-2">
                    <button onClick={() => setUpdatingGoal(goal)} className="flex-grow py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-semibold">Update Progress</button>
                    <button onClick={() => handleDeleteGoal(goal.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-lg transition"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No Goals Yet</h3>
          <p className="text-gray-600 mb-4">Set your first goal to get started.</p>
          <button onClick={() => setShowAddGoal(true)} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">Add a Goal</button>
        </div>
      )}

      {showAddGoal && <AddGoalForm onClose={() => setShowAddGoal(false)} onGoalAdded={() => { setShowAddGoal(false); fetchGoals(); }} />}
      {updatingGoal && <UpdateGoalModal goal={updatingGoal} onClose={() => setUpdatingGoal(null)} onGoalUpdated={() => { setUpdatingGoal(null); fetchGoals(); }} />}
    </div>
  );
};

export default GoalTracker;