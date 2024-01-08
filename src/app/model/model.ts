export interface Customer {
  id?: string;
  name: string;
  email: string;
  contact: string;
}

export interface ToastData {
  success?: boolean;
  error: boolean;
  message: string;
}
