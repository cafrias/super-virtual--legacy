import LayoutReducer, {
  LayoutState,
  layoutSetNavCollapsed,
  LAYOUT_SET_NAV_COLLAPSED,
  LayoutDefaultState,
} from '.';

describe('Layout', () => {
  describe('layoutSetNavCollapsed', () => {
    it('returns correctly', () => {
      const action = layoutSetNavCollapsed(true);

      expect(action.type).toBe(LAYOUT_SET_NAV_COLLAPSED);
      expect(action.payload).toBe(true);
    });
  });

  describe('LayoutReducer', () => {
    it('uses default state', () => {
      const result = LayoutReducer(undefined, { type: '' });
      expect(result).toBe(LayoutDefaultState);
    });

    describe('on layoutSetNavCollapsed', () => {
      it('sets correctly', () => {
        const state: LayoutState = {
          navCollapsed: false,
        };

        const result = LayoutReducer(state, layoutSetNavCollapsed(true));

        expect(result).not.toBe(state);
        expect(result.navCollapsed).toBe(true);
      });

      it('will not set if same value', () => {
        const state: LayoutState = {
          navCollapsed: false,
        };

        const result = LayoutReducer(state, layoutSetNavCollapsed(false));

        expect(result).toBe(state);
        expect(result.navCollapsed).toBe(false);
      });
    });

    describe('on unknown', () => {
      it('returns state', () => {
        const state: LayoutState = {
          navCollapsed: false,
        };
        const action = { type: 'unknown' };
        const result = LayoutReducer(state, action);

        expect(result).toBe(state);
        expect(result.navCollapsed).toBe(false);
      });
    });
  });
});
