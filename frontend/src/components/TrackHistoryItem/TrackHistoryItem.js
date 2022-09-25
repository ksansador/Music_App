import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from '@mui/icons-material/YouTube';

const  TrackHistoryItem = ({number, title, artist, datetime, duration}) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Paper
            sx={{width: '80%', marginBottom: '10px'}}
            // variant={'outlined'}
            elevation={2}
        >
        <List
            sx={{  width: '100%',  bgcolor: 'background.paper' }}
            component="div"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={handleClick}>
                <ListItemText
                               primary={`track #${number}`}
                               secondary={`${artist}  >  ${title}`}
                />

                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div style={{
                    padding: '20px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>

                    <div>
                        <Typography component={'p'} sx={{ fontSize: '16px'}}>
                            duration: {duration}
                        </Typography>
                        <Typography component={'p'} sx={{ fontSize: '16px'}}>
                            datetime: {datetime}
                        </Typography>
                    </div>
                    <div>
                        {/*<IconButton sx={{marginRight: '20px'}}> <PlayCircleFilledWhiteIcon fontSize={'large'}/> </IconButton>*/}
                        <IconButton sx={{marginRight: '20px'}}> <YouTubeIcon fontSize={'large'}/> </IconButton>
                    </div>
                </div>
            </Collapse>
        </List>
        </Paper>
    );
}

export default TrackHistoryItem;