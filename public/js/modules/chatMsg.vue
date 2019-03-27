<template>
    <p :class="'new-message ' + matchID && 'my-message'" >
        <span>{{msg.message.name}}</span>
        {{msg.message.content}}
    </p>
</template>
<script>
export default {
    props: ['msg'],
    data() {
        return {
            matchID: this.$parent.socketID == this.msg.id
        }
    },
}
</script>
