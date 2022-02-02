class Api {
    constructor({address, token}) {
        this._address = address;
        this._token = token;
    }

    _handleResponse = (response) => {
        response.ok
            ? response.json()
            : Promise.reject(`Ошибка ${response.status}`)
    }

    getMessages() {
        return fetch(`${this._address}/messages`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    addMessage(data) {
        return fetch(`${this._address}/messages`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user,
                message: data.message
            })
        }).then(this._handleResponse)
    }

    deleteMessage(id) {
        return fetch(`${this._address}/messages/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(this._handleResponse)
    }

}

export default Api;
