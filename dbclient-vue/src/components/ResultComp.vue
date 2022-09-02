<template>
  <tr>
    <td>
      <button @click="onSetStationId">
        {{ dataItem.stationId }}
      </button>
    </td>
    <td>{{ dataItem.date }}</td>
    <td>{{ dataItem.element }}</td>
    <td>{{ dataItem.dataValue }}</td>
    <td>{{ dataItem.mFlag }}</td>
    <td>{{ dataItem.qFlag }}</td>
    <td>{{ dataItem.sFlag }}</td>
    <td>{{ dataItem.obsTime }}</td>
  </tr>
</template>

<script>
export default {
  name: "ResultComp",
  components: {},
  props: {
    dataItem: Object,
    setStationId: Function,
  },
  methods: {
    onSetStationId() {
      this.setStationId(this.dataItem.stationId);
    },
  },
};
</script>

<style></style>
