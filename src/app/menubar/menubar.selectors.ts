import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenubarState } from './menubar.reducers';

export const selectMenubarState = createFeatureSelector<MenubarState>('menubar');

export const selectMenuItems = createSelector(
  selectMenubarState,
  state => state.menuItems,
);
