import userService from "./user-service.js"

class UserTableComponent extends HTMLElement {
    #users
    constructor() {
        super();
        this.attachShadow({mode: "open"})
    }
    async connectedCallback() {
        console.log("connected")
        this.#users = await userService.fetchAll()
        console.log("connected", this.#users)
        this.#render()
    }
    #render() {
        const headerTemplate = document.getElementById("header")
        const table = /* html */`
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody id = "body"></tbody>
        </table>`

        this.shadowRoot.innerHTML = table
        const tbody = this.shadowRoot.getElementById("body")
        console.log("body",tbody)
        this.#users.forEach(user => {
            const row = tbody.insertRow()
            row.innerHTML= /* html */`
                <td>${user.id}</td><td>${user.name}</td>
            `
        })
    }
}
customElements.define("user-table", UserTableComponent)


