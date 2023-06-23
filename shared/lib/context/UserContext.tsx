import { Dispatch, SetStateAction, createContext } from 'react';

type User = {
  first_name: string;
  id: string;
  role: string;
  img_url: string;
  last_name: string;
};

/* tslint:disable:no-empty */
export const UserContextHandler = createContext<User>({
  id: '',
  first_name: '',
  role: '',
  img_url: '',
  last_name: '',
});
