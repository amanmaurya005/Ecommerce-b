import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASEURL, {
  withCredentials: true, // 🔥 VERY IMPORTANT
});

export default socket;
