<template>
  <v-card flat>
    <v-toolbar color="blue" style="opacity: 0.5" dark extended flat></v-toolbar>

    <v-layout row pb-2>
      <v-flex xs10 md6 offset-md3 offset-xs1>
        <v-card class="card--flex-toolbar">
          <v-toolbar color="blue" dark card prominent>
            <v-btn icon>
              <v-icon
                color="white"
                @click="messagesOfUser = false"
              >{{messagesOfUser ? 'arrow_back' : 'chat'}}</v-icon>
            </v-btn>
            <v-toolbar-title class="title">{{App}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-avatar v-if="avatar" color="red" @click="unRegisterUser">
              <span class="white--text headline">{{name.length ? name.substring(1, 0) : '*'}}</span>
            </v-avatar>
            <v-toolbar-title v-if="avatar" class="body-2">{{name}}</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text v-if="!avatar" class="card-content">
            <Register name/>
          </v-card-text>
          <v-card-text v-if="messagesOfUser" class="card-content">
            <MessagesView :messages="$root.messages" :user="messagesOfUser"/>
          </v-card-text>
          <div v-if="avatar" class="chatBox">
            <UserList
              v-if="!messagesOfUser"
              :users="$root.$data.users.slice(0).filter(({id}) => id !== $root.$data.socket.id)"
            />
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Register from './component/Register';
import UserList from './component/UserList';
import MessagesView from './component/MessagesView';

export default {
    name: 'app',
    data() {
        return {
            App: 'Welcome to chat app',
            avatar: false,
            name: '',
            messagesOfUser: false,
        };
    },
    components: { Register, UserList, MessagesView },
    methods: {
        unRegisterUser() {
            this.avatar = false;
            this.$root.$data.socket.emit('unregister user');
        },
    },
    mounted() {
        this.$root.$on('change_title', title => {
            this.App = title;
        });
        this.$root.$on('change_avatar', name => {
            this.avatar = true;
            this.name = name;
            this.$root.$data.socket.emit('register user', name);
        });
        this.$root.$on('openMessages', user => {
            this.messagesOfUser = user;
        });
    },
};
</script>

<style lang="scss">
* {
    font-family: 'Roboto', sans-serif;
}
.card--flex-toolbar {
    margin-top: -64px;
}
.card-content {
    min-height: 200px;
    display: relative;
}
.chatBox {
    width: 100%;
    display: flex;
}
</style>
