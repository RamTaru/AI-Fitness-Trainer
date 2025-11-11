export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoal: string;
  activityLevel: string;
  sex: 'male' | 'female' | string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  difficulty: string;
  category: string;
  description: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  restTime: number;
  instructions: string;
  muscleGroups: string[];
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  createdAt: string;
}

export interface ProgressEntry {
  id: string;
  userId: string;
  date: string;
  weight: number;
  bodyFat?: number;
  muscle?: number;
  workoutCompleted: boolean;
  caloriesConsumed: number;
}

export interface DietPlan {
  id: string;
  userId: string;
  weeklyPlan: DailyMealPlan[];
  dailyTargets: MacroTargets;
  recommendations: string[];
  createdAt: string;
}

export interface DailyMealPlan {
  date: string;
  day: string;
  meals: {
    breakfast: MealItem;
    lunch: MealItem;
    dinner: MealItem;
    snacks: MealItem[];
  };
}

export interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string;
}

export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}