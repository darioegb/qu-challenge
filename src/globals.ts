import { PageConfig } from 'src/interfaces';

export const ROWS_PER_PAGE_CONFIG = [5, 10, 15, 20, 30, 50, 100, 0];
export const DEFAULT_PAGE_CONFIG: PageConfig<unknown> = {
  page: 1,
  rowsPerPage: 10,
  sortBy: 'id',
  descending: false,
};
