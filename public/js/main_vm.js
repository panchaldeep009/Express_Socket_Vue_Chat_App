import ChatMessage from '../js/modules/chatMessage.js';

const socket = io();

const vm = new Vue({
    data : {
        socketID: "",
        nickname: "",
        message: "",
        messages: [],
    },
    methods: {
        dispatchMessage() {
            socket.emit('chat message', {
                content: this.message,
                name: this.nickname ||  "Anonymous"
            });
        }
    },
    components: {
        newmessages: ChatMessage,
    }
}).$mount('#app');
const logConnect = (s) => {
    vm.socketID = s.sId;
    console.log(s.message);
}
const appendMessage = (msg) => {
    vm.messages.push(msg);
}
socket.addEventListener('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);