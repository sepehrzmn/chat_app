import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";

function NewContacts({ closeModal }) {
	const [error, setError] = useState("");
	const name = useRef();
	const id = useRef();
	const { createContact } = useContacts();
	function handleSubmit(e) {
		e.preventDefault();
		if (!checkedId(id.current.value)) return;
		createContact(id.current.value.trim(), name.current.value.trim());
		closeModal();
	}

	function checkedId(id) {
		setError("");
		if (id.trim().length < 36) {
			setError("Characters should not be less than 32");
			return false;
		}
		const regex = /[0-9]-/g;
		const match = id.match(regex);
		if (match) {
			return true;
		}
		setError(
			"Letters not be in it (only Number) example: d837bf05-cf16-4aa9-886b-da5571ef0b45 "
		);
		return false;
	}
	return (
		<div className="text-white" style={{ background: "var(--bs-gray-800)" }}>
			<Modal.Header>New Contacts</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Id:</Form.Label>
						<Form.Control
							style={{ background: "var(--bs-gray-700)" }}
							type="text"
							ref={id}
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Name:</Form.Label>
						<Form.Control
							style={{ background: "var(--bs-gray-700)" }}
							type="text"
							ref={name}
							required
						/>
					</Form.Group>
					{error && (
						<div className="mt-4 text-danger border p-2 border-danger">
							{error}
						</div>
					)}
					<Button type="submit" variant="danger" className="mt-3 px-4">
						Save
					</Button>
				</Form>
			</Modal.Body>
		</div>
	);
}

export default NewContacts;
