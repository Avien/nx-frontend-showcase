import { Component, Input } from '@angular/core';
import { User } from '@nx-frontend-showcase/users/model';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  standalone: true,
})
export class UserDetailsComponent {
  @Input() user: Partial<User> | null = null;
}
