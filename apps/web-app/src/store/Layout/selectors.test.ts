import { State } from '../state';
import { LayoutState } from '.';
import { layoutGetState } from './selectors';

describe('Layout selectors', () => {
  describe('layoutGetState', () => {
    it('returns the state correctly', () => {
      const layoutState: LayoutState = {
        navCollapsed: false,
      };
      const state: State = {
        layout: layoutState,
      };

      const result = layoutGetState(state);

      expect(result).toBe(layoutState);
    });
  });
});
