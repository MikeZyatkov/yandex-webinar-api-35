import Message from "../components/Message.js";
import Section from "../components/Section.js";
import Form from "../components/Form.js";
import Api from "../components/Api.js";

const messageSelector = '.message-template';
const messagesWrap = '.messages__list';
const messagesForm = '.messages-form';

const api = new Api({
    address: 'https://j1dg73na92.execute-api.eu-central-1.amazonaws.com/api',
    token: 'test'
})


const createMessage = (data) => {
    const message = new Message({
        data,
        handleDeleteButtonClick: () => {
            api.deleteMessage(message.getId())
                .then(() => message.removeMessage())
                .catch(err => console.log(`Ошибка при удалении сообщения: ${err}`))
        }
    }, messageSelector);
    return message.getView()
};

const messagesList = new Section({
        renderer: (data) => {
            messagesList.addItem(createMessage(data));
        }
    }, messagesWrap
);

const form = new Form({
    addItem: (data) => {
        api.addMessage(data)
            .then(result => {
                const message = createMessage({...data, id: result.id});
                messagesList.addItem(message);
            })
            .catch(err => console.log(`Ошибка при создании сообщения: ${err}`))
    }
}, messagesForm);

form.render();


// const fakeData = [
//     {user: 'test', message: 'test message'},
//     {user: 'test2', message: 'Привет'}
// ]

// messagesList.renderItems(fakeData)

api.getMessages()
    .then(messages => {
        messagesList.renderItems(messages);
    })
    .catch(err => console.log(err));
