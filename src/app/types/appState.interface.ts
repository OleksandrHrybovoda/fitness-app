import { User } from 'firebase/auth';

export interface AppStateInterface {
  user: { user: User | null };
}
