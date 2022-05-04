import React, {
	useContext,
	createContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import { useSocket } from "../contexts/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

const ConnectionsContext = createContext();

export function useConnections() {
	return useContext(ConnectionsContext);
}

export function ConnectionsProvider({ id, children }) {
	const [connections, setConnection] = useLocalStorage("connections", []);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const { contacts } = useContacts();
	const socket = useSocket();
	function createConnections(recipients) {
		setConnection((prevent) => [...prevent, { recipients, message: [] }]);
	}

	const addMessage = useCallback(
		({ recipients, text, sender }) => {
			setConnection((prevent) => {
				let madeChange = false;
				const newMessage = { sender, text };
				const newConnections = prevent.map((connection) => {
					if (arrayEquality(connection.recipients, recipients)) {
						madeChange = true;
						return {
							...connection,
							message: [...connection.message, newMessage],
						};
					}
					return connection;
				});
				if (madeChange) {
					return newConnections;
				} else {
					return [...prevent, { recipients, message: [newMessage] }];
				}
			});
		},
		[setConnection]
	);

	useEffect(() => {
		if (socket == null) return;

		socket.on("receive-message", addMessage);
		return () => socket.off("receive-message");
	}, [socket, addMessage]);

	function sendMessage(recipients, text) {
		socket.emit("send-message", { recipients, text });
		addMessage({ recipients, text, sender: id });
	}

	const formattedConnections = connections.map((connection, index) => {
		const recipients = connection.recipients.map((recipient, index) => {
			const contact = contacts.find((contact) => {
				return contact.id == recipient;
			});
			const name = (contact && contact.name) || recipient;

			return { id: recipient, name };
		});

		const message = connection.message.map((message, index) => {
			const contact = contacts.find((contact, index) => {
				return contact.id === message.sender;
			});
			const name = (contact && contact.name) || message.sender;
			const fromMe = id === message.sender;
			return { ...message, senderName: name, fromMe };
		});

		const selected = index === selectedIndex;

		return { ...connection, recipients, selected, message };
	});
	const value = {
		createConnections,
		connections: formattedConnections,
		selectedConnection: formattedConnections[selectedIndex],
		setSelectedIndex,
		sendMessage,
	};
	return (
		<ConnectionsContext.Provider value={value}>
			{children}
		</ConnectionsContext.Provider>
	);
}

function arrayEquality(a, b) {
	if (a.length !== b.length) return false;

	a.sort();
	b.sort();

	return a.every((element, index) => {
		return element === b[index];
	});
}
