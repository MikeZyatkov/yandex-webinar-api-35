class Form {
    constructor( { addItem }, containerSelector) {
        this._addItem = addItem;
        this._messageSelector = '.form-template';
        this._container = document.querySelector(`${containerSelector}`);
    }

    _submitHandler = (evt) => {
        evt.preventDefault();
        const text = this._view.querySelector('.form_input').value;
        this._addItem({
            user: 'Михаил',
            message: text
        });
    };

    render = () => {
        this._view = document
            .querySelector(this._messageSelector)
            .content
            .querySelector('.form')
            .cloneNode(true);

        this._view.addEventListener('submit', this._submitHandler);

        this._container.append(this._view);
    }

}

export default Form
