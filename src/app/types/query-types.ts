export type ObjectAny = {
  [name: string]: any;
}

export type Option = {
  label?: string;
  value?: string;
  alias?: string;
}

export type EntityPagination<T> = {
  [name: string]: any;
  rows: T[];
  currentRow?: T | null;
  currentRowId?: string | null;
  limit?: number;
  page?: number;
  total?: number;
  search?: string | null;
  debounce?: number;
  isGet?: boolean;
  loading: boolean;
  loadingGetRow?: boolean;
  timeout?: any;
  after?: string | null;
  query?: any;
  sort?: any;
}

export type QueryMen = {
  limit?: number;
  page?: number;
  before?: Date;
  after?: Date;
  q?: string;
}

export type Pagination = {
  total: number;
  page: number;
  limit: number;
}

export type BackendError = {
  messages?: string[];
  silent?: boolean;
}

export type GetResult<T> = {
  entity: T;
}

export type EntityResult<T> = {
  status: number;
  statusText: string;
  subStatus: number;
  subStatusText: string;
  message: string;
  refToken?: string;
  total: number;
  data: T;
  viewer?: any;
}

export type GetAllResult<T> = {
  entity: Array<T>;
}

export type QueryResult<T> = {
  entity: EntityResult<T>;
}

export type Image = {
  url?: string;
  urls?: string[];
  loading?: boolean;
}

