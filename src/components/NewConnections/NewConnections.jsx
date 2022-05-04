import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useConnections } from "../../contexts/ConnectionsProvider";
import { useContacts } from "../../contexts/ContactsProvider";

function NewConnections({ closeModal }) {
	const [checkedId, setCheckedId] = useState([]);
	const { contacts } = useContacts();
	const { createConnections } = useConnections();
	const [error, setError] = useState("");
	function handleChange(userId) {
		setCheckedId((prevent) => {
			if (prevent.includes(userId)) {
				return prevent.filter((preventId) => preventId !== userId);
			} else {
				return [...prevent, userId];
			}
		});
	}
	function handelSubmit(e) {
		e.preventDefault();
		if (!checkedId.length) {
			setError("Click Contact");
			return false;
		}
		createConnections(checkedId);
		closeModal();
	}
	console.log(error);

	return (
		<div className="text-white" style={{ background: "var(--bs-gray-800)" }}>
			<Modal.Header> New Connections </Modal.Header>
			<Modal.Body>
				<Form onSubmit={handelSubmit}>
					<div className="overflow-auto" style={{ height: "10rem" }}>
						{contacts.map(({ name, id }) => {
							return (
								<Form.Group controlId={id} key={id}>
									<Form.Check
										value={checkedId.includes(id)}
										type="checkbox"
										label={name}
										onChange={() => {
											handleChange(id);
										}}
									/>
								</Form.Group>
							);
						})}
					</div>

					<Button type="submit" className="mt-4">
						Save
					</Button>
				</Form>
			</Modal.Body>
		</div>
	);
}

export default NewConnections;
