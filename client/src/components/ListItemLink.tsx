import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';

interface ListItemLinkProps {
  primary: React.ReactNode;
  to: string;
}

export function ListItemLink(props: ListItemLinkProps): React.ReactElement {
  const { primary, to } = props;

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
      <ListItem component={renderLink as React.ComponentType<any>}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
