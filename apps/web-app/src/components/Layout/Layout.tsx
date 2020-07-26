import React from 'react';

import Navigation from './Navigation';

type LayoutProps = React.PropsWithChildren<{}>;

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => (
  <div className="flex">
    <Navigation
      collapsed
      onToggleMenu={() => {
        console.log('Toggling menu');
      }}
    />
    <main className="ml-64 p-5">{children}</main>
  </div>
);

export default Layout;
