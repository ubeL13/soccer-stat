import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <MuiBreadcrumbs sx={{ mb: 3 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast || !item.href) {
          return (
            <Typography
              key={item.label}
              color={isLast ? 'text.primary' : 'inherit'}
              variant="body2"
            >
              {item.label}
            </Typography>
          );
        }

        return (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.href}
            underline="hover"
            color="inherit"
            variant="body2"
          >
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
