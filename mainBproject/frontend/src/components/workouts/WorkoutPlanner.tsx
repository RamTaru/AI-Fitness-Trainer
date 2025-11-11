import React, { useState, useEffect, useCallback } from 'react';
import { Play, Clock, Users,Star,  Plus, Pause, ChevronLeft,Trash2,PlusCircle } from 'lucide-react';
import { apiClient } from '../../utils/api';
// Note: We remove generateWorkoutPlan and storage imports as they are no longer needed.
import WorkoutAnimation from './WorkoutAnimation'; // Assuming this component exists
import CreateWorkoutModal from './CreateWorkoutModal';
// --- Main WorkoutPlanner Component ---
interface WorkoutPlannerProps {
  user: any;
}
const WorkoutPlanner: React.FC<WorkoutPlannerProps> = ({ user }) => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bodyweight' | 'dumbbell'>('all');
  
  // Active workout state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch workouts from the backend whenever the category changes
  const fetchWorkouts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/workouts/', {
        params: { category: selectedCategory }
      });
      setWorkouts(response.data);
    } catch (err) {
      setError('Failed to load workouts.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  // Timer logic for exercises
  useEffect(() => {
    let interval: number;
    if (isWorkoutActive && exerciseTimer > 0) {
      interval = setInterval(() => {
        setExerciseTimer(prev => prev - 1);
      }, 1000);
    } else if (exerciseTimer === 0 && isWorkoutActive) {
      handleNextExercise();
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, exerciseTimer]);


  // --- Event Handlers ---

  const startWorkout = (workout: any) => {
    setSelectedWorkout(workout);
    setCurrentExerciseIndex(0);
    setIsWorkoutActive(false);
    setExerciseTimer(0);
  };
  
  const startExercise = () => {
    setIsWorkoutActive(true);
    const currentExercise = selectedWorkout.exercises[currentExerciseIndex];
    setExerciseTimer(currentExercise.duration || 30); // Default to 30s if duration is not set
  };
  
  const pauseExercise = () => {
    setIsWorkoutActive(false);
  };
  
  const handleFinishWorkout = async () => {
    try {
      await apiClient.post('/workouts/log/', { workout: selectedWorkout.id });
      alert('Workout completed and logged! Great job!');
      setSelectedWorkout(null); // Go back to the workout list
    } catch (err) {
      console.error("Failed to log workout", err);
      alert('Failed to log workout. Please try again.');
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < selectedWorkout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsWorkoutActive(false);
      setExerciseTimer(0);
    } else {
      handleFinishWorkout();
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setIsWorkoutActive(false);
      setExerciseTimer(0);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

   const handleDeleteWorkout = async (workoutId: number) => {
    if (window.confirm('Are you sure you want to delete this workout? This action cannot be undone.')) {
      try {
        await apiClient.delete(`/workouts/${workoutId}/`);
        // Refresh the list of workouts after a successful deletion
        fetchWorkouts(); 
      } catch (err) {
        console.error('Failed to delete workout:', err);
        alert('You do not have permission to delete this workout.');
      }
    }
  };

  // --- Render Logic ---

  if (isLoading) {
    return <div className="p-8 text-center">Loading workouts...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // RENDER THE ACTIVE WORKOUT VIEW
  if (selectedWorkout) {
    const currentExercise = selectedWorkout.exercises[currentExerciseIndex];
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedWorkout(null)} className="flex items-center space-x-2 text-blue-600 font-medium hover:underline">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Workouts</span>
        </button>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-2xl font-bold mb-1">{selectedWorkout.name}</h2>
          <p className="text-gray-600">Exercise {currentExerciseIndex + 1} of {selectedWorkout.exercises.length}: <span className="font-bold">{currentExercise.name}</span></p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise Demo</h3>
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <WorkoutAnimation exerciseName={currentExercise.name} isPlaying={isWorkoutActive} videoUrl={currentExercise.videoUrl} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Details & Controls</h3>
            <div className="grid grid-cols-2 gap-4 mb-4 text-center">
              <div className="bg-gray-100 p-2 rounded-lg"><p className="text-sm text-gray-600">Sets</p><p className="text-xl font-bold">{currentExercise.sets}</p></div>
              <div className="bg-gray-100 p-2 rounded-lg"><p className="text-sm text-gray-600">Reps</p><p className="text-xl font-bold">{currentExercise.reps}</p></div>
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-mono font-bold text-blue-600">{exerciseTimer}s</div>
              <p className="text-sm text-gray-500">Time Remaining</p>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button onClick={handlePreviousExercise} disabled={currentExerciseIndex === 0} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50">Previous</button>
              {!isWorkoutActive ? (
                <button onClick={startExercise} className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-lg"><Play className="w-6 h-6" /></button>
              ) : (
                <button onClick={pauseExercise} className="p-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 shadow-lg"><Pause className="w-6 h-6" /></button>
              )}
              <button onClick={handleNextExercise} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Next</button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${((currentExerciseIndex + 1) / selectedWorkout.exercises.length) * 100}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER THE WORKOUT LIST VIEW
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900"> AI Workout Planner</h1>
        <div className="flex items-center space-x-4">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as any)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="all">All Workouts</option>
            <option value="bodyweight">Bodyweight</option>
            <option value="dumbbell">Dumbbell</option>
          </select>
           <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Workout</span>
          </button>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Workouts</p>
              <p className="text-2xl font-bold text-gray-900">{workouts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bodyweight</p>
              <p className="text-2xl font-bold text-green-600">{workouts.filter(w => w.category === 'bodyweight').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dumbbell</p>
              <p className="text-2xl font-bold text-purple-600">{workouts.filter(w => w.category === 'dumbbell').length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Custom Workouts</p>
              <p className="text-2xl font-bold text-red-600">{workouts.filter(w => w.created_by !== null).length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>
      

      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-shadow flex flex-col relative">
            {user && user.id === workout.created_by && (
              <button 
                onClick={() => handleDeleteWorkout(workout.id)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors"
                title="Delete workout"
              >
                <Trash2 size={18} />
              </button>
            )} 
            <div className="bg-gray-900 rounded-lg aspect-video mb-4 flex items-center justify-center">
                <WorkoutAnimation exerciseName={workout.exercises[0]?.name || 'workout'} isPlaying={false}  videoUrl={workout.exercises[0]?.videoUrl} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
            <div className="flex items-center space-x-2 my-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(workout.difficulty)}`}>{workout.difficulty}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${workout.category === 'bodyweight' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>{workout.category}</span>
            </div>
            <p className="text-sm text-gray-600 flex-grow">{workout.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
              <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /><span>{workout.duration} min</span></div>
              <div className="flex items-center"><Users className="w-4 h-4 mr-1" /><span>{workout.exercises.length} exercises</span></div>
            </div>
            <button onClick={() => startWorkout(workout)} className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Start Workout
            </button>
          </div>
        ))}
      </div>
      {showCreateModal && <CreateWorkoutModal 
        onClose={() => setShowCreateModal(false)}
        onWorkoutCreated={() => {
          setShowCreateModal(false);
          fetchWorkouts(); // This refreshes the list with the new workout!
        }}
      />}
     </div>
  );
};
   
export default WorkoutPlanner;