import React from 'react';
import { Link } from 'react-router-dom';
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
      React.forwardRef(function forwardLink(linkProps, ref) {
        // eslint-disable-next-line
        // @ts-ignore
        return <Link to={to} {...linkProps} ref={ref} />;
      }),
    [to],
  );

  return (
    <li>
      {/*
      // @ts-ignore */}
      <ListItem component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
