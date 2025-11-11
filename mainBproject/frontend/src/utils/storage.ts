import { User, Workout, Meal, Goal, ProgressEntry } from '../types';

const STORAGE_KEYS = {
  USERS: 'fitness_users',
  CURRENT_USER: 'current_user',
  WORKOUTS: 'fitness_workouts',
  MEALS: 'fitness_meals',
  GOALS: 'fitness_goals',
  PROGRESS: 'fitness_progress',
  DIET_PLANS: 'fitness_diet_plans'
};

export const storage = {
  // User management
  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    const parsedUsers = users ? JSON.parse(users) : [];
    
    // Create default admin user if no users exist
    if (parsedUsers.length === 0) {
      const defaultAdmin = {
        id: 'admin-001',
        email: 'admin@fitness.com',
        name: 'System Administrator',
        age: 30,
        weight: 70,
        height: 175,
        fitnessGoal: 'general_fitness',
        activityLevel: 'moderately_active',
        createdAt: new Date().toISOString(),
        isAdmin: true,
        password: 'YWRtaW4xMjNmaXRuZXNzX3NhbHQ=' // admin123 hashed
      };
      parsedUsers.push(defaultAdmin);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(parsedUsers));
    }
    
    return parsedUsers;
  },
  
  saveUser: (user: User) => {
    const users = storage.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },
  
  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },
  
  // Workout management
  getWorkouts: (): Workout[] => {
    const workouts = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
    return workouts ? JSON.parse(workouts) : [];
  },
  
  saveWorkout: (workout: Workout) => {
    const workouts = storage.getWorkouts();
    const existingIndex = workouts.findIndex(w => w.id === workout.id);
    if (existingIndex >= 0) {
      workouts[existingIndex] = workout;
    } else {
      workouts.push(workout);
    }
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
  },
  
  // Meal management
  getMeals: (): Meal[] => {
    const meals = localStorage.getItem(STORAGE_KEYS.MEALS);
    return meals ? JSON.parse(meals) : [];
  },
  
  saveMeal: (meal: Meal) => {
    const meals = storage.getMeals();
    meals.push(meal);
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
  },
  
  // Goal management
  getGoals: (): Goal[] => {
    const goals = localStorage.getItem(STORAGE_KEYS.GOALS);
    return goals ? JSON.parse(goals) : [];
  },
  
  saveGoal: (goal: Goal) => {
    const goals = storage.getGoals();
    const existingIndex = goals.findIndex(g => g.id === goal.id);
    if (existingIndex >= 0) {
      goals[existingIndex] = goal;
    } else {
      goals.push(goal);
    }
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  },
  
  // Progress management
  getProgress: (): ProgressEntry[] => {
    const progress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return progress ? JSON.parse(progress) : [];
  },
  
  saveProgress: (entry: ProgressEntry) => {
    const progress = storage.getProgress();
    progress.push(entry);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },
  
  // Diet plan management
  getDietPlans: (): any[] => {
    const plans = localStorage.getItem(STORAGE_KEYS.DIET_PLANS);
    return plans ? JSON.parse(plans) : [];
  },
  
  saveDietPlan: (plan: any) => {
    const plans = storage.getDietPlans();
    const existingIndex = plans.findIndex(p => p.id === plan.id);
    if (existingIndex >= 0) {
      plans[existingIndex] = plan;
    } else {
      plans.push(plan);
    }
    localStorage.setItem(STORAGE_KEYS.DIET_PLANS, JSON.stringify(plans));
  },
  
  getUserDietPlan: (userId: string): any | null => {
    const plans = storage.getDietPlans();
    return plans.find(p => p.userId === userId) || null;
  }
};