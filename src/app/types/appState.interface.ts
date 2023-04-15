import { User } from 'firebase/auth';
import { Meal } from '../core/models/meal.model';
import { Workout } from '../core/models/workout.model';
import { ScheduleItem } from '../core/models/schedule.model';

export interface AppStateInterface {
  user: { user: User | null };
  meals: { meals: Meal[] | undefined };
  workouts: { workouts: Workout[] | undefined };
  scheduleState: {
    date: Date | undefined;
    schedule: ScheduleItem[] | undefined;
    selected: any;
    list: any;
  };
}
