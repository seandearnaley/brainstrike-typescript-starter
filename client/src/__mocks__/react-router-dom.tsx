import React from 'react';

// Mock components
const Link = ({ children, to, ...rest }: { children?: React.ReactNode; to: string; [key: string]: any }) => (
  <a href={to} {...rest}>
    {children}
  </a>
);

const MemoryRouter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const Routes = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const Route = ({ element }: { element: React.ReactNode }) => <>{element}</>;
const Outlet = () => <div data-testid="outlet" />;

// Mock hooks
const useNavigate = jest.fn().mockReturnValue(jest.fn());
const useParams = jest.fn().mockReturnValue({});
const useLocation = jest.fn().mockReturnValue({ pathname: '/', search: '', hash: '', state: null });
const useSearchParams = jest.fn().mockReturnValue([new URLSearchParams(), jest.fn()]);

export {
  Link,
  MemoryRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
}; 