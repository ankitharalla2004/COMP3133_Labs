import { Component } from '@angular/core';
import { StudentsComponent } from './students.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentsComponent], 
  template: `<students></students>` 
})
export class AppComponent {}
