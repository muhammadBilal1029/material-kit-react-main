import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import Button from '@mui/material/Button';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
export function LeadsFilters(): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>

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
    
                <Button  variant="contained" sx={{ ml: 2 }}>
                  Export To CSV
                </Button>
                <Button  variant="contained" sx={{ ml: 2 }}>
                  Export To Pdf
                </Button>
               
                <Button variant="contained" sx={{ ml: 2 }}>
                  Export To Excel
                </Button>
              
    </Card>
  );
}
