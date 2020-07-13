import indigo from '@material-ui/core/colors/indigo';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: indigo
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
            }
        }
    }
});

export default theme;
