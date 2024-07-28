'use client';

import { Divider, Stack, Button } from '@mui/material';
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter();

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button
          variant={"contained"}
          onClick={() => {router.push('/signIn') }}
        >
          Sign In
        </Button>
      </Stack>
      <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
    </>
  )
}