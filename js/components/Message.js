class Message {
    constructor({data, handleDeleteButtonClick}, messageSelector) {
        this._user = data.user;
        this._text = data.message;
        this._id = data._id;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._messageSelector = messageSelector;
    }

    _getTemplate() {
        const messageElement = document
            .querySelector(this._messageSelector)
            .content
            .querySelector('.message')
            .cloneNode(true);

        return messageElement;
    }

    removeMessage() {
        this._element.remove();

        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.message__delete-button')
            .addEventListener('click', () => this._handleDeleteButtonClick(this))
    }

    getId() {
        return this._id;
    }

    getView() {
        this._element = this._getTemplate();
        this._element.querySelector('.message_user').textContent = `${this._user}:`;
        this._element.querySelector('.message__text').textContent = this._text;

        this._setEventListeners();

        return this._element;
    }

}

export default Message;
