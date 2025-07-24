import app from "./app";
import http from "http";
import { onServerError, onSeverListening } from "./events/server";
import { PORT } from "./config";
import "./db/connection";

// const port = normalizePort(process.env.PORT || '3000');
app.set("port", PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on("error", (error) => onServerError(error as any, PORT));
server.on("listening", () => onSeverListening(server, 'http'));
