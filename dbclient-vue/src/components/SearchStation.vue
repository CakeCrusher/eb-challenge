<template>
  <form>
    <label htmlFor="station">Currently searching station: </label>
    <input placeholder="All stations" id="station" ref="inputRef" />
    <button type="submit" @click="onSubmit">Set station</button>
    <button v-if="stationId" @click="onAll">All</button>
  </form>
</template>

<script>
export default {
  name: "SearchStation",
  props: {
    stationId: String,
    setStationId: Function,
  },
  watch: {
    stationId: {
      handler() {
        if (this.$refs.inputRef) {
          this.$refs.inputRef.value = this.stationId;
        }
      },
      immediate: true,
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.setStationId(this.$refs.inputRef.value);
    },
    onAll(e) {
      e.preventDefault();
      this.setStationId("");
    },
  },
};
</script>

<style></style>
