import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
    iconfont: 'mdi',
    theme: {
        primary: colors.lightBlue.darken1,
        secondary: colors.yellow.lighten1,
        accent: colors.yellow.lighten1,
    },
});

const vm = new Vue({
    el: '#app',
    data() {
        return {
            socket: io(),
            users: [],
            messages: [],
            messagesOfUser: false,
        };
    },
    render: h => h(App),
    methods: {},
    mounted() {
        this.socket.addEventListener('update users', users => {
            this.users = users;
        });
        this.socket.addEventListener('new user', user => {
            if (this.socket.id !== user.id) {
                this.$root.$emit('notify', `'${user.name}' is online`);
            }
        });
        this.socket.addEventListener('remove user', user => {
            if (user != null && this.socket.id !== user.id) {
                this.$root.$emit('notify', `'${user.name}' is offline`);
            }
        });
        this.socket.addEventListener('receive message', message => {
            if (
                message.to == this.socket.id ||
                message.from == this.socket.id ||
                message.to == 'all'
            ) {
                if (
                    this.messagesOfUser !== message.from &&
                    this.socket.id !== message.from
                ) {
                    const userName = this.users.find(
                        ({ id }) => id == message.from,
                    ).name;
                    this.$root.$emit(
                        'notify',
                        `New message from ${userName} ${message.to == 'all' &&
                            'in ChatApp World'}`,
                    );
                }
                this.messages.push(message);
            }
        });
    },
});
