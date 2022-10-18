import {html, render} from "lit-html"

import userService from "./user-service"
import {User} from "./model/user"

const tableTemplate = html`
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<table class="w3-table w3-striped w3-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>name</th>
        </tr>
    </thead>
    <tbody id="body"></tbody>
</table>        
`
const rowTemplate = (user: User) => html`
    <td>${user.id}</td><td>${user.name}</td>
`

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
        render(tableTemplate, this.shadowRoot)
        const tbody = this.shadowRoot.querySelector("tbody")
        console.log("body", tbody)
        this.users.forEach(user => {
            const row = tbody.insertRow()
            row.onclick = () => {
                alert(`user ${user.name} selected`)
                this.dispatchEvent(new CustomEvent("user-selected", {detail: {user}}))
            }
            render(rowTemplate(user), row)
        })
    }
}
customElements.define("user-table", UserTableComponent)