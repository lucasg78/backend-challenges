const fs = require("fs");

class UserManager {
    constructor(path) {
        this.idCounter = 1;
        this.path = path;
    }

    async getUsers() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, { encoding: "utf-8" });
                return JSON.parse(data);
            } else {
                console.log("No users registered");
                return [];
            }
        } catch (error) {
            console.error("Error getting users:", error.message);
            return [];
        }
    }

    async addUser(name, email, password) {
        if (!name || !email || !password) {
            console.error("ERROR: Incomplete user data");
            return;
        }

        try {
            const usersFile = await this.getUsers();

            if (usersFile.some(user => user.email === email)) {
                console.error(`ERROR: User with email ${email} already exists`);
                return;
            }

            const user = {
                id: this.idCounter++,
                name: name,
                email: email,
                password: password,
            };

            usersFile.push(user);

            await fs.promises.writeFile(this.path, JSON.stringify(usersFile, null, 4));

            console.log(`User registered: Name: ${name} - Email: ${email} - Id: ${user.id}`);
        } catch (error) {
            console.error("Error adding user:", error.message);
        }
    }

    async clearUsers() {
        try {
            await fs.promises.writeFile(this.path, '[]'); // Write an empty array to the file
            console.log("Users cleared. File is now empty.");
        } catch (error) {
            console.error("Error clearing users:", error.message);
        }
    }
}

const manager = new UserManager('./files/products.json');

const app = async () => {
    let users = await manager.getUsers();
    if (users.length === 0) {
        console.log("No users available.");
    } else {
        console.log(users);
    }
};

const run = async () => {
    await manager.addUser('Lucas', 'lucas@hotmail.com', 'abc123');
    await manager.addUser('Juan', 'juan@hotmail.com', 'cba321');
    await manager.addUser('Pedro', 'pedrog@hotmail.com');
    await app();

    // Introduce a 3-second delay before clearing users
    setTimeout(async () => {
        let usersBeforeClear = await manager.getUsers(); // Get users before clearing
        if (usersBeforeClear.length > 0) {
            await manager.clearUsers(); // Clear users from the file if there are users
            console.log("No users available.");
        }
        // No need to call app() after clearing users
    }, 1000);
};

run();
