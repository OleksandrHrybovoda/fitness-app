import { User } from 'firebase/auth';
import { Meal } from '../core/models/meal.model';

export interface AppStateInterface {
  user: { user: User | null };
  meals: { meals: Meal[] | undefined };
}
