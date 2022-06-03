import { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { Typography, IconButton, Skeleton } from '@mui/material';
import { SortByAlpha as SortByAlphaIcon } from '@mui/icons-material';
import { RateTableProps, RateItemType } from '../types/types';
import { sortingRates, sortingCurrency } from '../utils/utils';

const FlownContainer = styled.div`
  position: relative;
  overflow: auto;
  height: calc(100vh - 300px);
  min-height: 360px;
  max-height: 800px;
  border: 2px solid rgb(200 200 200);

  @media (max-height: 600px) {
    min-height: auto;
  }
`;

const TableContainer = styled.table`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
  border-collapse: collapse;
`;
const THead = styled.thead`
  color: #fff;
  background-color: #3f87a6;
  position: sticky;
  top: -1px;
`;

const TBody = styled.tbody`
  background-color: #e4f0f5;
`;

const Td = styled.td`
  padding: 5px 10px;
  border: 1px solid rgb(190 190 190);
  text-align: center;
`;

const Th = styled.th`
  padding: 5px 10px;
  border: 1px solid rgb(190 190 190);
`;

const Tr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #306177;
  }
`;

const TableItem: FC<RateItemType & { setCurrency: (cur: string) => void }> = ({ name, rate, setCurrency }) => {
  const onClickHandler = () => setCurrency(name);

  return (
    <Tr onClick={onClickHandler}>
      <Th scope="row">{name}</Th>
      <Td>{rate}</Td>
    </Tr>
  );
};

export const Table: FC<RateTableProps> = ({ setCurrencyTo, items }) => {
  const [isCurrSorted, setCurSorting] = useState(false);
  const [isRatesSorted, setRateSorting] = useState(false);
  const [tableItems, updateItems] = useState(items);

  const sortRates = useCallback(() => {
    if (tableItems === undefined) return;

    updateItems(sortingRates([...tableItems], isRatesSorted));
    setRateSorting(!isRatesSorted);
  }, [tableItems, updateItems, isRatesSorted]);

  const sortCurrency = useCallback(() => {
    if (tableItems === undefined) return;

    updateItems(sortingCurrency([...tableItems], isCurrSorted));
    setCurSorting(!isCurrSorted);
  }, [tableItems, updateItems, isCurrSorted]);

  return (
    <FlownContainer>
      <TableContainer>
        <THead>
          <Tr>
            <Th scope="col">
              <Typography variant="subtitle1">
                Валюта{' '}
                <IconButton color="inherit" component="span" size="small" onClick={sortCurrency}>
                  <SortByAlphaIcon fontSize="inherit" />
                </IconButton>
              </Typography>
            </Th>
            <Th scope="col">
              <Typography variant="subtitle1">
                Курс{' '}
                <IconButton color="inherit" size="small" component="span" onClick={sortRates}>
                  <SortByAlphaIcon fontSize="inherit" />
                </IconButton>
              </Typography>
            </Th>
          </Tr>
        </THead>

        {tableItems ? (
          <TBody>
            {tableItems.map((item) => (
              <TableItem key={item.name} {...item} setCurrency={setCurrencyTo} />
            ))}
          </TBody>
        ) : (
          <Skeleton variant="rectangular" width={376} height={30} />
        )}
      </TableContainer>
    </FlownContainer>
  );
};
