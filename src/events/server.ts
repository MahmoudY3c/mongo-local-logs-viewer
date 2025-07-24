import type {
  IncomingMessage,
  Server as httpServer,
  ServerResponse,
} from "http";
import type { AddressInfo } from "net";
import os, { type NetworkInterfaceInfo } from "os";

export const onServerError = (
  error: NodeJS.ErrnoException,
  port: number | string | undefined
) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const getDeviceIps = (family = "IPv4") => {
  const interfaces = os.networkInterfaces();
  const addresses = Object.values(interfaces)
    .filter((e) => e?.length)
    .flatMap((e) =>
      (e as NetworkInterfaceInfo[]).filter(
        (alias) =>
          alias.family.toLowerCase() === family.toLowerCase() && !alias.internal
      )
    )
    .map((e) => e.address);
  return addresses;
};

export const onSeverListening = (
  server: httpServer<typeof IncomingMessage, typeof ServerResponse>,
  protocol: "http" | "https"
) => {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);

  const ips = getDeviceIps();
  console.log(ips);

  let localAddress = ips[ips.length - 1];
  console.log(`Visit ${protocol}://${localAddress}:${addr.port}/`);
};
