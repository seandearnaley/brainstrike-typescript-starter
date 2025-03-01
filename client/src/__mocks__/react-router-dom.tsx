import React from 'react';
import { vi } from 'vitest';

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
const useNavigate = vi.fn().mockReturnValue(vi.fn());
const useParams = vi.fn().mockReturnValue({});
const useLocation = vi.fn().mockReturnValue({ pathname: '/', search: '', hash: '', state: null });
const useSearchParams = vi.fn().mockReturnValue([new URLSearchParams(), vi.fn()]);

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