
// Helper function to calculate the angle between three landmark points
function calculateAngle(a: any, b: any, c: any): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
}

// Helper function to calculate the distance between two points
function calculateDistance(a: any, b: any): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}


// A base class to manage the state and logic for counting different exercises
export abstract class ExerciseCounter {
    public reps = 0;
    public feedback = 'Start your exercise!';
    protected state: 'up' | 'down' | 'start' | 'end' | 'out' | 'in' = 'up';

    abstract calculate(landmarks: any): void;
}


// --- 1. Squat Counter ---
export class SquatCounter extends ExerciseCounter {
  calculate(landmarks: any) {
    if (!landmarks) {
      this.feedback = "No person detected";
      return;
    }
    try {
      const hip = landmarks[23]; // Left Hip
      const knee = landmarks[25]; // Left Knee
      const ankle = landmarks[27]; // Left Ankle
      const angle = calculateAngle(hip, knee, ankle);

      if (angle > 160) { // User is standing up
        if (this.state === 'down') {
          this.reps += 1;
          this.feedback = "Great Rep!";
        }
        this.state = 'up';
      } else if (angle < 90) { // User is in squat position
        if (this.state === 'up') {
          this.feedback = "Down...";
        }
        this.state = 'down';
      }
      
      if (this.state === 'down' && angle > 100) {
        this.feedback = "Go a little lower!";
      }
    } catch (error) {
      this.feedback = "Make sure your full body is visible.";
    }
  }
}

// --- 2. Push-up Counter ---
export class PushupCounter extends ExerciseCounter {
  calculate(landmarks: any) {
    if (!landmarks) {
      this.feedback = "No person detected";
      return;
    }
    try {
      const shoulder = landmarks[11]; // Left Shoulder
      const elbow = landmarks[13]; // Left Elbow
      const wrist = landmarks[15]; // Left Wrist
      const angle = calculateAngle(shoulder, elbow, wrist);

      if (angle > 160) { // Arms are straight
        if (this.state === 'down') {
          this.reps += 1;
          this.feedback = "Up!";
        }
        this.state = 'up';
      } else if (angle < 90) { // Arms are bent
        if (this.state === 'up') {
          this.feedback = "Down...";
        }
        this.state = 'down';
      }
    } catch (error) {
      this.feedback = "Make sure your upper body is visible.";
    }
  }
}

// --- 3. Bicep Curl Counter ---
export class BicepCurlCounter extends ExerciseCounter {
  constructor() {
    super();
    this.state = 'down'; // Start with arm extended
  }

  calculate(landmarks: any) {
    if (!landmarks) { return; }
    try {
      const shoulder = landmarks[12]; // Right Shoulder
      const elbow = landmarks[14]; // Right Elbow
      const wrist = landmarks[16]; // Right Wrist
      const angle = calculateAngle(shoulder, elbow, wrist);

      if (angle < 45) { // Arm is curled up
        if (this.state === 'down') {
          this.reps += 1;
          this.feedback = "Curl Up!";
        }
        this.state = 'up';
      } else if (angle > 140) { // Arm is extended down
        if (this.state === 'up') {
          this.feedback = "Extend Down...";
        }
        this.state = 'down';
      }
    } catch (error) {
      this.feedback = "Position your right side to the camera.";
    }
  }
}

// --- 4. Lunge Counter ---
export class LungeCounter extends ExerciseCounter {
  calculate(landmarks: any) {
    if (!landmarks) { return; }
    try {
      const hip = landmarks[24]; // Right Hip
      const knee = landmarks[26]; // Right Knee
      const ankle = landmarks[28]; // Right Ankle
      const angle = calculateAngle(hip, knee, ankle);

      if (angle > 160) { // Standing position
        if (this.state === 'down') {
          this.reps += 1;
          this.feedback = "Good Lunge!";
        }
        this.state = 'up';
      } else if (angle < 100) { // Lunge position
        if (this.state === 'up') {
            this.feedback = "Step Forward...";
        }
        this.state = 'down';
      }
    } catch (error) {
      this.feedback = "Make sure your full body is visible.";
    }
  }
}

// --- 5. Jumping Jack Counter ---
export class JumpingJackCounter extends ExerciseCounter {
    constructor() {
        super();
        this.state = 'in'; // Start with feet together
    }

    calculate(landmarks: any) {
        if (!landmarks) { return; }
        try {
            const leftHand = landmarks[19];
            const rightHand = landmarks[20];
            const leftShoulder = landmarks[11];
            const rightShoulder = landmarks[12];
            const leftAnkle = landmarks[27];
            const rightAnkle = landmarks[28];
            
            const handsUp = leftHand.y < leftShoulder.y && rightHand.y < rightShoulder.y;
            const feetApart = calculateDistance(leftAnkle, rightAnkle) > calculateDistance(leftShoulder, rightShoulder);

            if (handsUp && feetApart) { // "Out" position
                if (this.state === 'in') {
                    this.feedback = "Out!";
                }
                this.state = 'out';
            } else if (!handsUp && !feetApart) { // "In" position
                if (this.state === 'out') {
                    this.reps += 1;
                    this.feedback = "In!";
                }
                this.state = 'in';
            }
        } catch (error) {
            this.feedback = "Make sure your full body is visible.";
        }
    }
}

// // --- 6. Plank Validator ---
// // This class doesn't count reps, but validates form
// export class PlankValidator {
//     public feedback = 'Hold a straight line!';
//     public timer = 0;
//     private intervalId: number | null = null;

//     startTimer() {
//         if (!this.intervalId) {
//             this.intervalId = window.setInterval(() => {
//                 this.timer += 1;
//             }, 1000);
//         }
//     }

//     stopTimer() {
//         if (this.intervalId) {
//             clearInterval(this.intervalId);
//             this.intervalId = null;
//         }
//     }

//     calculate(landmarks: any) {
//         if (!landmarks) { return; }
//         try {
//             const shoulder = landmarks[11];
//             const hip = landmarks[23];
//             const ankle = landmarks[27];

//             const angle = calculateAngle(shoulder, hip, ankle);

//             if (angle > 160 && angle < 190) { // A good range for a straight body
//                 this.feedback = "Excellent Form!";
//                 this.startTimer();
//             } else if (angle < 160) {
//                 this.feedback = "Lift your hips!";
//                 this.stopTimer();
//             } else {
//                 this.feedback = "Lower your hips!";
//                 this.stopTimer();
//             }
//         } catch (error) {
//             this.feedback = "Position your left side to the camera.";
//             this.stopTimer();
//         }
//     }
// }

// --- 6. Plank Validator (Corrected with Timer) ---
export class PlankValidator {
    public feedback = 'Hold a straight line!';
    public timer = 0;
    private timerInterval: number | null = null;
    private isTimerRunning = false;

    private startTimer() {
        if (!this.isTimerRunning) {
            this.isTimerRunning = true;
            this.timerInterval = window.setInterval(() => {
                this.timer += 1;
            }, 1000);
        }
    }

    public stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.isTimerRunning = false;
        }
    }

    calculate(landmarks: any) {
        if (!landmarks) { return; }
        try {
            const shoulder = landmarks[11];
            const hip = landmarks[23];
            const ankle = landmarks[27];

            const angle = calculateAngle(shoulder, hip, ankle);

            // A good range for a straight body
            if (angle > 160 && angle < 190) {
                this.feedback = "Excellent Form! Holding...";
                this.startTimer();
            } else if (angle < 160) {
                this.feedback = "Lift your hips!";
                this.stopTimer();
            } else {
                this.feedback = "Lower your hips!";
                this.stopTimer();
            }
        } catch (error) {
            this.feedback = "Position your left side to the camera.";
            this.stopTimer();
        }
    }
}

