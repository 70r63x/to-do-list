import { DBSchema } from 'idb';

export interface Task {
  _id?: string,
  id?: number;
  content: string,
  title: string,
  dateini: string,
  datefin: string,
  isDone: boolean;
  synced?: boolean;
}

export interface MyDB extends DBSchema {
  'taskStore': {
    key: string;
    value: Task;
  };
}