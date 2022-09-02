<template>
  <div className="App">
    <header className="App-header">
      <img
        src="https://www.energybot.com/shop/img/nav-bar-logo.e55bc3dc.svg"
        className="App-logo"
        alt="logo"
      />
      <h2>Sebastian Sosa - Energy Bot challenge</h2>
      <SearchStation :stationId="stationId" :setStationId="setStationId" />
      <button v-if="data.length < 1" @click="beginFetching()">
        Begin fetching
      </button>
      <ResultsComp :data="data" :setStationId="setStationId" />
      <button v-if="data.length > 1" @click="fetchMore()">Load More</button>
      <div ref="last" />
    </header>
  </div>
</template>

<script>
import { fetchData } from "./util/hooks";
import ResultsComp from "./components/ResultsComp.vue";
import SearchStation from "./components/SearchStation.vue";
export default {
  name: "App",
  components: {
    ResultsComp,
    SearchStation,
  },
  data() {
    return {
      data: [],
      stationId: "",
    };
  },
  watch: {
    data: {
      handler() {
        if (Object.keys(this.$refs).length) {
          const el = this.$refs.last;
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth" });
            }, 1);
          }
        }
      },
      immediate: true,
    },
    stationId: {
      handler() {
        fetchData(this.data, this.setData, this.stationId);
      },
      immediate: true,
    },
  },
  methods: {
    setData(newData) {
      console.log("setData", newData);
      this.data = newData;
    },
    setStationId(newStationId) {
      this.stationId = newStationId;
    },
    beginFetching() {
      fetchData(this.data, this.setData, this.stationId);
    },
    fetchMore() {
      fetchData(this.data, this.setData, this.stationId, true);
    },
  },
};
</script>

<style>
@import "./index.css";
</style>
