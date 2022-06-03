import { ChangeEvent, useEffect, useState, useMemo } from 'react';

import { Container, Button, Typography, Skeleton, Grid, Box } from '@mui/material';
import { CurrencyExchange as CurrencyExchangeIcon } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Table } from './Components/Table';
import { CurrencyChanger } from './Components/CurrencyChanger';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Warning } from './Components/Warning';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';

import { fetchCurrencies, calculate, addAmount, setCurrency } from './redux/slices/exchangerSlice';
import { ratesSelector, resultSelector, amountSelector, currencySelector } from './redux/selectors/exchangeSelector';
import { useSelector, useDispatch } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const amount = useSelector(amountSelector);
  const currency = useSelector(currencySelector);
  const rates = useSelector(ratesSelector);
  const result = useSelector(resultSelector);
  const [date, changeDate] = useState(new Date());
  const [isPopupOpen, openPopup] = useState(false);
  const currencyList = useMemo(() => rates?.map((i) => i.name), [rates]);

  const handleCurrencyToChange = (event: SelectChangeEvent) => {
    dispatch(setCurrency(event.target.value as string));
    dispatch(calculate());
  };

  const changeAmountFrom = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addAmount(Number(e.target.value)));
  };

  const calculateHandler = () => dispatch(calculate());
  const tableCurrencyHandler = (cur: string) => dispatch(setCurrency(cur));
  const closePopup = () => openPopup(false);
  const openPopupHandler = () => openPopup(true);

  useEffect(() => {
    const fetchData = async () => {
      // @ts-expect-error fix later
      await dispatch(fetchCurrencies());
    };

    fetchData().catch(console.warn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const warningText =
    date > new Date()
      ? 'Котировки будущего пока не доступны, а было б не плохо, да? 😄'
      : 'К сожалению эта версия API не поддерживает исторические котировки';

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <Grid container alignItems="center">
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#fff' }}>
          <Grid item>
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Exchange the Rubles!
              </Typography>
              <Box sx={{ mt: 3 }}>
                <CurrencyChanger
                  id="from"
                  currencyList={currencyList}
                  inputValue={amount}
                  selectValue={currency}
                  selectHandler={handleCurrencyToChange}
                  inputHandler={changeAmountFrom}
                />

                <Typography component="h1" variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
                  {result || null}
                </Typography>
                <Button
                  type="button"
                  disabled={!rates}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={calculateHandler}
                  endIcon={<CurrencyExchangeIcon />}
                >
                  Конвертировать
                </Button>
              </Box>
            </Box>
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <DatePicker
              variant="dialog"
              label="Выбор даты"
              helperText="Не по настоящему"
              format="dd.MM.yyyy"
              value={date}
              disableFuture
              autoOk
              disableToolbar
              // @ts-expect-error fix later
              onChange={changeDate}
              onAccept={openPopupHandler}
            />

            <Warning isOpen={isPopupOpen} handleClose={closePopup} text={warningText} />

            {rates.length ? (
              <Table setCurrencyTo={tableCurrencyHandler} items={rates} />
            ) : (
              <Skeleton variant="rectangular" width={380} height={360} />
            )}
          </Box>
        </Container>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
