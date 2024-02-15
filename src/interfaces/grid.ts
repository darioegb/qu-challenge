import { Align } from 'src/types';

export interface Column<T> {
  name: keyof T;
  label: string;
  field: keyof T | ((row: T) => string);
  sortable?: boolean;
  align?: Align;
  required?: boolean;
  sort?: (a: string, b: string) => number;
  format?: (value: unknown) => string;
}

export interface PageConfig<T> {
  page: number;
  rowsPerPage: number;
  sortBy: keyof T | 'id';
  descending: boolean;
}

export interface RequestGrid<T> {
  pagination: PageConfig<T>;
  filter?: string;
}
