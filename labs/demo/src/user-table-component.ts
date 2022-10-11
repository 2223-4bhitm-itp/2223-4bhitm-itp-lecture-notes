import userService from "./user-service.js"

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
        const table = /* html */`
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
        
        this.shadowRoot.innerHTML = table
        const tbody = this.shadowRoot.querySelector("tbody")
        console.log("body", tbody)
        this.users.forEach(user => {
            const row = tbody.insertRow()
            row.innerHTML =  `
                <td>${user.id}</td><td>${user.name}</td>`
        })

    }
}
window.customElements.define("user-table", UserTableComponent)