import { API_KEY } from "./constants";
import { ChatMessage } from "./types";

const CHAT_ROUTE = "https://openrouter.ai";

export const fetchChat = (messages: ChatMessage[]) => {
  const apiKey = localStorage.getItem(API_KEY);
  if (!apiKey) {
    return Promise.reject("Please config api key first");
  }

  return fetch(`${CHAT_ROUTE}/api/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct:free",
      messages,
    }),
  });
};
