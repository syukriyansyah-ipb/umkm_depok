// /redux/actions.ts
export const fetchData = (data: any) => {
    return {
      type: 'FETCH_DATA',
      payload: data,
    };
  };
  