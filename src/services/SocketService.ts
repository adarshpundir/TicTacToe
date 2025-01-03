import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { roomLandingPage, ticTacToe } from "../main";

export type IMessage = any;

export interface ClientToServerEvents {
  "message-sent": (message: IMessage) => void;
  "join-room": (roomId: string) => void;
  "player-move": ({
    roomId,
    cellId,
  }: {
    cellId: string;
    roomId: string;
  }) => void;
}

export interface ServerToClientEvents {
  "message-received": (message: IMessage) => void;
  "room-full": (message: { message: string }) => void;
  "room-joined": (message: { message: string; roomId: string }) => void;
  "second-player-joined": (message: { message: string }) => void;
  "player-move": (cellId: string) => void;
  error: (message: { message: string }) => void;
}

export class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  private static instance: SocketService;

  public roomId: string = "";

  private constructor() {
    this.socket = io("http://localhost:3000", {
      path: "/tictactoe",
    });
    this.setupListeners();
  }

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  private setupListeners(): void {
    this.socket.on("room-joined", () => {
      window.alert(`Room Joined`);
      //   console.log(`Room Joined with ID: ${roomId}`);
    });

    this.socket.on("message-received", (message: string) => {
      //Logic msg received

      console.log(`Message received: ${message}`);
    });

    this.socket.on("second-player-joined", () => {
      window.alert(`Second Player Joined`);
      roomLandingPage.removeBackDrop();
      //   console.log(`Joined room: ${JSON.stringify(roomInfo)}`);
    });

    this.socket.on("room-full", () => {
      window.alert(`Room Full`);
    });

    this.socket.on("player-move", (cellId: string) => {
      ticTacToe.onPlayerMove(cellId, false);
    });

    this.socket.on("error", ({ message }) => {
      console.error(`Socket error: ${message}`);
    });
  }

  createRoom(): string {
    const roomId = uuidv4();
    try {
      this.socket.emit("join-room", roomId);
      this.roomId = roomId;
      //   console.log(response.status); // 'ok'
      return roomId;
    } catch (e) {
      return "";
      // the server did not acknowledge the event in the given delay
    }
  }

  joinRoom(roomId: string) {
    try {
      this.socket.emit("join-room", roomId);
      this.roomId = roomId;
      //   console.log(response.status); // 'ok'
      //   return response;
    } catch (e) {
      // the server did not acknowledge the event in the given delay
    }
  }

  sendPlayerMove(cellId: string) {
    this.socket.emit("player-move", { roomId: this.roomId, cellId });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
