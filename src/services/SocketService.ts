import { Socket } from "socket.io-client";
import io from "socket.io-client";

interface ServerToClientEvents {
    roomCreated: (roomId: string) => void;
    roomJoined: (roomId: string) => void;
    error: (message: string) => void;
}

interface ClientToServerEvents {
    createRoom: (callback: CallableFunction) => void;
    joinRoom: (roomId: string, userId: string) => void;
}

export class SocketService {
    private socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    private static instance: SocketService;

    private constructor() {
        this.socket = io("http://localhost:3000");
        this.setupListeners();
    }

    static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    private setupListeners(): void {
        this.socket.on("roomCreated", (roomId: string) => {
            console.log(`Room created with ID: ${roomId}`);
        });

        this.socket.on("roomJoined", (roomInfo: []) => {
            console.log(`Joined room: ${JSON.stringify(roomInfo)}`);
        });

        this.socket.on("error", (message: string) => {
            console.error(`Socket error: ${message}`);
        });
    }

    async createRoom(userId: string): Promise<void> {
       

          try {
            const response = await this.socket.emitWithAck('createRoom',{name:'A',id:'A'});
            console.log(response.status); // 'ok'
            return response ;
          } catch (e) {
            // the server did not acknowledge the event in the given delay
          }
    }

   async  joinRoom(roomId: string, userId: string): Promise<void> {
        try {
            const response = await this.socket.emitWithAck('joinRoom',{name:userId,id:userId},roomId);
            console.log(response.status); // 'ok'
            return response ;
          } catch (e) {
            // the server did not acknowledge the event in the given delay
          }
    }

    disconnect(): void {
        this.socket.disconnect();
    }
}
