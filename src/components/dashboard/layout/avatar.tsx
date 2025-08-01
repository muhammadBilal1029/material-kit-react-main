import React from 'react';
import Avatar from '@mui/material/Avatar';
import type { SxProps } from '@mui/material/styles';

interface InitialAvatarProps {
  name: string;
  onClick?: () => void;
  sx?: SxProps;
}

// Forward the ref so MUI `anchorEl` works
export const InitialAvatar = React.forwardRef<HTMLDivElement, InitialAvatarProps>(
  ({ name, onClick, sx }, ref) => {
    const initial = name?.charAt(0).toUpperCase() ?? '?';

    return (
      <Avatar
        ref={ref}
        onClick={onClick}
        sx={{
          bgcolor: '#1976d2',
          color: '#fff',
          cursor: 'pointer',
          ...sx, // merge passed styles
        }}
      >
        {initial}
      </Avatar>
    );
  }
);

InitialAvatar.displayName = 'InitialAvatar'; // Important for forwardRef components
