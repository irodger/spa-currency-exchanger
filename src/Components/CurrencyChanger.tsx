import { FC, ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Grid, FormControl, InputLabel, Input, InputAdornment, Select, MenuItem, Skeleton } from '@mui/material';

type TCurrencyChanger = {
  id: string;
  inputLabel?: string;
  selectLabel?: string;
  currencyList?: string[];
  inputValue: string;
  selectValue: string;
  selectHandler: (e: SelectChangeEvent) => void;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CurrencyChanger: FC<TCurrencyChanger> = ({
  id = 'id',
  inputLabel = 'Количество',
  selectLabel = 'Валюта',
  currencyList,
  inputValue,
  selectValue,
  selectHandler,
  inputHandler,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor={`amount-${id}`}>{inputLabel}</InputLabel>
        <Input
          id={`amount-${id}`}
          value={inputValue}
          onChange={inputHandler}
          startAdornment={<InputAdornment position="start">₽</InputAdornment>}
        />
      </FormControl>
    </Grid>

    <Grid item xs={12} sm={6} sx={{ mt: -0.5 }}>
      {currencyList ? (
        <FormControl fullWidth variant="standard">
          <InputLabel id={`currency-select-label-${id}`} sx={{ mt: 0.5 }}>
            {selectLabel}
          </InputLabel>
          <Select
            labelId={`currency-select-label-${id}`}
            id={`currency-select-${id}`}
            value={selectValue}
            sx={{ mt: -2 }}
            label="Валюта"
            onChange={selectHandler}
          >
            {currencyList.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Skeleton variant="rectangular" animation="wave" sx={{ mt: 1.5 }} width={140} height={48} />
      )}
    </Grid>
  </Grid>
);
