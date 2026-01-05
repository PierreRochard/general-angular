import { selectMenubarState, selectMenuItems } from './menubar.selectors';
import { MenubarState } from './menubar.reducers';

describe('Menubar selectors', () => {
  const state: MenubarState = {
    menuItems: [{ label: 'Home', routerLink: '/' }],
  };
  const root = { menubar: state } as any;

  it('selects menubar feature slice', () => {
    expect(selectMenubarState.projector(root.menubar)).toEqual(state);
  });

  it('selects menu items', () => {
    expect(selectMenuItems.projector(state)).toEqual(state.menuItems);
  });
});
