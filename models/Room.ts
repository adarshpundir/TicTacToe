export class Room {
    private static instance: Room;
    private isInitialized: boolean = false;

    private constructor() {}

    public static getInstance(): Room {
        if (!Room.instance) {
            Room.instance = new Room();
        }
        return Room.instance;
    }

    public initialize(): void {
        if (!this.isInitialized) {
            console.log("Welcome to the Game Room!");
            console.log("Initializing game environment...");
            this.isInitialized = true;
        }
    }
}
