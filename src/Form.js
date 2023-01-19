import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const useStyles = ((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://prod-cdn-thekrazycouponlady.imgix.net/wp-content/uploads/2020/04/fetch-rewards-app-groceries-scan-e-receipt-01-1585848441-1585848441.jpg?auto=compress,format&fit=max)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


 class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          name: '',
          email: '',
          password:'',
          occupation:'',
          state1:'',
          occupations: [],
          states: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signupForm = this.signupForm.bind(this);
      }
    
    
 
    async signupForm(credentials) {
        
       }   
    
    async handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name
    let email = this.state.email
    let password = this.state.password
    let state = this.state.state1
    let occupation = this.state.occupation
     fetch('https://frontend-take-home.fetchrewards.com/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password, occupation, state })
        })
          .then(
            response => {
                return response.json();
            })
            .then(res =>{
                console.log(res)
                if(res.id){
                    swal("Success", "Created", "success");
                }
                else{
                    swal("Failed", "Something went wrong!", "error");
                }
            })
          .catch( e => {
            swal("Failed", "Something went wrong!", "error");
          })
  }

  componentDidMount() {
    let initial_state = [];
    let initial_occupation = [];
    fetch('https://frontend-take-home.fetchrewards.com/form')
        .then(response => {
            return response.json();
        }).then(data => {
            initial_occupation = data.occupations.map((occupation) => {
            return occupation
        });
            initial_state = data.states.map((state) => {
            return state
            })
      
        this.setState({
            occupations: initial_occupation,
            states: initial_state,
            occupation: initial_occupation[0],
            state1: initial_state[0].name

        });
    });
}

  render() {
    const { classes } = this.props;
    let occupationsItems = this.state.occupations.map((occupation) =>
        <MenuItem key={occupation} value={occupation}>{occupation}</MenuItem>
    );
    let statesItems = this.state.states.map((state) =>
    <MenuItem key={state.name} value={state.name}>{state.name}</MenuItem>
    );
    return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          User Creation Form
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              onChange={e => this.setState({ name: e.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={e => this.setState({ email: e.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={e => this.setState({ password: e.target.value})}
            />
            
            <InputLabel id="occ">Occupation</InputLabel>

            <Select
                labelId='occ'
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="occupation"
                name="occupation"
                label="Occupation"
                type="occupation"
                value={this.state.occupation}
                onChange={e => this.setState({ occupation: (e.target.value).toString()})}
            >
                {occupationsItems}
            </Select>
            
            
            <InputLabel id="sta">State</InputLabel>
            <Select
            labelId='sta'
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="state1"
                name="state1"
                label="State1"
                type="state1"
                value={this.state.state1}
                onChange={e => this.setState({ state1:(e.target.value).toString()})}
            >
                {statesItems}
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
 }
}

export default withStyles(useStyles, { withTheme: true })(SignUp);