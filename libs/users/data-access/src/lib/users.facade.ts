import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  EMPTY,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Pagination, User } from '@nx-frontend-showcase/users/model';

type UsersCacheEntry = {
  items: User[];
  total: number;
  page: number;
};

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private users = signal<User[]>([]);
  private selectedUserDetails = signal<User | null>(null);
  private usersLoading = signal(false);
  private detailsLoading = signal(false);
  private error = signal('');

  private pagination = signal<Pagination>({ page: 1, pageSize: 50, total: 0 });
  private currentQuery = signal('');

  canLoadMore = computed(
    () =>
      this.users().length > 0 &&
      this.pagination().total > this.users().length &&
      !this.usersLoading(),
  );

  usersCache = new Map<string, UsersCacheEntry>();

  vm = computed(() => ({
    users: this.users(),
    selectedUserDetails: this.selectedUserDetails(),
    usersLoading: this.usersLoading(),
    detailsLoading: this.detailsLoading(),
    error: this.error(),
    pagination: this.pagination(),
    canLoadMore: this.canLoadMore(),
    currentQuery: this.currentQuery(),
  }));

  private search$ = new Subject<string>();
  private loadMore$ = new Subject<void>();
  private select$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.initSearch();
    this.initPagination();
    this.initSelection();
    this.search('');
  }

  search(q: string) {
    this.search$.next(q ?? '');
  }

  loadMore() {
    this.loadMore$.next();
  }

  select(id: string) {
    this.error.set('');
    this.select$.next(id);
  }

  private initSearch() {
    this.search$
      .pipe(
        debounceTime(200),
        map((v) => v.trim()),
        distinctUntilChanged(),
        filter((v) => v.length >= 2 || v.length === 0),
        switchMap((q) => {
          this.currentQuery.set(q);
          this.usersLoading.set(true);
          this.selectedUserDetails.set(null);
          this.error.set('');

          const cached = this.usersCache.get(q);
          if (cached) {
            return of(cached).pipe(finalize(() => this.usersLoading.set(false)));
          }

          const params = new HttpParams()
            .set('q', q)
            .set('page', '1')
            .set('pageSize', this.pagination().pageSize.toString());

          return this.http
            .get<{ items: User[]; page: number; total: number }>('http://localhost:3001/api/users', { params })
            .pipe(finalize(() => this.usersLoading.set(false)));
        }),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (r) => {
          this.users.set(r.items);
          this.pagination.set({
            page: r.page,
            pageSize: this.pagination().pageSize,
            total: r.total,
          });

          this.usersCache.set(this.currentQuery(), {
            items: r.items,
            page: r.page,
            total: r.total,
          });
        },
        error: (err) => this.error.set(err.message),
      });
  }

  private initPagination() {
    this.loadMore$
      .pipe(
        filter(() => this.canLoadMore()),
        switchMap(() => {
          const q = this.currentQuery();
          const cached = this.usersCache.get(q)!;
          const nextPage = cached.page + 1;

          this.usersLoading.set(true);

          const params = new HttpParams()
            .set('q', q)
            .set('page', nextPage.toString())
            .set('pageSize', this.pagination().pageSize.toString());

          return this.http
            .get<{ items: User[]; page: number; total: number }>('http://localhost:3001/api/users', { params })
            .pipe(
              map((r) => ({ r, q })),
              finalize(() => this.usersLoading.set(false)),
            );
        }),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: ({ r, q }) => {
          if (this.currentQuery() !== q) return;

          const prev = this.usersCache.get(q)!;
          const merged = [...prev.items, ...r.items];

          this.users.set(merged);
          this.pagination.set({
            page: r.page,
            pageSize: this.pagination().pageSize,
            total: r.total,
          });

          this.usersCache.set(q, {
            items: merged,
            page: r.page,
            total: r.total,
          });
        },
        error: (err) => this.error.set(err.message),
      });
  }

  private initSelection() {
    this.select$
      .pipe(
        switchMap((id) => {
          this.detailsLoading.set(true);
          return this.http.get<User>(`http://localhost:3001/api/users/${id}`).pipe(
            catchError((err) => {
              this.error.set(err.message ?? 'Failed to load user details');
              return EMPTY;
            }),
            finalize(() => this.detailsLoading.set(false)),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (r) => this.selectedUserDetails.set(r),
        error: (err) => {
          this.error.set(err.message);
        },
      });
  }
}
