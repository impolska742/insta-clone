import { io } from "socket.io-client";
const ENDPOINT = "https://instagram-crud.herokuapp.com/";
// const ENDPOINT = "https://localhost:5000";

export var socket = io(ENDPOINT);
