const listResponse = (
    resp: any[] = [],
    totalCount: number = 0
  ): { list: any[]; count: number; totalCount: number; success: boolean } => {
    let list: any[] = [];
    let count: number = 0;
  
    list = (resp || []).length ? resp : [];
    count = (list || []).length ? list.length : 0;
  
    return Object.freeze({ list, count, totalCount, success: true });
  };
  
  export default listResponse;
  