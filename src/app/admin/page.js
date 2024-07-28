'use client';

import {
  Card,
  Stack,
} from '@mui/material';
import UnmoderatedJoke from './partials/unmoderatedJoke';
import FetchJoke from '../partials/fetchJoke';

export default function Home() {
  return (
      <Stack spacing={5}>
        <UnmoderatedJoke />
        <FetchJoke/>
      </Stack>
  );
}
