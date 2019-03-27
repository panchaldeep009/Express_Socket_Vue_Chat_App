export default {
    props: ['msg'],
    template: 
            `<p class="new-message" :class="{ 'my-message' : matchID }" >
                <span>{{msg.message.name}}</span>
                {{msg.message.content}}
            </p>`,
    data() {
        return {
            matchID: this.$parent.socketID == this.msg.id
        }
    },
}