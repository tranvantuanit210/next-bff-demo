export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type SuccessResponse<Data> = {
  message: string;
  data: Data;
};
