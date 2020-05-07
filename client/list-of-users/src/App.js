import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import axios from 'axios';
import './App.css';

function App() {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({});

	const getData = () => {
		axios
			.get('http://localhost:5000/api/users')
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleInputChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const addUser = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/users', newUser)
			.then(() => {
				getData();
			})
			.catch((err) => {
				console.log(`Error: ${err.response.data.errorMessage}`);
			});
	};

	const deleteUser = (id) => {
		console.log(id);
		axios
			.delete(`http://localhost:5000/api/users/${id}`)
			.then(() => {
				getData();
			})
			.catch((err) => {
				console.log(`Error: ${err}`);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="App">
			<h1>List of Users</h1>
			<div>
				<form onSubmit={addUser}>
					<input
						type="text"
						name="name"
						placeholder="User name"
						value={newUser.name}
						onChange={handleInputChange}
					/>
					<textarea
						type="text"
						name="bio"
						placeholder="User bio"
						value={newUser.bio}
						onChange={handleInputChange}
					/>
					<button>Add user</button>
				</form>
				<UserList
					users={users}
					deleteUser={deleteUser}
					newUser={newUser}
					updateUsers={setUsers}
				/>
			</div>
		</div>
	);
}

export default App;
