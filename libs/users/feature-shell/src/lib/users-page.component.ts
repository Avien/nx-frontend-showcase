import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { UsersFacade } from '../../../data-access/src/lib/users.facade';
import { UserDetailsComponent } from '../../../ui/src/lib/user-details.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    ReactiveFormsModule,
    UserDetailsComponent,
  ],
  selector: 'app-users',
  template: `
    <h3>Users (virtual)</h3>
    <input placeholder="Search..." [formControl]="searchControl" />

    @if (facade.vm(); as vm) {
      <div class="flex-container">
        <div style="padding: 8px; border-right: 1px solid #ddd">
          @if (vm.users.length > 0) {
            <cdk-virtual-scroll-viewport
              itemSize="28"
              style="height: 600px; width: 450px; flex-shrink: 0"
            >
              <div *cdkVirtualFor="let user of vm.users; trackBy: trackById">
                <div (click)="facade.select(user.id)" style="cursor: pointer">
                  <img [src]="user.avatarUrl" width="24" height="24" />
                  <b>{{ user.name }}</b> — {{ user.role }}
                </div>
              </div>
            </cdk-virtual-scroll-viewport>
          }

          @if (vm.usersLoading) {
            <div style="height: 600px; width: 450px;">Loading...</div>
          }

          <div style="margin:10px">
            <button [disabled]="!vm.canLoadMore" (click)="facade.loadMore()">
              Load More
            </button>
            <div>
              {{ vm.users.length }} users of total {{ vm.pagination.total }}
            </div>
          </div>
        </div>

        @if (vm.selectedUserDetails) {
          @if (vm.error) {
            <div style="color: red">{{ vm.error }}</div>
          } @else {
            <div>
              @if (vm.detailsLoading) {
                <div>Fetching user details...</div>
              } @else {
                <app-user-details
                  [user]="vm.selectedUserDetails"
                ></app-user-details>
              }
            </div>
          }
        } @else {
          <div>Select a user to see details.</div>
        }
      </div>
    }
  `,
  styles: [
    `
      .flex-container {
        display: flex;
        gap: 16px;
        align-items: stretch;
      }
    `,
  ],
})
export class UsersPageComponent {
  constructor(public facade: UsersFacade) {
    this.searchControl.valueChanges.subscribe((v) =>
      this.facade.search(v ?? ''),
    );

    this.searchControl.setValue('');
  }

  searchControl = new FormControl('');
  trackById = (_: number, u: any) => u.id;
}
