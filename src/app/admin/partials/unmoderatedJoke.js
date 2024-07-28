import SubmitJoke from '@/app/partials/submitJoke';
import { fetchUnmoderatedJoke } from '@/utils/moderate-service';
import {
  Card,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function UnmoderatedJoke() {
  const [isJokeLoading, setIsJokeLoading] = useState(false);
  const [jokeData, setJokeData] = useState([]);

  useEffect(() => {
    onGetJoke();
  }, []);

  const onGetJoke = () => {
    fetchUnmoderatedJoke(setIsJokeLoading, setJokeData);
  }

  const renderJoke = () => {
    if (!jokeData.length) {
      return <Typography>
        No new jokes available.
      </Typography>
    }
    const joke = jokeData[0];

    return <SubmitJoke
      isAdmin={true}
      jokeData={joke}
      onCompleteAction={onGetJoke}
    />
  };

  if (isJokeLoading) {
    return (<Card>
      <CircularProgress />
    </Card>)
  }

  return (
    <Card
      sx={{
        padding: "20px"
      }}
    >
      <Stack spacing={2}>
        {renderJoke()}
        <Button
          variant="contained"
          onClick={onGetJoke}
        >
          Next Joke
        </Button>
      </Stack>
    </Card>
  );
}
