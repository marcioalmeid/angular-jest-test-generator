// Exemplo de componente Angular 17 com Signals e Standalone
import { Component, signal, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-profile">
      @if (user()) {
        <h2>{{ user()?.name }}</h2>
        <p>{{ user()?.email }}</p>
        <p>Visits: {{ visitCount() }}</p>
        <p>Status: {{ userStatus() }}</p>
        <button (click)="incrementVisits()">Visit</button>
        
        @if (showDetails()) {
          <div class="details">
            <h3>Recent Activity</h3>
            @for (activity of recentActivities(); track activity.id) {
              <div class="activity">{{ activity.title }}</div>
            } @empty {
              <p>No recent activities</p>
            }
          </div>
        }
      } @else {
        <p>Loading user...</p>
      }
    </div>
  `
})
export class UserProfileComponent {
  // Input com signals (Angular 17)
  userId = input.required<number>();
  showDetails = input<boolean>(false);
  
  // Output com signals (Angular 17)
  userLoaded = output<User>();
  visitIncremented = output<number>();
  
  // Signals
  user = signal<User | null>(null);
  visitCount = signal(0);
  recentActivities = signal<Array<{ id: number; title: string }>>([]);
  
  // Computed signals
  userStatus = computed(() => {
    const count = this.visitCount();
    if (count === 0) return 'New';
    if (count < 5) return 'Regular';
    return 'Frequent';
  });
  
  isActive = computed(() => this.user() !== null);
  
  // Constructor com inject (Angular 17)
  constructor() {
    // Simula carregamento de dados
    this.loadUser();
  }
  
  private loadUser(): void {
    // Simula chamada API
    setTimeout(() => {
      const userData: User = {
        id: this.userId(),
        name: 'John Doe',
        email: 'john@example.com'
      };
      
      this.user.set(userData);
      this.userLoaded.emit(userData);
      
      // Carrega atividades
      this.recentActivities.set([
        { id: 1, title: 'Logged in' },
        { id: 2, title: 'Updated profile' },
        { id: 3, title: 'Added friend' }
      ]);
    }, 100);
  }
  
  incrementVisits(): void {
    this.visitCount.update(count => count + 1);
    this.visitIncremented.emit(this.visitCount());
  }
  
  resetVisits(): void {
    this.visitCount.set(0);
  }
  
  updateUser(updates: Partial<User>): void {
    const currentUser = this.user();
    if (currentUser) {
      this.user.set({ ...currentUser, ...updates });
    }
  }
  
  addActivity(title: string): void {
    const newActivity = {
      id: this.recentActivities().length + 1,
      title
    };
    this.recentActivities.update(activities => [...activities, newActivity]);
  }
  
  clearActivities(): void {
    this.recentActivities.set([]);
  }
}

