const USER_URL = "http://jsonplaceholder.typicode.com/users"

class UserService {
    async fetchAll() {
        const response = await fetch(USER_URL)
        const users = await response.json()
        return users
    }
}
const userService = new UserService()
export default userService


