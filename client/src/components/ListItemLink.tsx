import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { css } from '@emotion/css';

interface ListItemLinkProps {
  primary: React.ReactNode;
  to: string;
}

export function ListItemLink(props: ListItemLinkProps): React.ReactElement {
  const { primary, to } = props;
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'innerRef'>>(
        function forwardLink(linkProps, ref) {
          return <Link {...linkProps} to={to} ref={ref} />;
        },
      ),
    [to],
  );
  
  return (
    <li>
      <ListItem
        component={renderLink as React.ComponentType<any>}
        className={css`
          background-color: ${isActive ? 'rgba(63, 81, 181, 0.12)' : 'transparent'};
          position: relative;
          
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background-color: ${isActive ? '#3f51b5' : 'transparent'};
          }
          
          &:hover {
            background-color: ${isActive ? 'rgba(63, 81, 181, 0.16)' : 'rgba(63, 81, 181, 0.08)'};
          }
        `}
      >
        <ListItemText
          primary={primary}
          disableTypography={true} // This allows us to use our own styling for the text
        />
      </ListItem>
    </li>
  );
}