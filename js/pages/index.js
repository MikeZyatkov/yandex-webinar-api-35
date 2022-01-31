import Message from "../components/Message.js";
import Section from "../components/Section.js";
import Form from "../components/Form.js";

const messageSelector = '.message-template';
const messagesWrap = '.messages__list';
const messagesForm = '.messages-form';


const createMessage = (data) => {
    const message = new Message({data}, messageSelector);
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
        messagesList.addItem(createMessage({...data}))
    }
}, messagesForm);

form.render();


const fakeData = [
    {user: 'test', message: 'test message'},
    {user: 'test2', message: 'Привет'}
]

messagesList.renderItems(fakeData)
