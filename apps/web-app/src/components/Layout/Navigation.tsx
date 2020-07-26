import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import IconMenu from './assets/icon-menu.svg';
import IconUser from './assets/icon-user.svg';
import IconNews from './assets/icon-news.svg';
import IconHome from './assets/icon-home.svg';
import IconX from './assets/icon-x.svg';

//
// Types
//
type NavigationProps = {
  onToggleCollapse(): void;
  collapsed: boolean;
};

interface NavItem {
  text: string;
  to: string;
  icon: string;
  iconAlt: string;
  ariaLabel: string;
  className?: string;
}

//
// Constants
//
const navItems: NavItem[] = [
  {
    to: '/',
    text: 'Inicio',
    icon: IconHome,
    iconAlt: 'Icono de inicio',
    ariaLabel: 'Ir a inicio',
  },
  {
    to: '/list',
    text: 'Lista',
    icon: IconNews,
    iconAlt: 'Icono de lista de compras',
    ariaLabel: 'Ir a lista de compras',
  },
  {
    to: '/profile',
    text: 'Perfil',
    icon: IconUser,
    iconAlt: 'Icono de usuario',
    ariaLabel: 'Ir a perfil de usuario',
    className: 'mt-auto border-t border-gray-200',
  },
];

//
// Components
//
const Navigation: React.FunctionComponent<NavigationProps> = ({
  collapsed,
  onToggleCollapse,
}: NavigationProps) => {
  const containerClasses = classNames(
    'border-r bg-white border-gray-500 fixed top-0 left-0 h-full w-full',
    {
      'sm:w-12': collapsed,
      'sm:w-64': !collapsed,
    },
  );

  const linkClasses = classNames(
    'p-2 w-full flex items-center hover:bg-gray-300',
    {
      'justify-center': collapsed,
    },
  );

  return (
    <nav className={containerClasses}>
      <ul className="flex flex-col h-full">
        <li className="mb-4 border-b border-gray-200" aria-hidden>
          <button
            type="button"
            className={linkClasses}
            aria-label="Expandir/colapsar menu"
            onClick={onToggleCollapse}
          >
            {collapsed ? (
              <img src={IconMenu} alt="Hamburger icon" />
            ) : (
              <img src={IconX} alt="Close icon" />
            )}
          </button>
        </li>
        {navItems.map((item) => (
          <li className={`mb-1 ${item.className}`} key={item.to}>
            <Link
              className={linkClasses}
              to={item.to}
              aria-label={item.ariaLabel}
            >
              <img src={item.icon} alt={item.iconAlt} aria-hidden />
              {collapsed ? null : <span className="ml-3">{item.text}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
