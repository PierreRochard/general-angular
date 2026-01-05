export interface MenuEntry {
  label: string;
  icon?: string;
  routerLink?: string | any[];
  url?: string;
  disabled?: boolean;
  children?: MenuEntry[];
  command?: (event?: any) => void;
  [key: string]: unknown;
}

export type GeneralMenuItem = MenuEntry;
