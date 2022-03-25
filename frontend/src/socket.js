import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

export var socket = io(ENDPOINT);
