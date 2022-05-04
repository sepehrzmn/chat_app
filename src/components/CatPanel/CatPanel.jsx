import React, { useState, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConnections } from "../../contexts/ConnectionsProvider";
import "./CatPanel.css";
function CatPanel() {
	const [text, setText] = useState();
	const { sendMessage, selectedConnection } = useConnections();
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);
	function handelSubmit(e) {
		e.preventDefault();
		sendMessage(
			selectedConnection.recipients.map((r) => r.id),
			text
		);
		setText("");
	}

	return (
		<div className="d-flex flex-column flex-grow-1 CatPanel">
			<div className="flex-grow-1 overflow-auto">
				<div className="d-flex flex-column align-items-start justify-content-end px-3">
					{selectedConnection
						? selectedConnection.message.map((message, index) => {
								const lastMessage =
									selectedConnection.message.length - 1 === index;
								return (
									<React.Fragment key={index}>
										<div
											ref={lastMessage ? setRef : null}
											className={`my-1 d-flex flex-column ${
												message.fromMe ? "align-self-end" : "align-self-start"
											} `}
										>
											<div
												className={`rounded px-2 py-1 ${
													message.fromMe
														? "bg-primary text-white"
														: "bg-dark text-white"
												}`}
											>
												{message.text}
											</div>
											<div
												className={`text-muted small ${
													message.fromMe ? "text-end" : ""
												}`}
											>
												{message.fromMe ? "You" : message.senderName}
											</div>
										</div>
									</React.Fragment>
								);
						  })
						: ""}
				</div>
			</div>
			<Form className="ch-form" onSubmit={handelSubmit}>
				<Form.Group>
					<InputGroup>
						<Form.Control
							as="textarea"
							required
							value={text}
							onChange={(e) => setText(e.target.value.trim())}
							className="border-0 p-2"
						/>
						<Button type="submit" className="rounded-0 ">
							send
						</Button>
					</InputGroup>
				</Form.Group>
			</Form>
		</div>
	);
}

export default CatPanel;
