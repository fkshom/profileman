<template>
  <v-container fluid class="ps-6">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <v-row>
      <v-col cols="10">
        <h1>
          Server
          <v-icon large color="green darken-2" @click="reload">
            mdi-autorenew
          </v-icon>
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="server in this.servers"
        :key="server.name"
      >
        <v-card :loading="server.loading">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              hight="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title>{{ server.name }}</v-card-title>
          <v-card-text>
            <div>
              Power:
              <v-icon :color="server.power | getColor">{{
                server.power | getIcon
              }}</v-icon
              >{{ server.power }}
            </div>
            <div>
              process:
              <v-icon :color="server.process | getColor">{{
                server.process | getIcon
              }}</v-icon
              >{{ server.process }}
            </div>
            <div>
              connection:
              <v-icon :color="server.connection | getColor">{{
                server.connection | getIcon
              }}</v-icon
              >{{ server.connection }}
            </div>
            <div>started: {{ server.started }}</div>
            <div>lastchanged: {{ server.lastchanged }}</div>
            <div>vpn_profile: {{ server.vpn_profile }}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-menu offset-y :close-on-click="true">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="green darken-2" v-bind="attrs" v-on="on">
                  mdi-dots-vertical
                </v-icon>
              </template>
              <v-list>
                <v-subheader>Action</v-subheader>
                <v-list-item v-on:click="restart(server)">
                  <v-list-item-icon>
                    <v-icon large>mdi-restart</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-dialog v-model="dialog" max-width="600px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-list-item-title
                          color="deep-purple lighten-2"
                          v-bind="attrs"
                          v-on="on"
                          >Change Profile</v-list-item-title
                        >
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6">
                                <v-select
                                  :items="['vpn_service1', 'vpn_service2']"
                                  label="VPN Service"
                                  required
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <v-autocomplete
                                  :items="['contry1', 'contry2', 'country3']"
                                  label="Country"
                                  required
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                          >
                            Apply
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item v-on:click="restart(server)">
                  <v-list-item-icon>
                    <v-icon large>mdi-restart</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title color="deep-purple lighten-2"
                      >Restart</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-on:click="restart(server)">
                  <v-list-item-icon>
                    <v-icon large>mdi-transit-connection-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title color="deep-purple lighten-2"
                      >Reconnect</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Server",

  components: { Loading },
  data() {
    return {
      dialog: false,
      isLoading: false,
      fullPage: true,
      servers: [
        {
          loading: false,
          name: "server1",
          power: "on",
          process: "running",
          connection: "connected",
          started: "2021-04-12 12:34:56",
          lastchanged: "2021-05-12 12:34:56",
          vpn_profile: "contry1",
        },
        {
          loading: false,
          name: "server2",
          power: "on",
          process: "running",
          connection: "disconnected",
          started: "2021-04-12 12:34:56",
          lastchanged: "2021-05-12 12:34:56",
          vpn_profile: "contry2",
        },
        {
          loading: false,
          name: "server3",
          power: "on",
          process: "running",
          connection: "disconnected",
          started: "2021-04-12 12:34:56",
          lastchanged: "2021-05-12 12:34:56",
          vpn_profile: "contry3",
        },
        {
          loading: false,
          name: "server4",
          power: "off",
          process: "stop",
          connection: "disconnected",
          started: "2021-04-12 12:34:56",
          lastchanged: "2021-05-12 12:34:56",
          vpn_profile: "contry3",
        },
      ],
    };
  },
  methods: {
    onCancel() {
      console.log("User cancelled the loader.");
    },
    reload() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    restart(server) {
      let t = this.$data.servers.filter((obj) => {
        return obj.name == server.name;
      })[0];
      t.loading = true;

      setTimeout(() => (t.loading = false), 1000);
    },
  },
  filters: {
    getIcon(value) {
      let value_icon_map = {
        on: ["mdi-power", "green"],
        off: ["mdi-power", "red"],
        running: ["mdi-check-circle-outline", "green"],
        stop: ["mdi-alert-circle-outline", "red"],
        connected: ["mdi-transit-connection-variant", "green"],
        disconnected: ["mdi-transit-connection-variant", "red"],
      };
      return value_icon_map[value][0];
    },
    getColor(value) {
      let value_icon_map = {
        on: ["mdi-power", "green"],
        off: ["mdi-power", "red"],
        running: ["mdi-check-circle-outline", "green"],
        stop: ["mdi-alert-circle-outline", "red"],
        connected: ["mdi-transit-connection-variant", "green"],
        disconnected: ["mdi-transit-connection-variant", "red"],
      };
      return value_icon_map[value][1];
    },
  },
};
</script>
