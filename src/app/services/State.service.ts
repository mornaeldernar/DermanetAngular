import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface AppState {
  loading: boolean;
  user: any | null;
  notifications: Notification[];
}
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state: BehaviorSubject<AppState> = new BehaviorSubject<AppState>({
    loading: false,
    user: null,
    notifications: []
  });

  public state$: Observable<AppState> = this.state.asObservable();

  setLoading(loading: boolean): void {
    this.state.next({...this.state.getValue(), loading});
  }
  setUser(user: any | null): void {
    this.state.next({...this.state.getValue(), user});
  }
  addNotification(message: string, type: Notification['type']): void {
    const notification : Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };

    const notifications = [...this.state.value.notifications, notification];
    this.state.next({...this.state.value, notifications});

    setTimeout(() => this.removeNotification(notification.id), 5000);
  }
  removeNotification(id: string): void {
    const notifications = this.state.value.notifications.filter(n => n.id !== id);
    this.state.next({...this.state.value, notifications});
  }
}
