import orange from '@material-ui/core/colors/orange';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#212121'
        },
        secondary: orange,
    },
    typography: {
        fontFamily: 'Montserrat-Regular',
        button: {
            textTransform: 'none',
            fontSize: 18
        }
    },
    overrides: {
        MuiTab: {
            fullWidth: {
                maxWidth: 'initial'
            },
        },
    }
});

export default theme;
