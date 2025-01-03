import { SocketService } from './services/SocketService';

export class RoomLandingPage {
    private backDrop: HTMLDivElement;
    private overlayRoom: HTMLDivElement;
    private socketService: SocketService;

    constructor() {
        this.backDrop = document.createElement('div');
        this.overlayRoom = document.createElement('div');
        this.socketService = SocketService.getInstance();
    }

    showLandingroomPage(): void {
        // Create elements
        const createRoom = document.createElement('button');
        const joinRoom = document.createElement('button');

        // Add classes
        this.backDrop.classList.add('backdrop');
        this.overlayRoom.classList.add('overlayRoom');
        let createBlock = document.createElement('div');
        let joinBlock = document.createElement('div');
        createBlock.classList.add('createRoom');
        joinBlock.classList.add('joinRoom');

        createBlock.appendChild(createRoom);
        joinBlock.appendChild(joinRoom);

        // Set content
        createRoom.textContent = 'Create Room';
        joinRoom.textContent = 'Join Room';

        // Build DOM structure
        this.overlayRoom.append(createBlock, joinBlock);
        //this.backDrop.appendChild(this.overlayRoom);

        // Add to document safely
        if (document.body) {
            document.body.appendChild(this.backDrop);
            document.body.appendChild(this.overlayRoom);
        }

        // Add event listeners
        this.addEventListeners(createRoom, joinRoom);

        // Dispatch custom event after landing page is shown
        const event = new Event('roomPageLoaded');
        document.dispatchEvent(event);
    }

    private addEventListeners(createBtn: HTMLButtonElement, joinBtn: HTMLButtonElement): void {
        createBtn.addEventListener('click', () => this.handleCreateRoom());
        joinBtn.addEventListener('click', () => this.handleJoinRoom());
    }

 

    private async handleCreateRoom(): Promise<void> {
        // Handle create room logic
        const roomId =  this.socketService.createRoom();
        // console.log(JSON.stringify(createRoom));
        if(roomId){
            this.overlayRoom.replaceChildren();
            let displayBlock = document.createElement('div');
            let h4 = document.createElement('h4');
            h4.textContent = `Waiting for Player to Join....\nRoomId-${roomId}`;
            displayBlock.appendChild(h4);
            this.overlayRoom.append(displayBlock);

        }
    }

     private async handleJoinRoom(): Promise<void> {
        // Handle join room logic

        this.overlayRoom.replaceChildren();
        //let joinButton = this.overlayRoom.firstChild!;
        let displayBlock = document.createElement('div');
        let label = document.createElement('label');
        let input = document.createElement('input');
        label.textContent = `Enter RoomId : `;
        let joinBlock = document.createElement('div');
        const joinRoom = document.createElement('button');
        joinBlock.classList.add('joinRoom');
        joinBlock.appendChild(joinRoom);

        // Set content
        joinRoom.textContent = 'Join Room';
        displayBlock.append(label ,input , joinRoom);
        this.overlayRoom.append(displayBlock);


        joinRoom.addEventListener('click', () => this.joinRoomForReal(input.value));

       
    }

    private joinRoomForReal(roomId : string) {
        this.socketService.joinRoom(roomId);
        this.removeBackDrop();
    }

    removeBackDrop(){
        this.backDrop.remove();
        this.overlayRoom.remove();
    }

    public cleanup(): void {
        // Clean up method to remove elements
        this.backDrop.remove();
    }
}
