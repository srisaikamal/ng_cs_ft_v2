import {
    withStyles,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    ButtonGroup,
    Container,
    Grid,
    Card,
    CardContent,
} from '@material-ui/core';
import {
    ExitToApp
} from '@material-ui/icons';
import React from 'react';
import CustomAppBar from '../../components/CustomAppBar';

const styles = (theme) => ({
    title: {
        flexGrow: 1,
    },
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    buttonGrid: {
        marginTop: window.innerHeight / 5
    }
});
class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.getContent = this.getContent.bind(this);
        this.getCard = this.getCard.bind(this);
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <div className={classes.root}>
                <CustomAppBar
                    title='Nigeria Case Study'
                    trailingIcon={<ExitToApp />}
                    onTrailingIconPress={() => window.location='/'}
                />
                {this.getContent()}
            </div>
        );
    }

    getAppBar() {
        const {
            classes
        } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Nigeria Case Study
                </Typography>

                    <IconButton edge="start" color="inherit">
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }

    getContent() {
        const {
            classes
        } = this.props;

        return (
            <Container className={classes.content}>
                <ButtonGroup color="primary">
                    <Button>LocateNow</Button>
                    <Button>GeoLocation</Button>
                    <Button>Tools</Button>
                </ButtonGroup>

                <Grid spacing={4} container justify='center' className={classes.buttonGrid}>
                    <Grid item md={4}>
                        {this.getCard('Admin OT', 'View, Add or Delete users', () => window.location='/admin')}
                    </Grid>

                    <Grid item md={4}>
                        {this.getCard('Case OT', 'View, Add or Delete cases', null)}

                    </Grid>

                    <Grid item md={4}>
                        {this.getCard('Check OT', 'Description for Check OT', null)}
                    </Grid>

                    <Grid item md={4}>
                        {this.getCard('Fencing OT', 'Description for Fencing OT', null)}
                    </Grid>

                    <Grid item md={4}>
                        {this.getCard('Mobile OT', 'Description for Mobile OT', null)}
                    </Grid>
                </Grid>
            </Container>
        );
    }

    getCard(title, description, onPress) {
        const {
            classes
        } = this.props;

        return (
            <Card elevation={4} onClick={onPress}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography color="textSecondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default withStyles(styles)(Landing);
