"use client";

import { DEFAULT_JOKE_OBJ, IS_CUSTOM_JOKE_TYPE } from "@/utils/const";
import { fetchJokeTypes } from "@/utils/deliverjoke-service";
import { addModeratedJoke, deleteJoke } from "@/utils/moderate-service";
import { addNewJoke } from "@/utils/submitJoke-service";
import {
  Card,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function SubmitJoke({
  isAdmin = false,
  jokeData = DEFAULT_JOKE_OBJ,
  onCompleteAction = () => {},
}) {
  const [jokeTypeId, setJokeTypeId] = useState(jokeData.jokeTypeId);
  const [isCustomJoke, setIsCustomJoke] = useState(jokeData.isCustomJoke);

  const [joke, setJoke] = useState(jokeData.joke);
  const [jokeDelivery, setJokeDelivery] = useState(jokeData.jokeDelivery);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  const [jokeTypes, setJokeTypes] = useState([]);
  const [isJokeTypesLoading, setIsJokeTypesLoading] = useState(false);

  const [customJokeType, setCustomJokeType] = useState(jokeData.customJokeType);
  const [isExistingJokeType, setIsExistingJokeType] = useState(false);

  const [textFieldsDisabled, setTextFieldsDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchJokeTypes(setJokeTypes, setIsJokeTypesLoading);
  }, []);

  const customJoke = (isTrue) => {
    if (isTrue) {
      setIsCustomJoke(true);
      return;
    }
    setIsCustomJoke(false);
    setCustomJokeType("");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setJokeTypeId(value);
    customJoke(value === IS_CUSTOM_JOKE_TYPE);
  };

  const onJokeChange = (event) => {
    const value = event.target.value;
    setJoke(value);
  };

  const onJokeDeliveryChange = (event) => {
    const value = event.target.value;
    setJokeDelivery(value);
  };

  const onCustomTypeChange = (event) => {
    const value = event.target.value.trimEnd();
    setCustomJokeType(value);

    if (jokeTypes) {
      const existingJokeType = jokeTypes.find(
        (jokeType) => jokeType.JokeType.toLowerCase() === value.toLowerCase(),
      );
      if (existingJokeType) {
        setIsExistingJokeType(true);
        return;
      }
      setIsExistingJokeType(false);
    }
  };

  useEffect(() => {
    if (
      jokeTypeId === IS_CUSTOM_JOKE_TYPE &&
      (!customJokeType.length || isExistingJokeType)
    ) {
      setSubmitDisabled(true);
      return;
    }

    if (
      joke.length &&
      jokeTypeId === IS_CUSTOM_JOKE_TYPE &&
      customJokeType.length
    ) {
      setSubmitDisabled(false);
      return;
    }

    if (joke.length && jokeTypeId) {
      setSubmitDisabled(false);
      return;
    }

    setSubmitDisabled(true);
  }, [isExistingJokeType, jokeTypeId, isCustomJoke, customJokeType, joke]);

  const resetInputFields = () => {
    setJoke("");
    setJokeTypeId(null);
    setJokeDelivery("");
    setCustomJokeType("");
    setTextFieldsDisabled(true);
  };

  const onSubmit = () => {
    addNewJoke(
      {
        isCustomJoke,
        jokeTypeId,
        customJokeType,
        joke,
        jokeDelivery,
      },
      resetInputFields,
    );
  };

  const onDeleteJoke = () => {
    deleteJoke(
      {
        id: jokeData._id,
      },
      resetInputFields,
      setIsLoading,
      onCompleteAction,
    );
  };

  const onApproveJoke = () => {
    addModeratedJoke(
      {
        isCustomJoke,
        jokeTypeId,
        customJokeType,
        joke,
        jokeDelivery,
      },
      resetInputFields,
      setIsLoading,
      onCompleteAction,
      onDeleteJoke,
    );
  };

  const isTextFieldsDisabled = () => {
    if (isAdmin) {
      return textFieldsDisabled;
    }
    return false;
  };

  const renderButtons = () => {
    if (isAdmin) {
      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Button
            variant="contained"
            onClick={() => {
              setTextFieldsDisabled(false);
            }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={onDeleteJoke}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            disabled={isSubmitDisabled}
            sx={{ backgroundColor: "green" }}
            onClick={onApproveJoke}
          >
            Approve Joke
          </Button>
        </Stack>
      );
    }

    return (
      <Button
        variant="contained"
        disabled={isSubmitDisabled}
        onClick={onSubmit}
      >
        Submit Joke
      </Button>
    );
  };

  const renderJokeDelivery = () => {
    if ((isAdmin && jokeData.jokeDelivery.length) || !isAdmin) {
      return true;
    }

    return false;
  };

  const renderJokeTypes = () => {
    if (isJokeTypesLoading) {
      return <CircularProgress />;
    }

    return (
      <FormControl fullWidth>
        <InputLabel variant="outlined" id="joke-type-label">
          Joke Type
        </InputLabel>
        {isJokeTypesLoading}
        <Select
          disabled={isTextFieldsDisabled()}
          labelId="joke-type-label"
          id="joke-type"
          value={jokeTypeId}
          label="Joke Type"
          onChange={handleChange}
        >
          {jokeTypes &&
            jokeTypes.map((jokeType) => (
              <MenuItem key={jokeType.Id} value={jokeType.Id}>
                {jokeType.JokeType}
              </MenuItem>
            ))}
          <MenuItem value={IS_CUSTOM_JOKE_TYPE}>Other</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const renderTitle = () => {
    if (isAdmin) {
      return (
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "32px",
          }}
        >
          Get A Random joke
        </Typography>
      );
    }
    return (
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "32px",
        }}
      >
        Add a good Joke
      </Typography>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        padding: "20px",
      }}
    >
      <Stack spacing={2}>
        {renderTitle()}
        <TextField
          disabled={isTextFieldsDisabled()}
          id="joke-text"
          required
          label="Enter the joke"
          variant="outlined"
          multiline
          onChange={onJokeChange}
          value={joke}
        />
        {renderJokeDelivery() && (
          <TextField
            disabled={isTextFieldsDisabled()}
            id="joke-delivery-text"
            label="Joke Delivery"
            variant="outlined"
            multiline
            onChange={onJokeDeliveryChange}
            value={jokeDelivery}
          />
        )}
        {renderJokeTypes()}
        {isCustomJoke && (
          <TextField
            disabled={isTextFieldsDisabled()}
            required
            id="custom-joke-type"
            label="Enter Joke Type"
            variant="outlined"
            onChange={onCustomTypeChange}
            helperText={isExistingJokeType ? "Type already exists" : ""}
            error={isExistingJokeType}
            value={customJokeType}
          />
        )}
        {renderButtons()}
      </Stack>
    </Card>
  );
}
