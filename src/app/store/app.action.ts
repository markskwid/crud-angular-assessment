import { createAction, props } from '@ngrx/store';
import { Customer } from '../model/model';

export const setData = createAction(
  '[Contact] SetData',
  props<{ data: Customer[] }>()
);

export const addData = createAction(
  '[Contact] AddData',
  props<{
    data: Customer;
  }>()
);

export const updateData = createAction(
  '[Contact] UpdateData',
  props<{
    userId: string;
    data: Customer;
  }>()
);

export const deleteData = createAction(
  '[Contact] DeleteData',
  props<{ userId: string }>()
);
