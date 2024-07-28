import { Stack } from "@mui/material";
import SubmitJoke from "./partials/submitJoke";
import FetchJoke from "./partials/fetchJoke";
import Header from "./partials/header";

export default function Home() {
  return (
    <main>
      <Header />
      <Stack spacing={5}>
        <SubmitJoke />
        <FetchJoke />
      </Stack>
    </main>
  );
}
