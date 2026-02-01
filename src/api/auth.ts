import client from "./client";

export const isMe = () => client.get("/auth/me");
