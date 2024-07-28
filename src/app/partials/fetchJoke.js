'use client';

import { fetchModeratedJoke } from '@/utils/deliverjoke-service';
import {
  Card,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';

export default function FetchJoke() {
  const [moderatedJoke, setModeratedJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getJoke = () => {
    fetchModeratedJoke(setIsLoading, setModeratedJoke);
  }

  const renderJoke = () => {
    if (moderatedJoke === null) {
      return null;
    }
    if (!moderatedJoke.length) {
      return <Typography>
        No jokes Available at the time
      </Typography>
    }
    const joke = moderatedJoke[0];

    return (
      <Stack spacing={2}>
        <Typography
          sx={{
            fontSize: "25px"
          }}
        >
          {joke.Joke}
        </Typography>
        {
          joke.Delivery.length && <Typography
            sx={{
              fontSize: "20px"
            }}
          >
            {joke.Delivery}
          </Typography>
        }

        <Typography>
          Category: {joke.JokeType}
        </Typography>
      </Stack>
    )
  }

  if (isLoading) {
    return (
      <Card
        sx={{
          padding: "20px"
        }}
      >
        <CircularProgress />
      </Card>
    )
  }

  return (
    <Card
      sx={{
        padding: "20px"
      }}
    >
      <Stack
        spacing={2}
        textAlign={"center"}
        justifyContent={"center"}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "32px"
          }}
        >
          Get A Random joke
        </Typography>

        {renderJoke()}
        <Button
          variant="contained"
          onClick={getJoke}
        >
          Generate joke
        </Button>
      </Stack>
    </Card>
  );
}
