import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity="error">
        <AlertTitle>Данные не получены</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}
