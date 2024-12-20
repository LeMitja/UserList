import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userForm: FormGroup;
  users: any[] = [];
phone: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', Validators.email], 
      phone: ['', [Validators.pattern('^[0-9]*$')]], 
    });

    this.getUsers();
  }

  // Fetch users from the backend
  getUsers(): void {
    this.http.get<any[]>('http://localhost:3000/api/users').subscribe((data) => {
      this.users = data;
    });
  }

  // Submit a new user to the backend
  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.http.post('http://localhost:3000/api/users', userData).subscribe(() => {
        this.getUsers();
        this.userForm.reset(); // Reset form after submission
      });
    }
  }

  // Delete a user by ID
  deleteUser(userId: number): void {
    this.http.delete(`http://localhost:3000/api/users/${userId}`).subscribe(() => {
      this.getUsers();
    });
  }

  // Form field getters
  get name() {
    return this.userForm.get('name');
  }
  get gender() {
    return this.userForm.get('gender');
  }

  onCancel(): void {
    this.userForm.reset({
      name: '',
      gender: '',
      email: '',
      phone: '',
    });
  }
  
}
