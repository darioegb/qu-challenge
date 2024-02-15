import { RequestGrid, ServerPaginationConfig } from 'src/interfaces';

export const createHttpParams = <T>(
  requestGrid: RequestGrid<T>,
): ServerPaginationConfig => {
  let params: ServerPaginationConfig = {};
  const {
    pagination: { page },
    filter,
  } = requestGrid;
  params = {
    page,
  };

  if (filter && filter.length > 0) {
    params.search = filter;
  }

  return params;
};
