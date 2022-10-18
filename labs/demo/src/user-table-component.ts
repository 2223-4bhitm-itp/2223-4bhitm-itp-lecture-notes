import userService from "./user-service"
import {User} from "./model/user"

class UserTableComponent extends HTMLElement {
    private users: [User]
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }
    async connectedCallback() {
        this.users = await userService.fetchAll()
        console.log("connected", this.users)
        this.#render()
    }
    #render() {
        const headerTemplate = document.getElementById("header")
        //const header = headerTemplate.content.cloneNode(true)
        //this.shadowRoot.appendChild(header)
        const tableTemplate = document.querySelector("template")
        const table = tableTemplate.content.cloneNode(true)

        this.shadowRoot.appendChild(table)
        const tbody = this.shadowRoot.querySelector("tbody")
        console.log("body", tbody)
        this.users.forEach(user => {
            const row = tbody.insertRow()
            row.innerHTML =  `
                <td>${user.id}</td><td>${user.name}</td>`
        })

    }
}
customElements.define("user-table", UserTableComponent)