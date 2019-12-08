const { USERNAME, PASSWORD } = process.env;
const userRepository = {
    login(username, password) {
        return (username === USERNAME && password === PASSWORD)
    }
};

module.exports = {
    userRepository
}