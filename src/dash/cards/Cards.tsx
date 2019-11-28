import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { useGetCardsQuery } from '../../generated/graphql';
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
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {data &&
            data.cards &&
            data.cards.map(card => (
              <Grid key={card.id} item sm={3} className={classes.gridItem}>
                <SimpleCard card={card}></SimpleCard>
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
    </div>
  );
};
