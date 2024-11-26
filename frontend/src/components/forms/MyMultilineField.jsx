import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function MyMultilineField(props) {
    const {label, width, placeholder, name,control} = props
  return (
    <Controller
        name = {name}
        control={control}
        render={({
            field:{onChange, value},
            fieldState:{error},
            formState
        }) => (
            <TextField
          id="standard-multiline-static"
          label={label}
          sx={{width:{width}}}
          placeholder={placeholder}
          multiline
          onChange={onChange} 
          value={value}
          rows={1}
          variant="standard"
          error={!!error}
          helperText={error?.message}
        />
        )
    }
      />
  );
}


