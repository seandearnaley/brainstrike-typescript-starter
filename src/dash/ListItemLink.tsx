import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemIcon from '@material-ui/core/ListItemIcon';

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
          return <Link to={to} {...linkProps} innerRef={ref} />;
        },
      ),
    [to],
  );

  return (
    <li>
      <ListItem component={renderLink} to={to}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
