"use client";

import {
  Card,
  TextField,
  Stack,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { signIn } from "@/utils/moderate-service";

export default function Home() {
  const router = useRouter();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onUserNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
  };

  const onPasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  useEffect(() => {
    if (username.length && password.length) {
      setSubmitDisabled(false);
      return;
    }
    setSubmitDisabled(true);
  }, [username, password]);

  const navigateTo = () => {
    router.push("admin");
  };
  const onSubmit = () => {
    signIn({ username, password }, setIsSigningIn, navigateTo);
  };

  const renderLoading = () => {
    if (isSigningIn) {
      return <CircularProgress />;
    }
    return null;
  };

  return (
    <Card
      sx={{
        padding: "20px",
      }}
    >
      <Stack spacing={5}>
        <TextField
          id="userName"
          label="Username"
          variant="outlined"
          onChange={onUserNameChange}
          value={username}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          onChange={onPasswordChange}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          disabled={isSubmitDisabled}
          onClick={onSubmit}
        >
          Sign In
        </Button>
        {renderLoading()}
      </Stack>
    </Card>
  );
}
