<template>
  <div>
    <router-link class="btn btn-light" to="/form">
      投稿画面
    </router-link>
    <br><br>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="task in tasks">{{ task.name }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tasks: []
      }
    },
    async mounted(){
      const result = await this.$fb.firestore()
        .collection("tasks")
        .orderBy("date","desc")
        .where("date", ">=", "2020-07-10")
        .get()
      this.tasks = result.docs.map(d=>d.data())
    }
  }
</script>

<style>
</style>
