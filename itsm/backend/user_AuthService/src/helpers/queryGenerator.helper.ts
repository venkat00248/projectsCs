import { Op } from 'sequelize';

interface Query {
  [key: string]: any;
}

interface QueryGeneratorOptions {
  query?: Query;
  queryAbleFields?: string[];
}

const queryGenerator = ({
  query = {},
  queryAbleFields = [],
}: QueryGeneratorOptions): Query => {
  const paginationQuery: string[] = ['limit', 'offset'];
  const sqlQuery: Query = { ...query };

  (Object.keys(sqlQuery || {}) || []).forEach((queryKey: string) => {
    const isQueryAble = queryAbleFields.includes(queryKey);

    if (isQueryAble) {
      if (!paginationQuery.includes(queryKey)) {
        if (typeof query[queryKey] === 'string' && query[queryKey].includes(',')) {
          query[queryKey] = query[queryKey].split(', ');
        }

        if (typeof query[queryKey] === 'string' && query[queryKey].includes('%')) {
          const searchValue = query[queryKey].replaceAll('%', '');

          sqlQuery.where = {
            ...(sqlQuery.where || {}),
            or: {
              ...((sqlQuery.where || {}).or || {}),
              [queryKey]: {
                [Op.like]: `%${searchValue}%`,
              },
            },
          };
        } else if (typeof query[queryKey] === 'string' && query[queryKey].includes('!')) {
          const notEqualValue = query[queryKey].replaceAll('!', '');

          sqlQuery.where = {
            ...(sqlQuery.where || {}),
            [queryKey]: {
              [Op.ne]: notEqualValue,
            },
          };
        } else {
          sqlQuery.where = {
            ...(sqlQuery.where || {}),
            [queryKey]: query[queryKey],
          };
        }

        delete sqlQuery[queryKey];
      }
      return;
    }

    delete sqlQuery[queryKey];
  });

  if (!!Object.keys((sqlQuery.where || {}).or || {}).length) {
    const orQuery = { ...(sqlQuery.where.or || {}) };

    delete sqlQuery.where.or;
    sqlQuery.where = {
      ...(sqlQuery.where || {}),
      [Op.or]: orQuery,
    };
  }

  return sqlQuery;
};

export default queryGenerator;
