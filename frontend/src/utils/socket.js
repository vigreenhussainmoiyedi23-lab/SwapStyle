// useChatSocket.js

import { io } from "socket.io-client";

class SocketManager {
    constructor() {
        // ✅ state
        this.socket = null;
        this.retryCount = 0;

        // ✅ config
        this.maxRetries = 3;
        this.retryDelay = 3000;

        // ✅ timers
        this.retryTimeout = null;
    }

    init() {
        if (!this.socket) {
            this.socket = io("http://localhost:3000", {
                withCredentials: true,
                autoConnect: false,
                reconnection: false,
            });
        }
        return this.socket;
    }

    connect() {
        const socket = this.init();

        if (socket.connected) return;

        // reset listeners to avoid duplicates
        socket.off("connect");
        socket.off("connect_error");


        socket.connect();

        socket.on("connect", () => {
            this.retryCount = 0; // reset on success
            clearTimeout(this.retryTimeout);
        });

        socket.on("connect_error", () => {
            this.retryCount++;

            if (this.retryCount < this.maxRetries) {
                this.retryTimeout = setTimeout(() => {
                    this.connect();
                }, this.retryDelay);
            }
        });
    }
    emitMessage(messageName, messageData) {
        this.socket.emit(messageName, messageData);
    }
    listenMessage(messageName, callbackFunction) {
        this.socket.on(messageName, callbackFunction);
    }
    // 🔥 This is the key part
    retryAfterUserAction() {
        this.retryCount = 0; // reset retry cycle
        this.connect();
    }
}

export const socketManager = new SocketManager();