import { Component, signal } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';

@Component({
  imports: [Sidebar, Dashboard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('AI Task Manager');
}