import * as React from 'react';
import {useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Paper, Typography} from "@mui/material";
import dayjs from "dayjs";

const  TrackHistoryItem = ({number, title, artist, datetime, duration}) => {
    const [open, setOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    return (
        <>

            <Paper
                sx={{width: '80%', marginBottom: '10px'}}
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
                                datetime: {dayjs(datetime).format('MMMM D, YYYY h:mm A')}
                            </Typography>
                        </div>
                    </div>
                </Collapse>
            </List>
        </Paper>
        </>

    );
}

export default TrackHistoryItem;