// src/components/workouts/CreateWorkoutModal.tsx

import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { apiClient } from '../../utils/api';

interface CreateWorkoutModalProps {
  onClose: () => void;
  onWorkoutCreated: () => void;
}

const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({ onClose, onWorkoutCreated }) => {
  // State for the main workout details
  const [details, setDetails] = useState({
    name: '',
    description: '',
    category: 'bodyweight',
    difficulty: 'beginner',
    duration_minutes: 30,
  });

  // State for the list of exercises in this new workout
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  // State to hold all possible exercises fetched from the backend
  const [availableExercises, setAvailableExercises] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all available exercises when the modal mounts
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const response = await apiClient.get('/workouts/exercises/');
        setAvailableExercises(response.data);
      } catch (err) {
        setError('Could not load exercises.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllExercises();
  }, []);

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleAddExercise = () => {
    if (availableExercises.length > 0) {
      // Add the first available exercise by default
      const defaultExercise = availableExercises[0];
      setSelectedExercises([
        ...selectedExercises,
        { 
          // Use a unique key for React's list rendering
          key: Date.now(), 
          exercise_id: defaultExercise.id, 
          name: defaultExercise.name,
          sets: 3, 
          reps: 12, 
          duration_seconds: 0, 
          rest_time_seconds: 60 
        }
      ]);
    }
  };

  const handleExerciseChange = (index: number, field: string, value: any) => {
    const updatedExercises = [...selectedExercises];
    if (field === 'exercise_id') {
      const selected = availableExercises.find(ex => ex.id === parseInt(value));
      updatedExercises[index].exercise_id = selected.id;
      updatedExercises[index].name = selected.name;
    } else {
      updatedExercises[index][field] = value;
    }
    setSelectedExercises(updatedExercises);
  };
  
  const handleRemoveExercise = (index: number) => {
    const updatedExercises = selectedExercises.filter((_, i) => i !== index);
    setSelectedExercises(updatedExercises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...details,
      duration_minutes: Number(details.duration_minutes),
      exercises: selectedExercises.map((ex, index) => ({
        exercise_id: ex.exercise_id,
        sets: Number(ex.sets),
        reps: Number(ex.reps),
        duration_seconds: Number(ex.duration_seconds),
        rest_time_seconds: Number(ex.rest_time_seconds),
        order: index + 1
      }))
    };
    
    try {
      await apiClient.post('/workouts/create/', payload);
      onWorkoutCreated();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create workout.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Workout</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20} /></button>
        </div>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto pr-2 space-y-4">
          {/* Workout Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={details.name} onChange={handleDetailChange} placeholder="Workout Name" required className="p-2 border rounded-lg" />
            <input name="duration_minutes" type="number" value={details.duration_minutes} onChange={handleDetailChange} placeholder="Duration (mins)" required className="p-2 border rounded-lg" />
          </div>
          <textarea name="description" value={details.description} onChange={handleDetailChange} placeholder="Description" required className="w-full p-2 border rounded-lg min-h-[80px]"></textarea>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="category" value={details.category} onChange={handleDetailChange} className="p-2 border rounded-lg">
              <option value="bodyweight">Bodyweight</option>
              <option value="dumbbell">Dumbbell</option>
            </select>
            <select name="difficulty" value={details.difficulty} onChange={handleDetailChange} className="p-2 border rounded-lg">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          {/* Exercises List */}
          <div className="space-y-3">
            <h3 className="font-semibold border-t pt-4">Exercises</h3>
            {selectedExercises.map((exercise, index) => (
              <div key={exercise.key} className="bg-gray-50 p-3 rounded-lg border grid grid-cols-3 md:grid-cols-6 gap-2 items-center">
                <select value={exercise.exercise_id} onChange={(e) => handleExerciseChange(index, 'exercise_id', e.target.value)} className="col-span-3 md:col-span-2 p-2 border rounded-md">
                  {availableExercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
                </select>
                <input type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)} placeholder="Sets" className="p-2 border rounded-md" />
                <input type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)} placeholder="Reps" className="p-2 border rounded-md" />
                <input type="number" value={exercise.rest_time_seconds} onChange={(e) => handleExerciseChange(index, 'rest_time_seconds', e.target.value)} placeholder="Rest (s)" className="p-2 border rounded-md" />
                <button type="button" onClick={() => handleRemoveExercise(index)} className="text-red-500 hover:text-red-700 p-2 rounded-md bg-red-100">Remove</button>
              </div>
            ))}
             <button type="button" onClick={handleAddExercise} disabled={isLoading} className="w-full flex items-center justify-center space-x-2 p-2 border-2 border-dashed rounded-lg hover:bg-gray-100">
              <Plus size={16} />
              <span>Add Exercise</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t flex justify-end space-x-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Workout</button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutModal;