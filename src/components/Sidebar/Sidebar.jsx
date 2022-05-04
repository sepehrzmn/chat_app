import React, { useState } from "react";
import { Button, Modal, Nav, Tab } from "react-bootstrap";
import Connections from "../Connections/Connections";
import Contacts from "../Contacts/Contacts";
import NewConnections from "../NewConnections/NewConnections";
import NewContacts from "../NewContacts/NewContacts";
import { FaPlus } from "react-icons/fa";

import "./Sidebar.css";
import { useEffect } from "react";
const CONNECTIONS_KEY = "connections";
const CONTACTS_KEY = "contacts";
function Sidebar({ id }) {
	const [activeKey, setActiveKey] = useState(CONTACTS_KEY);
	const [modal, setModal] = useState(false);
	const openConnections = activeKey === CONNECTIONS_KEY;
	function closeModal() {
		setModal(false);
	}

	return (
		<div className="d-flex flex-column sidebar">
			<Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
				<Nav variant="tabs" className=" d-flex justify-content-around s-navbar">
					<Nav.Item className="text-white s-navItem">
						<Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
					</Nav.Item>
					<Nav.Item className="s-navItem">
						<Nav.Link eventKey={CONNECTIONS_KEY}>Connections</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content className="flex-grow-1 h-100 s-context">
					<Tab.Pane eventKey={CONTACTS_KEY}>
						<Contacts />
					</Tab.Pane>
					<Tab.Pane eventKey={CONNECTIONS_KEY}>
						<Connections />
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
			<div className="position-relative">
				<Button
					variant="dark"
					className="position-absolute rounded-circle d-flex justify-content-center align-items-center
					p-3"
					style={{ top: "-5rem", left: "1rem" }}
					onClick={() => setModal(!modal)}
					title={openConnections ? "Add Connections" : "Add contact"}
				>
					<FaPlus />
				</Button>
			</div>
			<div className="p-2 small text-white">
				Your id: <span className="text-muted">{id}</span>
			</div>

			<Modal show={modal} onHide={setModal}>
				{openConnections ? (
					<NewConnections closeModal={closeModal} />
				) : (
					<NewContacts closeModal={closeModal} />
				)}
			</Modal>
		</div>
	);
}

export default Sidebar;
