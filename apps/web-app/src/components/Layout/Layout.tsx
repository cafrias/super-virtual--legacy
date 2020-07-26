import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

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

  const mainClasses = classNames('p-5', {
    'ml-64': !navCollapsed,
    'ml-12': navCollapsed,
  });

  return (
    <div className="flex">
      <Navigation
        collapsed={navCollapsed}
        onToggleCollapse={onToggleCollapse}
      />
      <main className={mainClasses}>{children}</main>
    </div>
  );
};
export default Layout;
