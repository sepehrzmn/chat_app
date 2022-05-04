import React, { useState } from "react";
import Login from "../Login/Login";
import "./App.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import Dashboard from "../Dashboard/Dashboard";
import { ContactsProvider } from "../../contexts/ContactsProvider";
import { ConnectionsProvider } from "../../contexts/ConnectionsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";
function App() {
	const [id, setId] = useLocalStorage("id");
	const checkId = id ? (
		<>
			<SocketProvider id={id}>
				<ContactsProvider>
					<ConnectionsProvider id={id}>
						<Dashboard id={id} />
					</ConnectionsProvider>
				</ContactsProvider>
			</SocketProvider>
		</>
	) : (
		<Login setId={setId} />
	);

	return <>{checkId}</>;
}

export default App;
