// import React, { useState } from 'react';
// import { Mail, Lock, User, Weight, Ruler, Target, Activity } from 'lucide-react';

// interface RegisterFormProps {
//   onRegister: (userData: any) => void;
//   onSwitchToLogin: () => void;
//   error?: string;
// }

// const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onSwitchToLogin, error }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     age: '',
//     weight: '',
//     height: '',
//     fitnessGoal: '',
//     activityLevel: '',
//     sex:''
//   });

  
   
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     onRegister({
//       ...formData,
//       age: parseInt(formData.age),
//       weight: parseFloat(formData.weight),
//       height: parseFloat(formData.height)
//     });
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center px-4 py-8">
//       <div className="max-w-2xl w-full space-y-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-white">Join AI Fitness Trainer</h2>
//           <p className="mt-2 text-blue-100">Create your personalized fitness journey</p>
//         </div>

//         <form className="space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => handleInputChange('name', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={(e) => handleInputChange('password', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Create a password"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Age</label>
//               <input
//                 type="number"
//                 required
//                 value={formData.age}
//                 onChange={(e) => handleInputChange('age', e.target.value)}
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your age"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Weight (kg)</label>
//               <div className="relative">
//                 <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="number"
//                   step="0.1"
//                   required
//                   value={formData.weight}
//                   onChange={(e) => handleInputChange('weight', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your weight"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Height (cm)</label>
//               <div className="relative">
//                 <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="number"
//                   required
//                   value={formData.height}
//                   onChange={(e) => handleInputChange('height', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your height"
//                 />
//               </div>
//             </div>


//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Fitness Goal</label>
//               <div className="relative">
//                 <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   required
//                   value={formData.fitnessGoal}
//                   onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select your goal</option>
//                   <option value="weight_loss">Weight Loss</option>
//                   <option value="muscle_gain">Muscle Gain</option>
//                   <option value="endurance">Improve Endurance</option>
//                   <option value="general_fitness">General Fitness</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Activity Level</label>
//               <div className="relative">
//                 <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   required
//                   value={formData.activityLevel}
//                   onChange={(e) => handleInputChange('activityLevel', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select activity level</option>
//                   <option value="sedentary">Sedentary</option>
//                   <option value="lightly_active">Lightly Active</option>
//                   <option value="moderately_active">Moderately Active</option>
//                   <option value="very_active">Very Active</option>
//                   <option value="extremely_active">Extremely Active</option>
//                 </select>
//               </div>
//             </div>
//              <div>
//               <label className="block text-sm font-medium text-white mb-2">Sex</label>
//               <div className="relative">
//                 {/* You can find a suitable icon from lucide-react if you wish */}
//                 <select
//                   required
//                   value={formData.sex}
//                   onChange={(e) => handleInputChange('sex', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option value="">Select your sex</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//           >
//             Create Account
//           </button>

//           <div className="text-center">
//             <span className="text-blue-100">Already have an account? </span>
//             <button
//               type="button"
//               onClick={onSwitchToLogin}
//               className="text-white font-semibold hover:text-blue-200 transition-colors"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;


// import React, { useState } from 'react';
// import { Mail, Lock, User, Weight, Ruler, Target, Activity } from 'lucide-react';

// interface RegisterFormProps {
//   onRegister: (userData: any) => void;
//   onSwitchToLogin: () => void;
//   error?: string;
// }

// const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onSwitchToLogin, error }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     age: '',
//     weight: '',
//     height: '',
//     fitnessGoal: '',
//     activityLevel: ''
//   });

//   const [formErrors, setFormErrors] = useState<{ name?: string; password?: string }>({});

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const errors: any = {};

//     // Full name validation: at least 2 words, letters only
//     const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
//     if (!nameRegex.test(formData.name)) {
//       errors.name = 'Enter your full name (first and last name).';
//     }

//     // Password validation: min 8 chars, uppercase, lowercase, number, special char
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(formData.password)) {
//       errors.password =
//         'Password must be at least 8 characters, include uppercase, lowercase, number & special character.';
//     }

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     setFormErrors({});

//     onRegister({
//       ...formData,
//       age: parseInt(formData.age),
//       weight: parseFloat(formData.weight),
//       height: parseFloat(formData.height)
//     });
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center px-4 py-8">
//       <div className="max-w-2xl w-full space-y-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-white">Join AI Fitness Trainer</h2>
//           <p className="mt-2 text-blue-100">Create your personalized fitness journey</p>
//         </div>

//         <form className="space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => handleInputChange('name', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={(e) => handleInputChange('password', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Create a password"
//                 />
//               </div>
//               {formErrors.password && <p className="text-red-400 text-sm mt-1">{formErrors.password}</p>}
//             </div>

//             {/* Age */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Age</label>
//               <input
//                 type="number"
//                 required
//                 value={formData.age}
//                 onChange={(e) => handleInputChange('age', e.target.value)}
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your age"
//               />
//             </div>

//             {/* Weight */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Weight (kg)</label>
//               <div className="relative">
//                 <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="number"
//                   step="0.1"
//                   required
//                   value={formData.weight}
//                   onChange={(e) => handleInputChange('weight', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your weight"
//                 />
//               </div>
//             </div>

//             {/* Height */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Height (cm)</label>
//               <div className="relative">
//                 <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="number"
//                   required
//                   value={formData.height}
//                   onChange={(e) => handleInputChange('height', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your height"
//                 />
//               </div>
//             </div>

//             {/* Fitness Goal */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Fitness Goal</label>
//               <div className="relative">
//                 <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   required
//                   value={formData.fitnessGoal}
//                   onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select your goal</option>
//                   <option value="weight_loss">Weight Loss</option>
//                   <option value="muscle_gain">Muscle Gain</option>
//                   <option value="endurance">Improve Endurance</option>
//                   <option value="general_fitness">General Fitness</option>
//                 </select>
//               </div>
//             </div>

//             {/* Activity Level */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">Activity Level</label>
//               <div className="relative">
//                 <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   required
//                   value={formData.activityLevel}
//                   onChange={(e) => handleInputChange('activityLevel', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select activity level</option>
//                   <option value="sedentary">Sedentary</option>
//                   <option value="lightly_active">Lightly Active</option>
//                   <option value="moderately_active">Moderately Active</option>
//                   <option value="very_active">Very Active</option>
//                   <option value="extremely_active">Extremely Active</option>
//                 </select>
//               </div>
//             </div>
           

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//           >
//             Create Account
//           </button>

//           <div className="text-center">
//             <span className="text-blue-100">Already have an account? </span>
//             <button
//               type="button"
//               onClick={onSwitchToLogin}
//               className="text-white font-semibold hover:text-blue-200 transition-colors"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import { Mail, Lock, User, Weight, Ruler, Target, Activity } from 'lucide-react';

interface RegisterFormProps {
  onRegister: (userData: any) => void;
  onSwitchToLogin: () => void;
  error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onSwitchToLogin, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    fitnessGoal: '',
    activityLevel: '',
    sex: ''
  });
  
  // New state to hold validation errors for each field
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // --- NEW VALIDATION LOGIC ---
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Full Name Validation
    if (formData.name.length < 3) {
      newErrors.name = 'Full name must be at least 3 characters long.';
    }

    // Password Validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else {
        if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password must contain an uppercase letter.';
        if (!/[a-z]/.test(formData.password)) newErrors.password = 'Password must contain a lowercase letter.';
        if (!/[0-9]/.test(formData.password)) newErrors.password = 'Password must contain a number.';
        if (!/[!@#$%^&*]/.test(formData.password)) newErrors.password = 'Password must contain a special character (!@#$%^&*).';
    }
    
    setFormErrors(newErrors);
    // The form is valid if the errors object is empty
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form before submitting
    if (validateForm()) {
      onRegister({
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height)
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Join AI Fitness Trainer</h2>
          <p className="mt-2 text-blue-100">Create your personalized fitness journey</p>
        </div>

        <form className="space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text" required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              {/* Display validation error for name */}
              {formErrors.name && <p className="text-red-300 text-xs mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email" required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password" required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
              </div>
              {/* Display validation error for password */}
              {formErrors.password && <p className="text-red-300 text-xs mt-1">{formErrors.password}</p>}
            </div>
            
            {/* ... Other form fields remain the same ... */}
            <div><label className="block text-sm font-medium text-white mb-2">Age</label><input type="number" required value={formData.age} onChange={(e) => handleInputChange('age', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="Enter your age"/></div>
            <div><label className="block text-sm font-medium text-white mb-2">Weight (kg)</label><div className="relative"><Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /><input type="number" step="0.1" required value={formData.weight} onChange={(e) => handleInputChange('weight', e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="Enter your weight"/></div></div>
            <div><label className="block text-sm font-medium text-white mb-2">Height (cm)</label><div className="relative"><Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /><input type="number" required value={formData.height} onChange={(e) => handleInputChange('height', e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="Enter your height"/></div></div>
            <div><label className="block text-sm font-medium text-white mb-2">Fitness Goal</label><div className="relative"><Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /><select required value={formData.fitnessGoal} onChange={(e) => handleInputChange('fitnessGoal', e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"><option value="">Select your goal</option><option value="weight_loss">Weight Loss</option><option value="muscle_gain">Muscle Gain</option><option value="endurance">Improve Endurance</option><option value="general_fitness">General Fitness</option></select></div></div>
            <div><label className="block text-sm font-medium text-white mb-2">Activity Level</label><div className="relative"><Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /><select required value={formData.activityLevel} onChange={(e) => handleInputChange('activityLevel', e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"><option value="">Select activity level</option><option value="sedentary">Sedentary</option><option value="lightly_active">Lightly Active</option><option value="moderately_active">Moderately Active</option><option value="very_active">Very Active</option><option value="extremely_active">Extremely Active</option></select></div></div>
            <div><label className="block text-sm font-medium text-white mb-2">Sex</label><div className="relative"><select required value={formData.sex} onChange={(e) => handleInputChange('sex', e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select your sex</option><option value="male">Male</option><option value="female">Female</option></select></div></div>

          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">Create Account</button>

          <div className="text-center">
            <span className="text-blue-100">Already have an account? </span>
            <button type="button" onClick={onSwitchToLogin} className="text-white font-semibold hover:text-blue-200">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

