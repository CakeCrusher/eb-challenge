<template>
  <div className="App">
    <table>
      <thead>
        <tr>
          <th>Station ID</th>
          <th>Date</th>
          <th>Element</th>
          <th>Data Value</th>
          <th>M Flag</th>
          <th>Q Flag</th>
          <th>S Flag</th>
          <th>Obs Time</th>
        </tr>
      </thead>
      <tbody :key="item.id" v-for="item in data">
        <ResultComp :dataItem="item" :setStationId="setStationId" />
      </tbody>
    </table>
  </div>
</template>

<script>
import ResultComp from "./ResultComp.vue";
export default {
  name: "ResultsComp",
  components: {
    ResultComp,
  },
  props: {
    data: Array,
    setStationId: Function,
  },
};
</script>

<style></style>
