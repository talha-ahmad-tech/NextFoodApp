export type DEFAULT_ACTION_TYPE = {
  payload: any;
  type: string;
};

export interface PaginatedResponse<T> {
  page: number;
  perPage: number;
  total: number;
  data: T[];
}

export type PaginatedRequest = {
  page?: number;
  query: string;
};

export type User = {
  id: string;
  name: string;
  role: string;
};

export type PERMISSIONS_PARAMS = {
  providerKey: string;
  providerName: string;
};
