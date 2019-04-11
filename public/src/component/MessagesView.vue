<template>
  <div class="container-msg">
    <div v-for="(message, index) in messages.filter(({ to }) => to == user)" :key="index">
      <v-timeline v-if="message.from !== $root.$data.socket.id" class="pice" align-top dense>
        <v-timeline-item>
          <template v-slot:icon>
            <v-avatar color="red">
              <span
                class="white--text headline"
              >{{userName(message.from).length ? userName(message.from).substring(1, 0) : '*'}}</span>
            </v-avatar>
          </template>
          <v-card class="elevation-12">
            <v-card-title class="subheading">{{userName(message.from)}}</v-card-title>
            <v-card-text>{{message.message}}</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <v-timeline
        v-if="message.from == $root.$data.socket.id"
        class="pice"
        align-top
        style="width:160%"
      >
        <v-timeline-item color="amber lighten-1" fill-dot left small>
          <v-card class="elevation-12">
            <v-card-text>{{message.message}}</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>

    <v-toolbar dark color="blue">
      <v-text-field placeholder="Message" v-model="new_message"></v-text-field>
      <v-btn icon @click="sendMessage">
        <v-icon>send</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
    name: 'userList',
    props: ['user', 'messages'],
    data() {
        return {
            new_message: '',
        };
    },
    methods: {
        sendMessage() {
            this.$root.$data.socket.emit('send message', {
                from: this.$root.$data.socket.id,
                to: this.user,
                message: this.new_message,
                time: Date.now(),
                status: 0,
            });
            this.new_message = '';
        },
        userName(s_id) {
            return this.$root.$data.users.find(({ id }) => s_id == id).name;
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
.container-msg {
    overflow-x: hidden;
    overflow-y: hidden;
    .pice {
        margin-left: 10%;
        width: 80%;
    }
}
</style>
