import React, { useEffect, useState } from 'react';
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from "@mui/icons-material";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';
import FlexBetween from './FlexBetween';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />,
    },
];

const Sidebar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
    drawerWidth
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const [active, setActive] = useState("");

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    variant="persistent"
                    anchor="left"
                    onClose={() => setIsSidebarOpen(false)}
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            color: theme.palette.secondary[300],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px"
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween
                                display="flex"
                                alignItems="center"
                                gap="0.5rem"
                            >
                                <Box>
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                    >
                                        ECOMVISION
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() => {
                                            setIsSidebarOpen(!isSidebarOpen)
                                        }}
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{
                                                m: '2.25rem 0 1rem 3rem'
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    )
                                }

                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            sx={{
                                                backgroundColor: active === lcText
                                                    ? theme.palette.secondary[600]
                                                    : 'transparent',
                                                color: active === lcText
                                                    ? theme.palette.primary[600]
                                                    : theme.palette.secondary[100],
                                            }}
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: '2rem',
                                                    color: active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <IconButton
                                                    sx={{
                                                        ml: 'auto'
                                                    }}
                                                >
                                                    <ChevronRightOutlined />
                                                </IconButton>
                                            )}
                                        </ListItemButton>
                                    </ListItem>

                                )
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
};

export default Sidebar;