import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

function App() {

    const StyledButton = withStyles({
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
            textTransform: 'capitalize',
        },
    })(Button);

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
                            },
        },
    }));
    const classesError = useStyles();

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };



    const useStylesError = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStylesError();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleSnack = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleCloseSnack = () => {
        setState({ ...state, open: false });
    };

    const useStepStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }));

    function getSteps() {
        return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return 'Select campaign settings...';
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown step';
        }
    }

    const classesStep = useStepStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [openDialog, setDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

  return (
    <div className={classes.root}>
        <AppBar color="inherit" position="static" >
            <Toolbar>
                <StyledButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                </StyledButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
                <Typography variant="h5" className={classes.title}>
                    Tara Ray
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Checkbox
            checked={checked}
            color="primary"
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />

       <div>
           <Button onClick={handleSnack({ vertical: 'top', horizontal: 'left' })}>Click for Snacks</Button>
           <Snackbar
               anchorOrigin={{ vertical, horizontal }}
               key={`${vertical},${horizontal}`}
               open={open}
               onClose={handleCloseSnack}
               message="I love snacks"
           />
       </div>
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classesStep.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classesStep.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classesStep.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classesStep.button}>
                                Back
                            </Button>
                            {isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                    className={classesStep.button}
                                >
                                    Skip
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classesStep.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>


        <div style={{padding:"50px 10px"}}>
            <StyledButton variant="outlined" color="primary" onClick={handleClickOpen}>
                Open dialog
            </StyledButton>
        <Dialog onClose={handleDialogClose} aria-labelledby="customized-dialog-title" open={openDialog}>
            <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
                Modal title
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                    auctor fringilla.
                </Typography>
            </DialogContent>
            <DialogActions>
                <StyledButton autoFocus onClick={handleDialogClose} color="primary">
                    Save changes
                </StyledButton>
            </DialogActions>
        </Dialog>
        </div>

        <form className={classesError.root} noValidate autoComplete="off">

                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="Username"
                    helperText="Username should contain more than 1 character."
                    variant="outlined"
                />
            <TextField
                error
                id="outlined-error-helper-text"
                label="Age"
                helperText="Invalid entry."
                variant="outlined"
            />
        </form>
    </div>
  );
}

export default App;
