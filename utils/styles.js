import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#1D3557',
    '& a': {
      color: '#F1FAEE',
      marginLeft: 15,
    },
  },
  grow: {
    flexGrow: 1,
  },
  section: {
    marginTop: 30,
  },
  backLink: {
    display: 'flex',
  },
  main: {
    minHeight: '100vh',
  },
  footer: {
    textAlign: 'center',
    marginTop: 15,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: 'auto',
  },
  navbarButton: {
    color: '#F1FAEE',
    textTransform: 'initial',
  },
  checkoutWizard: {
    marginTop: 25,
  },
  error: {
    color: '#E63946',
  },
  fullWidth: {
    width: '100%',
  },
});

export default useStyles;
