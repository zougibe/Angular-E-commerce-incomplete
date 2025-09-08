import { Component, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  ngOnInit(): void {
    initFlowbite();
  }
  protected readonly title = signal('Routing');
}
