export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  email: string;
  bio: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}
