import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";
import "./Contacts.css";
function Contacts() {
	const { contacts } = useContacts();
	return (
		<>
			<ListGroup variant="flush" className="px-2">
				{contacts.map(({ name, id }, index) => {
					return (
						<ListGroupItem className="mt-2 contact-item" key={index}>
							{name}
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</>
	);
}

export default Contacts;
