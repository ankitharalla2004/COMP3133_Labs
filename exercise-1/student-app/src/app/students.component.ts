import { Component } from '@angular/core';

@Component({
  selector: 'students',
  standalone: true,
  template: `
    <h1>Student View</h1>
    <h2>Students</h2>
    <h2>{{  getTitle()  }} - {{ getCurrentDate() }}</h2>
  `
})
export class StudentsComponent {
  title = "My List of Students";

  getTitle(){
    return this.title;
  }
  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}
