import { FC } from "react";
import MarkdownIt from "markdown-it";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { ChatMessage } from "../../common/types";
import { ChatGPTIcon } from "./Styled";

interface Props {
  message: ChatMessage;
  showRetry?: boolean;
  retryHandler?: () => void;
}

const Message: FC<Props> = ({ message, showRetry, retryHandler }) => {
  const { role, content } = message;
  const isUser = role === "user";
  const markdown = MarkdownIt({
    linkify: true,
    breaks: true,
  });
  const markdownContent = markdown.render(content);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {isUser ? (
          <Avatar sx={{ bgcolor: "orange", width: 41, height: 41 }}>S</Avatar>
        ) : (
          <Avatar>
            <ChatGPTIcon />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={isUser ? "You" : "ChatGPT"}
        secondary={
          <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
        }
      />
    </ListItem>
  );
};

export default Message;
