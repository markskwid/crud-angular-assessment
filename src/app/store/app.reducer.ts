import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from '../model/model';
import * as DataActions from './app.action';

interface DataState {
  data: Customer[];
}

const initialState: DataState = {
  data: [],
};

export const appReducer = createReducer(
  initialState,
  //setting data for the first time that applciation run
  on(DataActions.setData, (state, { data }) => ({
    ...state,
    data: [...data],
  })),
  //reducer for adding a new data
  on(DataActions.addData, (state, { data }) => ({
    ...state,
    data: [...state.data, { ...data }],
  })),
  //reducer for deleting data
  on(DataActions.deleteData, (state, { userId }) => ({
    ...state,
    data: state.data.filter((item) => item.id !== userId),
  })),
  //reducer for updating data
  on(DataActions.updateData, (state, { userId, data }) => ({
    ...state,
    data: state.data.map((item) =>
      item.id === userId ? { ...item, ...data } : item
    ),
  }))
);

// export function appReducer(state = initialState, action: Action): DataState {
//   switch (action.type) {
//     case DataActions.setData.type:
//       const initialData = (action as any).data;
//       return { data: initialData };

//     case DataActions.addData.type:
//       const newData = (action as any).data;
//       return {
//         ...state,
//         data: [...state.data, { ...newData }],
//       };

//     case DataActions.updateData.type:
//       const userIdToUpdate = (action as any).userId;
//       const updatedData = (action as any).data;
//       return {
//         ...state,
//         data: state.data.map((item) =>
//           item.id === userIdToUpdate ? { ...item, ...updatedData } : item
//         ),
//       };

//     case DataActions.deleteData.type:
//       const userId = (action as any).userId;
//       return {
//         ...state,
//         data: state.data.filter((item) => item.id !== userId),
//       };

//     default:
//       return state;
//   }
// }
