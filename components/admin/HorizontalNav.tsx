import { SyntheticEvent } from 'react';

interface HorizontalNavProps {
  spaced?: boolean;
  children: JSX.Element | JSX.Element[];
}

export function HorizontalNav({
  children,
  spaced,
}: HorizontalNavProps): JSX.Element {
  return (
    <nav className={`lbh-link-group ${spaced ? 'lbh-link-group--spaced' : ''}`}>
      <ul>{children}</ul>
    </nav>
  );
}

interface HorizontalNavItemProps {
  itemName: string;
  isActive?: boolean;
  children: string;
  handleClick: (event: SyntheticEvent) => Promise<void>;
}

export function HorizontalNavItem({
  itemName,
  isActive,
  children,
  handleClick,
}: HorizontalNavItemProps): JSX.Element {
  return (
    <li className="lbh-link-group__item">
      <button
        name={itemName}
        onClick={handleClick}
        className={`lbh-link lbh-link--no-visited-state lbh-!-font-weight-bold ${
          isActive ? 'active' : ''
        }`}
      >
        {children}
      </button>
    </li>
  );
}