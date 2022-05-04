import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConnections } from "../../contexts/ConnectionsProvider";

function Connections() {
	const { connections, setSelectedIndex } = useConnections();

	return (
		<>
			<ListGroup variant="flush" className="px-2">
				{connections.map((connection, index) => {
					return (
						<ListGroup.Item
							className="mt-2 contact-item"
							action
							key={index}
							onClick={() => setSelectedIndex(index)}
							active={connection.selected}
						>
							{connection.recipients
								.map((recipient) => {
									return recipient.name;
								})
								.join(" - ")}
						</ListGroup.Item>
					);
				})}
			</ListGroup>
		</>
	);
}

export default Connections;
