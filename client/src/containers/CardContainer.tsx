import React from 'react';
import moment from 'moment';
import { Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';

import { useGetCardsQuery } from '../generated/graphql';

import NewCardForm from './NewCardForm';

import { useStyles } from '../styles';

function getModalStyle(): { top: string; left: string; transform: string } {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const CardContainer: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const { data, loading, error } = useGetCardsQuery({
    variables: { first: 25 },
  });

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (loading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div className={classes.cardContainerRoot}>
      <Container maxWidth={false}>
        <table className={classes.tableC}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Number</th>
              <th>Label</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {data?.cards.edges.map(edge => {
              const { id, number, label, created, updated } = edge.node;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{number}</td>
                  <td>{label}</td>
                  <td>{moment(created).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>{moment(updated).format('MMMM Do YYYY, h:mm:ss a')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fabAdd}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.modal}>
          <NewCardForm></NewCardForm>
        </div>
      </Modal>
    </div>
  );
};
