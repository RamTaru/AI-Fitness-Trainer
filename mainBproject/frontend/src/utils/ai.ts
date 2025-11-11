import { User, Workout, Exercise } from '../types';

export const calculateBMI = (weight: number, height: number): number => {
  return weight / ((height / 100) ** 2);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const generatePersonalizedTips = (user: User): string[] => {
  const bmi = calculateBMI(user.weight, user.height);
  const tips: string[] = [];
  
  // BMI-based tips
  if (bmi < 18.5) {
    tips.push('Focus on strength training to build muscle mass');
    tips.push('Increase your caloric intake with nutrient-dense foods');
  } else if (bmi > 25) {
    tips.push('Incorporate more cardio exercises for weight loss');
    tips.push('Consider reducing portion sizes and tracking calories');
  }
  
  // Activity level tips
  if (user.activityLevel === 'sedentary') {
    tips.push('Start with 15-minute walks daily to build the habit');
    tips.push('Try desk exercises during work breaks');
  } else if (user.activityLevel === 'very_active') {
    tips.push('Ensure adequate rest days for recovery');
    tips.push('Focus on proper nutrition to fuel your workouts');
  }
  
  // Goal-based tips
  if (user.fitnessGoal === 'weight_loss') {
    tips.push('Create a caloric deficit of 500-750 calories per day');
    tips.push('Combine strength training with cardio for best results');
  } else if (user.fitnessGoal === 'muscle_gain') {
    tips.push('Consume 1.6-2.2g of protein per kg of body weight');
    tips.push('Progressive overload is key - gradually increase weights');
  }
  
  return tips;
};

export const generateWorkoutPlan = (user: User): Workout[] => {
  // Bodyweight Exercises
  const bodyweightBeginnerExercises: Exercise[] = [
    {
      id: '1',
      name: 'Push-ups',
      sets: 3,
      reps: 12,
      restTime: 60,
      instructions: 'Keep your body straight and lower chest to ground',
      muscleGroups: ['chest', 'shoulders', 'triceps']
    },
    {
      id: '2',
      name: 'Squats',
      sets: 3,
      reps: 15,
      restTime: 90,
      instructions: 'Keep your knees behind your toes and chest up',
      muscleGroups: ['quadriceps', 'glutes', 'hamstrings']
    },
    {
      id: '3',
      name: 'Plank',
      sets: 3,
      duration: 30,
      reps: 1,
      restTime: 60,
      instructions: 'Hold a straight line from head to heels',
      muscleGroups: ['core', 'shoulders']
    },
    {
      id: '4',
      name: 'Lunges',
      sets: 3,
      reps: 10,
      restTime: 60,
      instructions: 'Step forward and lower until both knees are at 90 degrees',
      muscleGroups: ['quadriceps', 'glutes', 'hamstrings']
    }
  ];
  
  const bodyweightIntermediateExercises: Exercise[] = [
    {
      id: '5',
      name: 'Burpees',
      sets: 4,
      reps: 8,
      restTime: 90,
      instructions: 'Squat down, jump back to plank, do push-up, jump forward, then jump up',
      muscleGroups: ['full body', 'cardio']
    },
    {
      id: '6',
      name: 'Pike Push-ups',
      sets: 3,
      reps: 10,
      restTime: 75,
      instructions: 'Start in downward dog position, lower head toward ground',
      muscleGroups: ['shoulders', 'triceps', 'core']
    },
    {
      id: '7',
      name: 'Jumping Jacks',
      sets: 3,
      reps: 20,
      restTime: 30,
      instructions: 'Jump feet apart while raising arms overhead',
      muscleGroups: ['cardio', 'full body']
    },
    {
      id: '8',
      name: 'Mountain Climbers',
      sets: 3,
      duration: 30,
      reps: 1,
      restTime: 45,
      instructions: 'Alternate bringing knees to chest in plank position',
      muscleGroups: ['cardio', 'core']
    },
    {
      id: '9',
      name: 'Diamond Push-ups',
      sets: 3,
      reps: 8,
      restTime: 90,
      instructions: 'Form diamond with hands, perform push-up focusing on triceps',
      muscleGroups: ['triceps', 'chest', 'shoulders']
    }
  ];

  const bodyweightAdvancedExercises: Exercise[] = [
    {
      id: '10',
      name: 'Pull-ups',
      sets: 4,
      reps: 8,
      restTime: 120,
      instructions: 'Hang from bar, pull body up until chin clears bar',
      muscleGroups: ['lats', 'biceps', 'rhomboids']
    },
    {
      id: '11',
      name: 'Pistol Squats',
      sets: 3,
      reps: 5,
      restTime: 120,
      instructions: 'Single leg squat, extend other leg forward',
      muscleGroups: ['quadriceps', 'glutes', 'core']
    },
    {
      id: '12',
      name: 'Handstand Push-ups',
      sets: 3,
      reps: 5,
      restTime: 180,
      instructions: 'Against wall, lower head to ground and press back up',
      muscleGroups: ['shoulders', 'triceps', 'core']
    },
    {
      id: '13',
      name: 'Muscle-ups',
      sets: 3,
      reps: 3,
      restTime: 180,
      instructions: 'Pull-up transitioning to dip above bar',
      muscleGroups: ['lats', 'chest', 'triceps', 'core']
    }
  ];

  // Dumbbell Exercises
  const dumbbellBeginnerExercises: Exercise[] = [
    {
      id: '14',
      name: 'Dumbbell Bicep Curls',
      sets: 3,
      reps: 12,
      restTime: 90,
      instructions: 'Hold dumbbells at sides, curl up to shoulders with control',
      muscleGroups: ['biceps', 'forearms']
    },
    {
      id: '15',
      name: 'Dumbbell Shoulder Press',
      sets: 3,
      reps: 10,
      restTime: 120,
      instructions: 'Press dumbbells overhead from shoulder height',
      muscleGroups: ['shoulders', 'triceps', 'core']
    },
    {
      id: '16',
      name: 'Dumbbell Chest Press',
      sets: 3,
      reps: 10,
      restTime: 120,
      instructions: 'Lie on bench, press dumbbells up from chest level',
      muscleGroups: ['chest', 'shoulders', 'triceps']
    },
    {
      id: '17',
      name: 'Dumbbell Rows',
      sets: 3,
      reps: 12,
      restTime: 90,
      instructions: 'Bend over, pull dumbbells to your sides',
      muscleGroups: ['lats', 'rhomboids', 'biceps']
    }
  ];

  const dumbbellIntermediateExercises: Exercise[] = [
    {
      id: '18',
      name: 'Dumbbell Thrusters',
      sets: 4,
      reps: 8,
      restTime: 120,
      instructions: 'Squat down, then press dumbbells overhead in one motion',
      muscleGroups: ['full body', 'shoulders', 'legs']
    },
    {
      id: '19',
      name: 'Dumbbell Romanian Deadlifts',
      sets: 4,
      reps: 10,
      restTime: 120,
      instructions: 'Hip hinge movement with dumbbells, keep back straight',
      muscleGroups: ['hamstrings', 'glutes', 'lower back']
    },
    {
      id: '20',
      name: 'Dumbbell Lunges',
      sets: 3,
      reps: 12,
      restTime: 90,
      instructions: 'Step forward into lunge while holding dumbbells',
      muscleGroups: ['quadriceps', 'glutes', 'hamstrings']
    },
    {
      id: '21',
      name: 'Dumbbell Renegade Rows',
      sets: 3,
      reps: 8,
      restTime: 120,
      instructions: 'Plank position with dumbbells, row one arm at a time',
      muscleGroups: ['core', 'lats', 'shoulders']
    }
  ];

  const dumbbellAdvancedExercises: Exercise[] = [
    {
      id: '22',
      name: 'Deadlifts',
      sets: 4,
      reps: 6,
      restTime: 180,
      instructions: 'Hip hinge movement with heavy dumbbells, keep close to body',
      muscleGroups: ['hamstrings', 'glutes', 'lower back', 'traps']
    },
    {
      id: '23',
      name: 'Dumbbell Clean and Press',
      sets: 4,
      reps: 6,
      restTime: 180,
      instructions: 'Explosive movement from floor to overhead press',
      muscleGroups: ['full body', 'shoulders', 'traps']
    },
    {
      id: '24',
      name: 'Dumbbell Turkish Get-ups',
      sets: 3,
      reps: 5,
      restTime: 180,
      instructions: 'Complex movement from lying to standing with dumbbell overhead',
      muscleGroups: ['full body', 'core', 'shoulders']
    },
    {
      id: '25',
      name: 'Dumbbell Man Makers',
      sets: 3,
      reps: 6,
      restTime: 180,
      instructions: 'Burpee with dumbbell rows and overhead press',
      muscleGroups: ['full body', 'cardio']
    }
  ];
  
  const workouts: Workout[] = [
    // Bodyweight Workouts
    {
      id: '1',
      name: 'Bodyweight Beginner',
      exercises: bodyweightBeginnerExercises,
      duration: 25,
      difficulty: 'beginner',
      category: 'bodyweight',
      description: 'Perfect bodyweight routine for beginners'
    },
    {
      id: '2',
      name: 'Bodyweight HIIT',
      exercises: bodyweightIntermediateExercises,
      duration: 35,
      difficulty: 'intermediate',
      category: 'bodyweight',
      description: 'High-intensity bodyweight workout'
    },
    {
      id: '3',
      name: 'Advanced Calisthenics',
      exercises: bodyweightAdvancedExercises,
      duration: 45,
      difficulty: 'advanced',
      category: 'bodyweight',
      description: 'Advanced bodyweight movements for elite fitness'
    },
    {
      id: '4',
      name: 'Bodyweight Core Destroyer',
      exercises: [
        {
          id: '26',
          name: 'Plank',
          sets: 4,
          duration: 45,
          reps: 1,
          restTime: 60,
          instructions: 'Hold perfect plank position',
          muscleGroups: ['core', 'shoulders']
        },
        {
          id: '27',
          name: 'Mountain Climbers',
          sets: 4,
          duration: 30,
          reps: 1,
          restTime: 45,
          instructions: 'Fast alternating knee drives',
          muscleGroups: ['core', 'cardio']
        },
        {
          id: '28',
          name: 'Russian Twists',
          sets: 3,
          reps: 20,
          restTime: 60,
          instructions: 'Rotate torso side to side, feet elevated',
          muscleGroups: ['obliques', 'core']
        }
      ],
      duration: 20,
      difficulty: 'intermediate',
      category: 'bodyweight',
      description: 'Intense bodyweight core workout'
    },
    
    // Dumbbell Workouts
    {
      id: '5',
      name: 'Dumbbell Beginner',
      exercises: dumbbellBeginnerExercises,
      duration: 30,
      difficulty: 'beginner',
      category: 'dumbbell',
      description: 'Perfect introduction to dumbbell training'
    },
    {
      id: '6',
      name: 'Dumbbell Full Body',
      exercises: dumbbellIntermediateExercises,
      duration: 40,
      difficulty: 'intermediate',
      category: 'dumbbell',
      description: 'Complete full-body dumbbell workout'
    },
    {
      id: '7',
      name: 'Advanced Dumbbell Power',
      exercises: dumbbellAdvancedExercises,
      duration: 50,
      difficulty: 'advanced',
      category: 'dumbbell',
      description: 'Advanced dumbbell training for serious athletes'
    },
    {
      id: '8',
      name: 'Dumbbell Upper Body',
      exercises: [
        {
          id: '29',
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: 10,
          restTime: 120,
          instructions: 'Press dumbbells up from chest, control the descent',
          muscleGroups: ['chest', 'shoulders', 'triceps']
        },
        {
          id: '30',
          name: 'Dumbbell Flyes',
          sets: 3,
          reps: 12,
          restTime: 90,
          instructions: 'Wide arc motion, squeeze chest at top',
          muscleGroups: ['chest', 'shoulders']
        },
        {
          id: '31',
          name: 'Dumbbell Tricep Extensions',
          sets: 3,
          reps: 12,
          restTime: 90,
          instructions: 'Extend dumbbells overhead, focus on triceps',
          muscleGroups: ['triceps', 'shoulders']
        }
      ],
      duration: 35,
      difficulty: 'intermediate',
      category: 'dumbbell',
      description: 'Focused dumbbell upper body development'
    }
  ];
  
  return workouts;
};

export const calculateCaloriesBurned = (exercise: string, duration: number, weight: number): number => {
  const metValues: { [key: string]: number } = {
    'push-ups': 8,
    'squats': 8,
    'plank': 4,
    'jumping jacks': 8,
    'mountain climbers': 10,
    'running': 12,
    'walking': 4,
    'cycling': 8
  };
  
  const met = metValues[exercise.toLowerCase()] || 6;
  return Math.round((met * weight * duration) / 60);
};

export const calculateDailyCalorieNeeds = (user: User): number => {
  // Calculate BMR using Mifflin-St Jeor Equation
  const bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5; // For males (simplified)
  
  // Activity multipliers
  const activityMultipliers = {
    'sedentary': 1.2,
    'lightly_active': 1.375,
    'moderately_active': 1.55,
    'very_active': 1.725,
    'extremely_active': 1.9
  };
  
  const multiplier = activityMultipliers[user.activityLevel as keyof typeof activityMultipliers] || 1.2;
  let dailyCalories = bmr * multiplier;
  
  // Adjust based on fitness goal
  if (user.fitnessGoal === 'weight_loss') {
    dailyCalories -= 500; // 500 calorie deficit for 1lb/week loss
  } else if (user.fitnessGoal === 'muscle_gain') {
    dailyCalories += 300; // 300 calorie surplus for muscle gain
  }
  
  return Math.round(dailyCalories);
};

export const calculateMacroTargets = (user: User, dailyCalories: number) => {
  let proteinRatio = 0.25; // 25% default
  let carbRatio = 0.45; // 45% default
  let fatRatio = 0.30; // 30% default
  
  // Adjust macros based on fitness goal
  if (user.fitnessGoal === 'muscle_gain') {
    proteinRatio = 0.30; // Higher protein for muscle building
    carbRatio = 0.40;
    fatRatio = 0.30;
  } else if (user.fitnessGoal === 'weight_loss') {
    proteinRatio = 0.35; // Higher protein to preserve muscle
    carbRatio = 0.35;
    fatRatio = 0.30;
  } else if (user.fitnessGoal === 'endurance') {
    proteinRatio = 0.20;
    carbRatio = 0.55; // Higher carbs for endurance
    fatRatio = 0.25;
  }
  
  return {
    protein: Math.round((dailyCalories * proteinRatio) / 4), // 4 calories per gram
    carbs: Math.round((dailyCalories * carbRatio) / 4), // 4 calories per gram
    fat: Math.round((dailyCalories * fatRatio) / 9), // 9 calories per gram
    calories: dailyCalories
  };
};

export const generateMealPlan = (user: User): any => {
  const dailyCalories = calculateDailyCalorieNeeds(user);
  const macros = calculateMacroTargets(user, dailyCalories);
  
  // Sample meal database
  const mealDatabase = {
    breakfast: [
      {
        name: 'Oatmeal with Berries and Almonds',
        calories: 350,
        protein: 12,
        carbs: 55,
        fat: 8,
        ingredients: ['1 cup oats', '1/2 cup mixed berries', '1 tbsp almonds', '1 cup milk'],
        instructions: 'Cook oats with milk, top with berries and almonds'
      },
      {
        name: 'Greek Yogurt Parfait',
        calories: 280,
        protein: 20,
        carbs: 35,
        fat: 6,
        ingredients: ['1 cup Greek yogurt', '1/4 cup granola', '1/2 cup berries', '1 tsp honey'],
        instructions: 'Layer yogurt, granola, and berries. Drizzle with honey'
      },
      {
        name: 'Scrambled Eggs with Avocado Toast',
        calories: 420,
        protein: 18,
        carbs: 25,
        fat: 28,
        ingredients: ['2 eggs', '1 slice whole grain bread', '1/2 avocado', 'Salt, pepper'],
        instructions: 'Scramble eggs, toast bread, mash avocado on toast'
      }
    ],
    lunch: [
      {
        name: 'Grilled Chicken Salad',
        calories: 450,
        protein: 35,
        carbs: 20,
        fat: 25,
        ingredients: ['150g chicken breast', '2 cups mixed greens', '1/4 avocado', 'Olive oil dressing'],
        instructions: 'Grill chicken, serve over greens with avocado and dressing'
      },
      {
        name: 'Quinoa Buddha Bowl',
        calories: 520,
        protein: 18,
        carbs: 65,
        fat: 18,
        ingredients: ['1 cup quinoa', '1/2 cup chickpeas', 'Mixed vegetables', 'Tahini dressing'],
        instructions: 'Cook quinoa, roast vegetables, combine with chickpeas and dressing'
      },
      {
        name: 'Turkey and Hummus Wrap',
        calories: 380,
        protein: 25,
        carbs: 35,
        fat: 15,
        ingredients: ['Whole wheat tortilla', '100g turkey', '2 tbsp hummus', 'Vegetables'],
        instructions: 'Spread hummus on tortilla, add turkey and vegetables, wrap'
      }
    ],
    dinner: [
      {
        name: 'Baked Salmon with Sweet Potato',
        calories: 550,
        protein: 40,
        carbs: 45,
        fat: 22,
        ingredients: ['150g salmon fillet', '1 medium sweet potato', 'Steamed broccoli', 'Lemon'],
        instructions: 'Bake salmon and sweet potato, steam broccoli, serve with lemon'
      },
      {
        name: 'Lean Beef Stir-fry',
        calories: 480,
        protein: 32,
        carbs: 40,
        fat: 20,
        ingredients: ['120g lean beef', '1 cup brown rice', 'Mixed stir-fry vegetables', 'Soy sauce'],
        instructions: 'Stir-fry beef and vegetables, serve over brown rice'
      },
      {
        name: 'Vegetarian Lentil Curry',
        calories: 420,
        protein: 18,
        carbs: 60,
        fat: 12,
        ingredients: ['1 cup lentils', 'Coconut milk', 'Curry spices', 'Vegetables'],
        instructions: 'Cook lentils with coconut milk and spices, add vegetables'
      }
    ],
    snacks: [
      {
        name: 'Apple with Peanut Butter',
        calories: 190,
        protein: 8,
        carbs: 20,
        fat: 12,
        ingredients: ['1 medium apple', '1 tbsp peanut butter'],
        instructions: 'Slice apple, serve with peanut butter'
      },
      {
        name: 'Protein Smoothie',
        calories: 250,
        protein: 25,
        carbs: 20,
        fat: 8,
        ingredients: ['1 scoop protein powder', '1 banana', '1 cup almond milk', 'Ice'],
        instructions: 'Blend all ingredients until smooth'
      },
      {
        name: 'Mixed Nuts and Berries',
        calories: 180,
        protein: 6,
        carbs: 15,
        fat: 12,
        ingredients: ['1/4 cup mixed nuts', '1/2 cup berries'],
        instructions: 'Mix nuts and berries in a bowl'
      }
    ]
  };
  
  // Generate daily meal plan
  const generateDailyPlan = () => {
    const calorieDistribution = {
      breakfast: 0.25,
      lunch: 0.30,
      dinner: 0.35,
      snacks: 0.10
    };
    
    const plan = {
      breakfast: mealDatabase.breakfast[Math.floor(Math.random() * mealDatabase.breakfast.length)],
      lunch: mealDatabase.lunch[Math.floor(Math.random() * mealDatabase.lunch.length)],
      dinner: mealDatabase.dinner[Math.floor(Math.random() * mealDatabase.dinner.length)],
      snacks: [mealDatabase.snacks[Math.floor(Math.random() * mealDatabase.snacks.length)]]
    };
    
    return plan;
  };
  
  // Generate 7-day meal plan
  const weeklyPlan = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    weeklyPlan.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      meals: generateDailyPlan()
    });
  }
  
  return {
    weeklyPlan,
    dailyTargets: macros,
    recommendations: generateDietRecommendations(user, macros)
  };
};

export const generateDietRecommendations = (user: User, macros: any): string[] => {
  const recommendations: string[] = [];
  
  // Goal-based recommendations
  if (user.fitnessGoal === 'weight_loss') {
    recommendations.push('Focus on high-protein, low-calorie foods to maintain muscle while losing fat');
    recommendations.push('Include plenty of vegetables and fiber to help you feel full');
    recommendations.push('Consider intermittent fasting or smaller, frequent meals');
  } else if (user.fitnessGoal === 'muscle_gain') {
    recommendations.push('Eat protein within 30 minutes after your workout for optimal muscle recovery');
    recommendations.push('Include complex carbohydrates to fuel your workouts');
    recommendations.push('Don\'t skip meals - consistent nutrition is key for muscle growth');
  } else if (user.fitnessGoal === 'endurance') {
    recommendations.push('Prioritize carbohydrates for sustained energy during long workouts');
    recommendations.push('Stay well-hydrated, especially during intense training sessions');
    recommendations.push('Include antioxidant-rich foods to aid recovery');
  }
  
  // Activity level recommendations
  if (user.activityLevel === 'very_active' || user.activityLevel === 'extremely_active') {
    recommendations.push('Increase your calorie intake to match your high activity level');
    recommendations.push('Consider post-workout nutrition timing for optimal recovery');
  } else if (user.activityLevel === 'sedentary') {
    recommendations.push('Focus on nutrient-dense, lower-calorie foods');
    recommendations.push('Avoid processed foods and sugary drinks');
  }
  
  // General recommendations
  recommendations.push('Drink at least 8 glasses of water daily');
  recommendations.push('Include a variety of colorful fruits and vegetables');
  recommendations.push('Plan and prep your meals in advance for better adherence');
  
  return recommendations;
};