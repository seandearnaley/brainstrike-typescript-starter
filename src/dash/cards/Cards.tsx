import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {
  useGetCardsQuery,
  useRemoveCardMutation,
} from '../../generated/graphql';
import { SimpleCard } from './SimpleCard';
import NewCardForm from './NewCardForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    gridItem: {
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fabAdd: {
      margin: '0px',
      top: 'auto',
      right: '20px',
      bottom: '20px',
      left: 'auto',
      position: 'fixed',
    },
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function getModalStyle(): { top: string; left: string; transform: string } {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const Cards: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const { data, loading, error } = useGetCardsQuery();

  const [
    removeCardMutation,
    { loading: removeLoading, error: removeError },
  ] = useRemoveCardMutation();

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState('');

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleDeleteOpen = (id: string): void => {
    setCardToDelete(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = (): void => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    await removeCardMutation({ variables: { id: cardToDelete } });
    setDeleteOpen(false);
  };

  if (loading || removeLoading) return <div>loading....</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  if (removeError) return <p>ERROR: {removeError.message}</p>;

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {data &&
            data.cards &&
            data.cards.map(card => (
              <Grid key={card.id} item sm={3} className={classes.gridItem}>
                <SimpleCard
                  card={card}
                  handleDeleteOpen={handleDeleteOpen}
                ></SimpleCard>
              </Grid>
            ))}
        </Grid>
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
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this card?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
