const express = require('express');
const CORS = require('cors');
const shortid = require('shortid');

const server = express();
server.use(express.json());
server.use(CORS());

let users = [
	{
		id: shortid.generate(),
		name: 'Jane Doe',
		bio: "Not Tarzan's Wife, another Jane",
	},
];

//----------------------------------------------------------------------------------------------------------------
// Create
//----------------------------------------------------------------------------------------------------------------

server.post('/api/users', (req, res) => {
	const userInfo = req.body;
	try {
		if (!userInfo.name || !userInfo.bio) {
			res
				.status(400)
				.json({ errorMessage: 'Please provide name and bio for the user.' });
		} else {
			userInfo.id = shortid.generate();
			users.push(userInfo);
			if (res.status === 500) {
				res.status(500).json({
					errorMessage: 'There was an error while saving the user to the database.',
				});
			} else {
				res.status(201).json(userInfo);
			}
		}
	} catch {
		res.status(500).json({errorMessage: "There was an error while saving the user to the database"});
	}
});

//----------------------------------------------------------------------------------------------------------------
// Read
//----------------------------------------------------------------------------------------------------------------

server.get('/api/users', (req, res) => {
	
		if (users) {
			res.status(200).json(users);
		} else {
			res
				.status(500)
				.json({ errorMessage: 'The users information could not be retrieved.' });
		}
	
	
});

//----------------------------------------------------------------------------------------------------------------
// Read with ID
//----------------------------------------------------------------------------------------------------------------

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;

	const found = users.find((user) => {
		return user.id == id;
	});

	if (found) {
		users = users.filter((user) => user.id === id);
		res.status(200).json(found);
	} else {
		res
			.status(500)
			.json({ errorMessage: 'The users information could not be retrieved.' });
	}
});

//----------------------------------------------------------------------------------------------------------------
// Delete
//----------------------------------------------------------------------------------------------------------------

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;

	const found = users.find((user) => {
		return user.id == id;
	});
	try {
		if (found) {
			users = users.filter((user) => user.id !== id);
			res.status(200).json(found);
		} else {
			res
				.status(404)
				.json({ message: 'The user with the specified ID does not exist.' });
		}
	}
	catch {
		res.status(500).json({errorMessage: "The user could not be removed"})
	}
	
});

//----------------------------------------------------------------------------------------------------------------
// Update - put
//----------------------------------------------------------------------------------------------------------------

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;

	const changes = req.body;
	try {
		if (!id) {
			res
				.status(404)
				.json({ message: 'The user with the specified ID does not exist.' });
		}
		if (!changes.bio || !changes.name) {
			res
				.status(400)
				.json({ errorMessage: 'Please provide name and bio for the user.' });
		}
	
		users = users.map((user) => {
			if (user.id === id) {
				return changes;
			} else {
				return user;
			}
		});
		res.status(200).json(req.body);
	}
	catch {
		res.status(500).json({error:"erro"});
	}
	
});

server.get('/', function (req, res) {
	res.send('App is working 👍');
});

const PORT = 5000;

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
