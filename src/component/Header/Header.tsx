import { memo, useCallback, useEffect, useState } from "react";
import { Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { API_KEY, DISPLAY_API_KEY_CONFIG_MODAL } from "../../common/constants";
import instance from "../../utils/EventEmitter";
import { HeaderBox, HeaderContainer } from "./Styled";

const Header = () => {
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = instance.on(DISPLAY_API_KEY_CONFIG_MODAL, () => {
      handleOpen();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = useCallback(() => {
    localStorage.setItem(API_KEY, apiKey);
    handleClose();
  }, [apiKey, handleClose]);

  useEffect(() => {
    const key = localStorage.getItem(API_KEY);
    if (typeof key === "string" && key.length > 0) {
      setApiKey(key);
    }
  }, []);

  const alreadyConfigApiKey = apiKey !== "";

  return (
    <HeaderContainer>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="body2">
          ChatGPT DEMO Based on OpenAI API gpt-3.5-turbo.
        </Typography>
        <IconButton
          sx={{ color: alreadyConfigApiKey ? "green" : "red" }}
          onClick={handleOpen}
        >
          <Settings />
        </IconButton>
      </Stack>

      <Modal open={open}>
        <HeaderBox>
          <Stack spacing={2}>
            <h2 id="child-modal-title">Config your api key</h2>
            <TextField
              value={apiKey}
              label="Input your api key here."
              onChange={(event) => setApiKey(event.target.value)}
            />

            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleClose}>CANCEL</Button>
              <Button onClick={onConfirm} variant="contained">
                CONFIRM
              </Button>
            </Stack>
          </Stack>
        </HeaderBox>
      </Modal>
    </HeaderContainer>
  );
};

export default memo(Header);
