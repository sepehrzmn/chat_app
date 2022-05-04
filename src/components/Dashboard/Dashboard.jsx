import React, { useEffect } from "react";
import { useState } from "react";
import CatPanel from "../CatPanel/CatPanel";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import SidebarMobile from "../SidebarMobile/SidebarMobile";
function Dashboard({ id }) {
	const [menu, setMenu] = useState(false);
	useEffect(() => {
		window.addEventListener("resize", () => {
			setMenu(false);
		});
	});
	return (
		<div
			className="d-flex overflow-hidden position-relative"
			style={{ height: "100vh", padding: "20px", background: "#6b5fde" }}
		>
			<div
				onClick={() => setMenu(!menu)}
				className="position-absolute rounded-circle icon-menu"
			>
				<span
					className="l-multiplied-top "
					style={{
						transform: menu ? "rotate(40deg)" : "rotate(0deg)",
						top: menu ? "25px" : "18px",
					}}
				></span>
				<span
					className="l-multiplied-between"
					style={{
						display: menu ? "none" : "block",
						top: menu ? "30px" : "25px",
					}}
				></span>
				<span
					className="l-multiplied-bottom"
					style={{
						transform: menu ? "rotate(-40deg)" : "rotate(0deg)",
						top: menu ? "25px" : "32px",
					}}
				></span>
			</div>
			{menu && <div className="dark" />}
			<Sidebar id={id} />
			<SidebarMobile menu={menu} id={id} />
			<CatPanel />
		</div>
	);
}

export default Dashboard;
