import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
export function LeadsFilters(): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
  <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search Projects"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '400px' }}
      />
    
                <Button  className='sm:flex' variant="contained" sx={{ ml: 2 }}>
                  Export To CSV
                </Button>
                <Button  variant="contained" sx={{ ml: 2 }}>
                  Export To Pdf
                </Button>
               
                <Button variant="contained" sx={{ ml: 2 }}>
                  Export To Excel
                </Button>
              </Stack>
    </Card>
  );
}
