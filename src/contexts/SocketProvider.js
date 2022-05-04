import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const SocketContext = createContext();

export function useSocket() {
	return useContext(SocketContext);
}

export function SocketProvider({ children, id }) {
	const [socket, setSocket] = useState();
	useEffect(() => {
		const newSocket = io("http://192.168.1.103:5000", { query: { id } });
		setSocket(newSocket);

		return () => newSocket.close();
	}, [id]);
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
}
