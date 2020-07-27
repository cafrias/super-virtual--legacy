import { Action } from 'redux';

import setStateIdempotently from '../utils/setStateIdempotently';

//
// Action Types
//
export const LAYOUT_SET_NAV_COLLAPSED = 'layout/setNavCollapsed';

//
// Actions
//
interface SetCollapseBarAction extends Action {
  type: typeof LAYOUT_SET_NAV_COLLAPSED;
  payload: boolean;
}

//
// Action Creators
//
export function layoutSetNavCollapsed(newValue: boolean): SetCollapseBarAction {
  return {
    type: LAYOUT_SET_NAV_COLLAPSED,
    payload: newValue,
  };
}

//
// State
//
export type LayoutState = {
  navCollapsed: boolean;
};
export const LayoutDefaultState = {
  navCollapsed: true,
};

//
// Reducer
//
export default function LayoutReducer(
  state: LayoutState = LayoutDefaultState,
  action: Action,
): LayoutState {
  switch (action.type) {
    case LAYOUT_SET_NAV_COLLAPSED:
      return setStateIdempotently<LayoutState>(
        state,
        'navCollapsed',
        (action as SetCollapseBarAction).payload,
      );
    default:
      return state;
  }
}
