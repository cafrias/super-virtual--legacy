import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navigation from './Navigation';
import { layoutGetState } from '../../store/Layout/selectors';
import { layoutSetNavCollapsed } from '../../store/Layout';

type LayoutProps = React.PropsWithChildren<{}>;

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  const { navCollapsed } = useSelector(layoutGetState);
  const dispatch = useDispatch();

  const onToggleCollapse = useCallback(() => {
    dispatch(layoutSetNavCollapsed(!navCollapsed));
  }, [dispatch, navCollapsed]);

  return (
    <div className="flex">
      <Navigation
        collapsed={navCollapsed}
        onToggleCollapse={onToggleCollapse}
      />
      <main className="ml-64 p-5">{children}</main>
    </div>
  );
};
export default Layout;
