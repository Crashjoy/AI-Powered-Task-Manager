import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';


@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  protected readonly tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Finish resume',
      description: 'Finalize the master software developer resume',
      completed: false,
      priority: 'high',
      dueDate: '2026-10-20',
    },
    {
      id: 2,
      title: 'Review Angular fundamentals',
      description: 'Practice components, templates, and signals',
      completed: false,
      priority: 'medium',
      dueDate: '2026-10-22',
    },
    {
      id: 3,
      title: 'Set up GitHub README',
      description: 'Document the project architecture and setup',
      completed: true,
      priority: 'low',
      dueDate: '2026-10-25',
    },
  ]);

  protected toggleTask(taskId: number): void {
    this.tasks.update((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  protected newTask = {
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    dueDate: '',
  };

  protected addTask(): void {
    const title = this.newTask.title.trim();

    if (!title) {
      return;
    }

    const task: Task = {
      id: Date.now(),
      title,
      description: this.newTask.description.trim(),
      completed: false,
      priority: this.newTask.priority,
      dueDate: this.newTask.dueDate,
    };

    this.tasks.update((currentTasks) => [...currentTasks, task]);

    this.newTask = {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
    };
  }

  protected deleteTask(taskId: number): void {
    this.tasks.update((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }


  protected readonly activeFilter = signal<
    'all' | 'pending' | 'completed'
  >('all');
  
  protected readonly filteredTasks = computed(() => {
    const filter = this.activeFilter();
    
    return this.tasks().filter((task) => {
      if (filter === 'pending') {
        return !task.completed;
      }
    
      if (filter === 'completed') {
        return task.completed;
      }
    
      return true;
    });
  });
  
  protected readonly totalCount = computed(
    () => this.tasks().length
  );
  
  protected readonly pendingCount = computed(
    () => this.tasks().filter((task) => !task.completed).length
  );
  
  protected readonly completedCount = computed(
    () => this.tasks().filter((task) => task.completed).length
  );

}
