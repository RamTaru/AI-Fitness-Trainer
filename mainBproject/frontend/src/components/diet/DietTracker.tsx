import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Utensils, Calendar, ChefHat, Target } from 'lucide-react';
import { apiClient } from '../../utils/api';

// --- Helper Components ---

// AddMealForm remains a helpful component for manual logging.
const AddMealForm = ({ onClose, onMealAdded, selectedDate }: { onClose: () => void, onMealAdded: () => void, selectedDate: string }) => {
  const [mealData, setMealData] = useState({ meal_name: '', calories: '', protein_g: '', carbs_g: '', fat_g: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/diet/logs/', {
        ...mealData,
        date: selectedDate,
        calories: parseFloat(mealData.calories) || 0,
        protein_g: parseFloat(mealData.protein_g) || 0,
        carbs_g: parseFloat(mealData.carbs_g) || 0,
        fat_g: parseFloat(mealData.fat_g) || 0,
      });
      onMealAdded();
      onClose();
    } catch (err) {
      setError('Failed to add meal. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Meal</h3>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" required value={mealData.meal_name} onChange={(e) => setMealData({ ...mealData, meal_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Grilled Chicken Salad" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" required value={mealData.calories} onChange={(e) => setMealData({ ...mealData, calories: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Calories" />
            <input type="number" required value={mealData.protein_g} onChange={(e) => setMealData({ ...mealData, protein_g: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Protein (g)" />
            <input type="number" required value={mealData.carbs_g} onChange={(e) => setMealData({ ...mealData, carbs_g: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Carbs (g)" />
            <input type="number" required value={mealData.fat_g} onChange={(e) => setMealData({ ...mealData, fat_g: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Fat (g)" />
          </div>
          <div className="flex space-x-3 pt-2">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Add Meal</button>
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main DietTracker Component ---
const DietTracker: React.FC<any> = ({ user }) => {
  const [loggedMeals, setLoggedMeals] = useState<any[]>([]);
  const [mealPlan, setMealPlan] = useState<any>(null); // State for the AI Meal Plan
  const [isLoading, setIsLoading] = useState(true);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [activeTab, setActiveTab] = useState<'tracker' | 'plan'>('tracker');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Fetches both the logged meals and the AI meal plan for the selected date
  const fetchDataForDate = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch logged meals
      const logsResponse = await apiClient.get('/diet/logs/', { params: { date: selectedDate } });
      setLoggedMeals(logsResponse.data);

      // Fetch AI meal plan
      const planResponse = await apiClient.get('/diet/plan/', { params: { date: selectedDate } });
      setMealPlan(planResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMealPlan(null); // No plan found for this date
      } else {
        console.error("Failed to fetch data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchDataForDate();
  }, [fetchDataForDate]);
  
  // Handles the "+ New Plan" button click
  const handleGeneratePlan = async () => {
      try {
          const response = await apiClient.post('/diet/plan/', { date: selectedDate });
          setMealPlan(response.data);
          setActiveTab('plan'); // Switch to the plan tab to show the new plan
      } catch (error) {
          console.error("Failed to generate meal plan:", error);
          alert("Could not generate a meal plan. Please ensure your profile is complete.");
      }
  };

  // Handles the "Add to Tracker" button on the meal plan
  const handleAddMealFromPlan = async (meal: any) => {
    try {
      await apiClient.post('/diet/logs/', {
        date: selectedDate,
        meal_name: meal.name,
        calories: meal.calories,
        protein_g: meal.protein_g,
        carbs_g: meal.carbs_g,
        fat_g: meal.fat_g,
      });
      fetchDataForDate(); // Refresh both logs and plan data
      alert(`${meal.name} has been added to your log!`);
    } catch (error) {
      console.error("Failed to add meal from plan:", error);
    }
  };

  // Calculate totals from the user's logged meals
  const totalCalories = loggedMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = loggedMeals.reduce((sum, meal) => sum + meal.protein_g, 0);
  const totalCarbs = loggedMeals.reduce((sum, meal) => sum + meal.carbs_g, 0);
  const totalFat = loggedMeals.reduce((sum, meal) => sum + meal.fat_g, 0);
  
  // Get daily goals from the meal plan, or use defaults
  const dailyGoals = {
    calories: mealPlan?.target_calories || 2000,
    protein: mealPlan?.target_protein_g || 150,
    carbs: mealPlan?.target_carbs_g || 250,
    fat: mealPlan?.target_fat_g || 70,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Diet Tracker</h1>
        <div className="flex space-x-2">
          <button onClick={handleGeneratePlan} className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
            <Plus className="w-4 h-4" />
            <span>New Plan</span>
          </button>
          <button onClick={() => setShowAddMeal(true)} className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <Plus className="w-4 h-4" />
            <span>Add Meal</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-2 shadow-sm border">
        <div className="flex space-x-1">
          <button onClick={() => setActiveTab('tracker')} className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition ${activeTab === 'tracker' ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}>
            <Utensils className="w-4 h-4" />
            <span>Food Tracker</span>
          </button>
          <button onClick={() => setActiveTab('plan')} className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition ${activeTab === 'plan' ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}>
            <Calendar className="w-4 h-4" />
            <span>AI Meal Plan</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
      </div>

      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Calories', value: totalCalories, goal: dailyGoals.calories, unit: 'kcal', color: 'blue' },
              { label: 'Protein', value: totalProtein, goal: dailyGoals.protein, unit: 'g', color: 'red' },
              { label: 'Carbs', value: totalCarbs, goal: dailyGoals.carbs, unit: 'g', color: 'yellow' },
              { label: 'Fat', value: totalFat, goal: dailyGoals.fat, unit: 'g', color: 'green' }
            ].map((n) => (
              <div key={n.label} className="bg-white rounded-xl p-4 shadow-sm border">
                <p className="text-sm font-medium text-gray-600">{n.label}</p>
                <div className="flex items-baseline space-x-2"><span className="text-2xl font-bold">{n.value.toFixed(0)}</span><span className="text-sm text-gray-500">/ {n.goal.toFixed(0)} {n.unit}</span></div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className={`bg-${n.color}-500 h-1.5 rounded-full`} style={{ width: `${Math.min((n.value / n.goal) * 100, 100)}%` }}></div></div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Meals</h3>
            {isLoading ? <p>Loading...</p> : loggedMeals.length > 0 ? (
              <div className="space-y-3">
                {loggedMeals.map((meal) => (
                  <div key={meal.id} className="border-b pb-3 last:border-b-0"><p className="font-semibold">{meal.meal_name}</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 text-sm text-gray-600 mt-1"><span>Cals: <strong>{meal.calories}</strong></span><span>Prot: <strong>{meal.protein_g}g</strong></span><span>Carbs: <strong>{meal.carbs_g}g</strong></span><span>Fat: <strong>{meal.fat_g}g</strong></span></div></div>
                ))}
              </div>
            ) : (<div className="text-center py-6"><p className="text-gray-500">No meals logged for this date</p><button onClick={() => setShowAddMeal(true)} className="mt-2 text-blue-600 hover:underline font-medium">Add your first meal</button></div>)}
          </div>
        </div>
      )}

      {activeTab === 'plan' && (
        isLoading ? <p>Loading plan...</p> : mealPlan ? (
          <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
            <h3 className="text-lg font-semibold">AI Generated Plan for {selectedDate}</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div><p className="text-sm text-gray-500">Calories</p><p className="font-bold text-lg">{dailyGoals.calories.toFixed(0)}</p></div>
              <div><p className="text-sm text-gray-500">Protein</p><p className="font-bold text-lg">{dailyGoals.protein.toFixed(0)}g</p></div>
              <div><p className="text-sm text-gray-500">Carbs</p><p className="font-bold text-lg">{dailyGoals.carbs.toFixed(0)}g</p></div>
              <div><p className="text-sm text-gray-500">Fat</p><p className="font-bold text-lg">{dailyGoals.fat.toFixed(0)}g</p></div>
            </div>
            <div className="space-y-3">
              {mealPlan.meals.map((meal: any) => (
                <div key={meal.id} className="bg-gray-50 border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold capitalize">{meal.meal_type}: {meal.name}</h4>
                      <p className="text-sm text-gray-500">~{meal.calories} kcal</p>
                    </div>
                    <button onClick={() => handleAddMealFromPlan(meal)} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">Add to Tracker</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-sm border">
            <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-4"/>
            <h3 className="text-lg font-semibold text-gray-700">No Meal Plan for this Date</h3>
            <p className="text-gray-500">Click the "+ New Plan" button to generate one.</p>
          </div>
        )
      )}

      {showAddMeal && <AddMealForm onClose={() => setShowAddMeal(false)} onMealAdded={fetchDataForDate} selectedDate={selectedDate} />}
    </div>
  );
};

export default DietTracker;