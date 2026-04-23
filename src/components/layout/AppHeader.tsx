import { AppBar, Toolbar, Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Лиги', path: '/leagues' },
  { label: 'Команды', path: '/teams' },
];

export function AppHeader() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ backgroundColor: '#fff' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            textDecoration: 'none',
            color: 'inherit',
            mr: 2,
          }}
        >
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}
          >
            SoccerStat
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: active ? 700 : 400,
                  borderBottom: active ? '2px solid' : '2px solid transparent',
                  borderColor: active ? 'primary.main' : 'transparent',
                  borderRadius: 0,
                  px: 1,
                  minWidth: 'auto',
                  color: active ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.main',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
