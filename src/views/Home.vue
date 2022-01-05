<template>
  <div>
    <px-assets-table v-bind:assets="assets"></px-assets-table>
  </div>
</template>

<script>
import CoinCap from "@/api.js";
import PxAssetsTable from "@/components/PxAssetsTable";

export default {
  name: "Home",

  components: { PxAssetsTable },

  data() {
    return {
      assets: [],
    };
  },

  async created() {
    this.assets = await CoinCap.getAssets();
  },
};
</script>
