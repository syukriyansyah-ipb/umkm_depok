// /redux/reducers.ts
import { combineReducers } from 'redux';

// Misalnya, kita memiliki reducer untuk data
const dataReducer = (state = { data: null }, action: any) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

// Gabungkan semua reducer
const rootReducer = combineReducers({
  data: dataReducer, // Anda bisa menambah reducer lainnya di sini
});

export default rootReducer;
