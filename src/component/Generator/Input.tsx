import { FC, useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface Props {
  clickSubmitHandler: (value: string) => void;
}
const Input: FC<Props> = ({ clickSubmitHandler }) => {
  const [messageToChatGPT, setMessageToChatGPT] = useState("");

  const onClick = () => {
    clickSubmitHandler(messageToChatGPT);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">
        Send message to ChatGPT
      </InputLabel>
      <OutlinedInput
        type="text"
        id="chat-input"
        sx={{ borderRadius: "26px" }}
        label="Send message to ChatGPT"
        multiline
        onChange={(event) => setMessageToChatGPT(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="=submit chat question button"
              onClick={onClick}
            >
              <ArrowUpwardIcon shapeRendering="cycle" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Input;
