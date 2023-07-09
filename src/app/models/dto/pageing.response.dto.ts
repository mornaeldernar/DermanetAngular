export interface PageingResponseDto<T> {
  content:T[];
  last:boolean;
  totalElements:number;
  totalPages:number;
  size:1;
  number:number;
  first:boolean;
  numberOfElements:number;
  empty:boolean
}
