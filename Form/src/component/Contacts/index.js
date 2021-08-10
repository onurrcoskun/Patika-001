import { useState, useEffect } from "react";

import "./style.css";

import List from "./List";
import Form from "./Form";

function Contacts() {
	const [contacts, setContacts] = useState([
		{
			fullname: "Onur",
			phone_number: "123",
		},
		{
			fullname: "Ali",
			phone_number: "98",
		},
		{
			fullname: "Nil",
			phone_number: "91",
		},
	]);

	useEffect(() => {
		console.log(contacts);
	}, [contacts]);

	return (
		<div id="container">
			<h1>Contacts</h1>
			<List contacts={contacts} />
			<Form addContact={setContacts} contacts={contacts} />
		</div>
	);
}

export default Contacts;