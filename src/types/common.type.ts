export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type SuccessResponse<Data> = {
  message: string;
  data: Data;
};
export type SuccessResponseFromBE<Data> = {
  total: number;
  items: Data;
};

export type Pagination = {
  page: number;
  pageSize: number;
};
