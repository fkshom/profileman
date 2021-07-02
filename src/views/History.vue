<template>
  <div>
    <h1>History</h1>
    <v-data-table
      :headers="headers"
      :items="history"
      :items-per-page="50"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>


<script>
export default {
  name: "History",

  components: {},
  data() {
    return {
      headers: [
        { text: "datetime", value: "datetime" },
        { text: "user", value: "user" },
        { text: "server", value: "server" },
        { text: "action", value: "action" },
      ],
      history: [
        {
          datetime: "2021-05-14 05:34:28",
          user: "user1",
          server: "server2",
          action: "change profile from A to B",
        },
        {
          datetime: "2021-05-13 12:12:53",
          user: "user2",
          server: "server1",
          action: "change profile from B to C",
        },
        {
          datetime: "2021-05-12 12:34:54",
          user: "user1",
          server: "server1",
          action: "change profile from A to B",
        },
        {
          datetime: "2021-05-18 12:34:54",
          user: "user3",
          server: "server3",
          action: "change profile from B to B",
        },
        {
          datetime: "2021-05-15 12:34:54",
          user: "user4",
          server: "server4",
          action: "change profile from D to B",
        },
        {
          datetime: "2021-05-15 12:34:54",
          user: "user4",
          server: "server5",
          action: "change profile from D to B",
        },
        {
          datetime: "2021-05-15 12:34:54",
          user: "user2",
          server: "server3",
          action: "Restart server process",
        },
        {
          datetime: "2021-05-15 12:34:54",
          user: "user4",
          server: "server5",
          action: "Restart server process",
        },
      ],
    };
  },
};
</script>
