import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  List,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Button,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { API_KEY, DISPLAY_API_KEY_CONFIG_MODAL } from "../../common/constants";
import { fetchChat } from "../../common/request";
import { ChatMessage } from "../../common/types";
import Message from "./Message";
import instance from "../../utils/EventEmitter";
import { ChatWindowContainer, InputContainer } from "./Styled";

const Generator = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageToChatGPT, setMessageToChatGPT] = useState("");

  const scrollToBottom = () => {
    chatWindowRef.current?.scrollTo({
      top: chatWindowRef.current.scrollHeight,
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList.length]);

  const requestWithMessages = useCallback(async (messages: ChatMessage[]) => {
    setMessageToChatGPT("");

    try {
      setLoading(true);
      const response = await fetchChat(messages);

      if (!response.ok) {
        const error = await response.json();
        console.error(error.error);
        setErrorMessage(error.error);
        throw new Error("Request failed!");
      }

      const result = await response.json();
      const { choices } = result;
      const message = choices[0].message;
      setLoading(false);
      setMessageList((prevMessageList) => {
        return [...prevMessageList, message];
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    scrollToBottom();
  }, []);

  const checkApiKeyValid = () => {
    const apiKey = localStorage.getItem(API_KEY);
    if (!apiKey) {
      instance.emit(DISPLAY_API_KEY_CONFIG_MODAL);
      return false;
    }
    return true;
  };

  const clickSubmitHandler = useCallback(
    async (messageToChatGPT: string) => {
      if (!messageToChatGPT) {
        return;
      }
      if (!checkApiKeyValid()) {
        return;
      }
      const newUserMessage: ChatMessage = {
        role: "user",
        content: messageToChatGPT,
      };
      const newMessageList = [...messageList, newUserMessage];
      setMessageList(newMessageList);
      requestWithMessages(newMessageList);
      scrollToBottom();
    },
    [messageList, requestWithMessages]
  );

  const handleCloseErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <Fragment>
      <ChatWindowContainer ref={chatWindowRef}>
        {messageList && (
          <List sx={{ flex: 1 }}>
            {messageList.map((message, index) => (
              <Message key={index} message={message} showRetry={false} />
            ))}
            {loading && (
              <Message
                message={{ role: "assistant", content: "ChatGPT loading ...." }}
              />
            )}
          </List>
        )}
      </ChatWindowContainer>
      <InputContainer>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Send message to ChatGPT
          </InputLabel>
          <OutlinedInput
            type="text"
            id="chat-input"
            ref={inputRef}
            sx={{ borderRadius: "26px" }}
            label="Send message to ChatGPT"
            multiline
            value={messageToChatGPT}
            onChange={(event) => setMessageToChatGPT(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disabled={loading}
                  edge="end"
                  aria-label="=submit chat question button"
                  onClick={() => clickSubmitHandler(messageToChatGPT)}
                >
                  {loading ? (
                    <RestartAltIcon />
                  ) : (
                    <ArrowUpwardIcon shapeRendering="cycle" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </InputContainer>
      <Snackbar
        autoHideDuration={3000}
        message={errorMessage}
        open={errorMessage !== ""}
        onClose={handleCloseErrorMessage}
        action={<Button onClick={handleCloseErrorMessage}>GOT IT</Button>}
      />
    </Fragment>
  );
};

export default Generator;
