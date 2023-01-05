import React from 'react';
import { AppBar, Box, IconButton, Toolbar, InputBase } from '@mui/material';
import { Search, Menu as MenuIcon, DarkModeOutlined, LightOutlined, SettingsOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import FlexBetween from './FlexBetween';
import { setMode } from '../state';

const Navbar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <AppBar sx={{
            position: 'static',
            background: 'none',
            boxShadow: 'none'
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <FlexBetween gap="0.5rem">
                    <IconButton onClick={() => console.log("open/close sidebar menu")}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween sx={{
                        background: theme.palette.background.alt,
                        padding: '0.1rem 1.5rem',
                        gap: '3rem',
                        borderRadius: "9px"
                    }}>
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                <FlexBetween sx={{ gap: '1.5rem' }}>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <LightOutlined sx={{ fontSize: '25px' }} />
                        ) : <DarkModeOutlined sx={{ fontSize: '25px' }} />}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: '25px' }} />
                    </IconButton>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar