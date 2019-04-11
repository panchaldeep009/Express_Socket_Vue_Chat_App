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
        };
    },
    render: h => h(App),
    methods: {},
    mounted() {
        this.socket.addEventListener('update users', users => {
            this.users = users;
        });
        this.socket.addEventListener('receive message', message => {
            this.messages.push(message);
        });
    },
});
