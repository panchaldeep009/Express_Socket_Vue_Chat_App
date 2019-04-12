<template>
  <div>
    <div class="container-msg">
      <div class="chat">
        <div
          v-for="(messages, index) in groupedMessage"
          :key="index"
          :class="messages.from == socket_id ? 'mine messages' : 'yours messages'"
        >
          <template v-for="(message, msg_index) in messages.messages">
            <div
              :key="'msg'+msg_index"
              :class="messages.messages.length == msg_index+1 ? 'message last' : 'message'"
            >{{message.message}}</div>
          </template>
          <span>{{new Date(messages.time).toLocaleTimeString()}}</span>
        </div>
      </div>
      <div ref="messageEnd"></div>
    </div>

    <v-toolbar
      dark
      color="blue"
      style="border-radius: 50px; margin: 20px; width: calc(100% - 40px)"
    >
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
            socket_id: this.$root.$data.socket.id,
            groupedMessage: [],
        };
    },
    methods: {
        sendMessage() {
            if (this.new_message.length > 0) {
                this.$root.$data.socket.emit('send message', {
                    from: this.$root.$data.socket.id,
                    to: this.user.id,
                    message: this.new_message,
                    time: Date.now(),
                    status: 0,
                });
                this.new_message = '';
            }
        },
        userName(s_id) {
            return this.$root.$data.users.find(({ id }) => s_id == id).name;
        },
    },
    watch: {
        messages() {
            const filterMessages = this.messages
                .slice(0)
                .filter(
                    ({ from, to }) =>
                        ((to == this.user.id || from == this.user.id) &&
                            (from == this.socket_id || to == this.socket_id)) ||
                        (to == 'all' && this.user.id == 'all'),
                );
            this.groupedMessage = [];
            filterMessages.forEach((msg, i, allMeg) => {
                if (
                    this.groupedMessage.length !== 0 &&
                    this.groupedMessage[this.groupedMessage.length - 1].from ==
                        msg.from
                ) {
                    this.groupedMessage[
                        this.groupedMessage.length - 1
                    ].messages.push(msg);
                    this.groupedMessage[this.groupedMessage.length - 1].time =
                        msg.time;
                } else {
                    this.groupedMessage.push({
                        from: msg.from,
                        messages: [msg],
                        time: msg.time,
                    });
                }
            });
            this.$nextTick(() => {
                this.$refs.messageEnd.scrollIntoView();
            });
        },
    },
    mounted() {
        this.$root.$emit('change_title', this.user.name);
    },
};
</script>

<style lang="scss" scoped>
.container-msg {
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 300px;
    max-height: 60vh;
    .pice {
        margin-left: 10%;
        width: 80%;
    }
}

.chat {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    span {
        font-size: 12px;
        color: #999;
    }
    .messages {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        .message {
            border-radius: 20px;
            padding: 8px 15px;
            margin-top: 5px;
            margin-bottom: 5px;
            display: inline-block;
        }
    }
    .yours {
        align-items: flex-start;
        .message {
            margin-right: 25%;
            background-color: #eee;
            position: relative;
        }
        .message.last {
            &:before {
                content: '';
                position: absolute;
                z-index: 0;
                bottom: 0;
                left: -7px;
                height: 20px;
                width: 20px;
                background: #eee;
                border-bottom-right-radius: 15px;
            }
            &:after {
                content: '';
                position: absolute;
                z-index: 1;
                bottom: 0;
                left: -10px;
                width: 10px;
                height: 20px;
                background: white;
                border-bottom-right-radius: 10px;
            }
        }
    }

    .mine {
        align-items: flex-end;
        .message {
            color: white;
            margin-left: 25%;
            background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
            background-attachment: fixed;
            position: relative;
        }
        .message.last {
            &:before {
                content: '';
                position: absolute;
                z-index: 0;
                bottom: 0;
                right: -8px;
                height: 20px;
                width: 20px;
                background: linear-gradient(
                    to bottom,
                    #00d0ea 0%,
                    #0085d1 100%
                );
                background-attachment: fixed;
                border-bottom-left-radius: 15px;
            }
            &::after {
                content: '';
                position: absolute;
                z-index: 1;
                bottom: 0;
                right: -10px;
                width: 10px;
                height: 20px;
                background: white;
                border-bottom-left-radius: 10px;
            }
        }
    }
}
</style>
