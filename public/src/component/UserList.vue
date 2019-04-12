<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Connected Users</v-toolbar-title>
        </v-toolbar>

        <v-list two-line>
          <v-list-tile
            avatar
            @click="$root.$emit('openMessages', { id: 'all', name: 'ChatApp World'})"
          >
            <v-list-tile-avatar color="blue">
              <v-icon dark>group</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>ChatApp World</v-list-tile-title>
              <v-list-tile-sub-title>{{worldMassges()}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader v-if="users.length == 0">No Users are connected</v-subheader>
          <template v-for="(user, index) in users">
            <v-list-tile :key="user.id" avatar @click="$root.$emit('openMessages', user)">
              <v-list-tile-avatar color="red">
                <span class="white--text headline">{{user.name.substring(1, 0)}}</span>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{user.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{sendStaus(user.id)}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    name: 'userList',
    props: ['users'],
    data() {
        return {
            my_id: this.$root.$data.socket.id,
        };
    },
    methods: {
        sendStaus(uID) {
            const newMessages = this.$root.$data.messages
                .slice(0)
                .filter(
                    message =>
                        message.to == this.my_id &&
                        message.from == uID &&
                        message.status == 0,
                ).length;
            return newMessages > 0 ? newMessages + ' new messages' : 'online';
        },
        worldMassges() {
            const newMessages = this.$root.$data.messages
                .slice(0)
                .filter(message => message.to == 'all' && message.status == 0)
                .length;
            return newMessages > 0 ? newMessages + ' new messages' : 'online';
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
