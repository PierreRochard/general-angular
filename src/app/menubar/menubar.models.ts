import { MenuItem } from 'primeng/primeng';

export interface GeneralMenuItem extends MenuItem {
  [key: string]: string | MenuItem[] | boolean | undefined | ((event?: any) => void);
}
