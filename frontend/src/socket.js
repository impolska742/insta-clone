import { io } from "socket.io-client";
const ENDPOINT = "https://instagram-crud.herokuapp.com/";

export var socket = io(ENDPOINT);
