<template>
  <div class="comp-content">
    <v-card elevation="24" dark color="#26c6da" max-width="300" width="100%">
      <v-card-title>
        <v-icon large left>account_circle</v-icon>
        <span class="title font-weight-light">Name your Avatar</span>
      </v-card-title>

      <v-layout column align-center justify-center style="padding: 1em">
        <v-avatar color="red">
          <span class="white--text headline">{{newName.length ? newName.substring(1, 0) : '*'}}</span>
        </v-avatar>
        <v-text-field label="Your Name" :value="name" v-model="newName"></v-text-field>
        <v-btn outline large round color="white" @click="changeNames">Save</v-btn>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
    name: 'register',
    props: ['name'],
    data() {
        return {
            newName: '',
        };
    },
    methods: {
        changeNames: function() {
            this.$root.$emit('change_avatar', this.newName);
        },
    },
    mounted() {
        this.newName = this.name;
    },
};
</script>

<style lang="scss" scoped>
.comp-content {
    width: 100%;
    height: 500px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
}
</style>
