import { InvalidPropertyError } from './error.helper';

interface PaginationOptions {
  page?: number;
  limit?: number;
  skipPagination?: string;
  [key: string]: any;
}

const generatePagination = ({
  page = 0,
  limit = 10,
  skipPagination = 'false',
  ...query
}: PaginationOptions = {}) => {
  let pagination: PaginationOptions = { ...query };
  let offset = 0;

  if (isNaN(page) || parseInt(page.toString(), 10) < 0) {
    throw new InvalidPropertyError('Invalid pagination');
  }

  if (isNaN(limit) || parseInt(limit.toString(), 10) < 0) {
    throw new InvalidPropertyError('Invalid limit');
  }

  if (skipPagination === 'false') {
    console.log(pagination, limit, page, 'payl');
    page = parseInt(page.toString(), 10);
    limit = parseInt(limit.toString(), 10);

    page = page ? page - 1 : 0;
    page = page < 0 ? 0 : Math.abs(page);
    limit = Math.abs(limit) > 0 ? Math.abs(limit) : 10;
    offset = page * limit;
    pagination.limit = limit;
    pagination.offset = Math.abs(offset) > 0 ? Math.abs(offset) : 0;
    console.log(pagination, limit, page, 'payl 3');
  }

  return pagination;
};

export default generatePagination;
