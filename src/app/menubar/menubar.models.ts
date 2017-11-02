import { MenuItem } from 'primeng/primeng';

export interface GeneralMenuItem extends MenuItem {
  [key: string]: { [k: string]: any; } | string | MenuItem[] | MenuItem[][] | boolean | undefined | ((event?: any) => void);
}
