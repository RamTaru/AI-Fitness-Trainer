import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, CameraOff, Play, Pause, RotateCcw } from 'lucide-react';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera as MediapipeCamera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { apiClient } from '../../utils/api';
// Import all the new exercise counter classes
import { 
    ExerciseCounter,
    SquatCounter, 
    PushupCounter,
    BicepCurlCounter,
    LungeCounter,
    JumpingJackCounter,
    PlankValidator
} from '../../utils/poseUtils';

const VirtualTrainer: React.FC<any> = ({ user }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [feedback, setFeedback] = useState<string>('Ready to start!');
  const [currentExercise, setCurrentExercise] = useState('squats');
  const [repCount, setRepCount] = useState(0);
  const [plankTime, setPlankTime] = useState(0); // State for the plank timer
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // This ref will now hold any type of exercise processor (counter or validator)
  const exerciseProcessorRef = useRef<ExerciseCounter | PlankValidator | null>(null);
  const poseRef = useRef<Pose | null>(null);
  const cameraRef = useRef<MediapipeCamera | null>(null);

  // Expanded list of exercises that the trainer can now track
  const exercises = [
    { id: 'squats', name: 'Squats', instructions: 'Keep your chest up and back straight.' },
    { id: 'pushups', name: 'Push-ups', instructions: 'Keep your body in a straight line.' },
    { id: 'bicep_curls', name: 'Bicep Curls', instructions: 'Keep your elbows fixed at your sides.' },
    { id: 'lunges', name: 'Lunges', instructions: 'Step forward and lower until both knees are bent at a 90-degree angle.' },
    { id: 'jumping_jacks', name: 'Jumping Jacks', instructions: 'Jump your feet out wide while circling your arms up.' },
    { id: 'plank', name: 'Plank', instructions: 'Hold a straight line from head to heels.' },
  ];

  // Core function called for every camera frame
  const onPoseResults = useCallback((results: any) => {
    if (!canvasRef.current) return;
    const canvasCtx = canvasRef.current.getContext('2d')!;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
      drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });
      
      if (isWorkoutActive && exerciseProcessorRef.current) {
        // Process landmarks with the current exercise logic
        exerciseProcessorRef.current.calculate(results.poseLandmarks);
        
        // Update state based on the type of processor
        if (exerciseProcessorRef.current instanceof PlankValidator) {
            setPlankTime(exerciseProcessorRef.current.timer);
        } else {
            setRepCount((exerciseProcessorRef.current as ExerciseCounter).reps);
        }
        setFeedback(exerciseProcessorRef.current.feedback);
      }
    }
    canvasCtx.restore();
  }, [isWorkoutActive]);

  // Initialize MediaPipe once
  useEffect(() => {
    const pose = new Pose({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
    pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
    pose.onResults(onPoseResults);
    poseRef.current = pose;
  }, [onPoseResults]);

  // Start the camera and link it to MediaPipe
  const startCamera = async () => {
    if (videoRef.current) {
      cameraRef.current = new MediapipeCamera(videoRef.current, {
        onFrame: async () => { if (videoRef.current) { await poseRef.current!.send({ image: videoRef.current }); } },
        width: 640, height: 480
      });
      cameraRef.current.start();
      setIsCameraActive(true);
    }
  };

  const stopCamera = () => {
    if (cameraRef.current) cameraRef.current.stop();
    setIsCameraActive(false);
    setIsWorkoutActive(false);
  };

  // UPDATED: This now selects the correct counter for the chosen exercise
  const startWorkout = () => {
    setRepCount(0);
    setPlankTime(0);

    switch (currentExercise) {
        case 'squats': exerciseProcessorRef.current = new SquatCounter(); break;
        case 'pushups': exerciseProcessorRef.current = new PushupCounter(); break;
        case 'bicep_curls': exerciseProcessorRef.current = new BicepCurlCounter(); break;
        case 'lunges': exerciseProcessorRef.current = new LungeCounter(); break;
        case 'jumping_jacks': exerciseProcessorRef.current = new JumpingJackCounter(); break;
        case 'plank': exerciseProcessorRef.current = new PlankValidator(); break;
        default: alert("This exercise is not yet supported by the Virtual Trainer."); return;
    }

    setFeedback(`Workout started: ${exercises.find(e => e.id === currentExercise)?.name}`);
    setIsWorkoutActive(true);
  };

  // UPDATED: This now handles saving both reps and time-based exercises
  const stopWorkout = () => {
    if (isWorkoutActive) {
      setIsWorkoutActive(false);
      const exerciseName = exercises.find(e => e.id === currentExercise)?.name || 'Unknown';
      let repsToLog = repCount;

      if (exerciseProcessorRef.current instanceof PlankValidator) {
        (exerciseProcessorRef.current as PlankValidator).stopTimer();
        repsToLog = plankTime; // We log the seconds held as "reps"
        setFeedback(`Plank held for ${plankTime} seconds! Session saved.`);
      } else {
        setFeedback(`Workout saved! You completed ${repCount} reps.`);
      }

      if (repsToLog > 0) {
        apiClient.post('/logbook/exercise/', {
          exercise_name: exerciseName,
          reps_completed: repsToLog
        }).catch(err => console.error("Failed to save workout session", err));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Virtual Trainer</h1>
        <div>
          {!isCameraActive ? ( <button onClick={startCamera} className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"><Camera className="w-4 h-4" /><span>Start Camera</span></button>) : 
          ( <button onClick={stopCamera} className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"><CameraOff className="w-4 h-4" /><span>Stop Camera</span></button> )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Camera Feed</h3>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-[4/3]">
            <video ref={videoRef} className="w-full h-full object-cover hidden" />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" width="640px" height="480px" />
            {!isCameraActive && (<div className="absolute inset-0 flex items-center justify-center text-center text-white"><Camera className="w-16 h-16 mx-auto mb-4 opacity-50" /><p>Camera not active</p></div>)}
          </div>
          {isCameraActive && (
            <div className="flex justify-center space-x-4 mt-4">
              {!isWorkoutActive ? (
                <button onClick={startWorkout} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"><Play className="w-5 h-5" /><span>Start Workout</span></button>
              ) : (
                <button onClick={stopWorkout} className="flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"><Pause className="w-5 h-5" /><span>Stop & Save</span></button>
              )}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Exercise</h3>
            <div className="space-y-2">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => setCurrentExercise(exercise.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentExercise === exercise.id
                      ? 'bg-blue-100 border-blue-500 border-2'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="font-medium text-gray-800">{exercise.name}</div>
                  {/* --- THIS LINE IS NEW --- */}
                  <div className="text-sm text-gray-600 mt-1">{exercise.instructions}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-600">Exercise:</span><span className="font-medium">{exercises.find(e => e.id === currentExercise)?.name}</span></div>
              <div className="flex justify-between items-baseline"><span className="text-gray-600">{currentExercise === 'plank' ? 'Time:' : 'Reps:'}</span><span className="font-medium text-2xl text-blue-600">{currentExercise === 'plank' ? `${plankTime}s` : repCount}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Feedback:</span><span className="font-medium text-right text-sm">{feedback}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTrainer;
