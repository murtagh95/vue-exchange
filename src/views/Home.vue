<template>
  <div>
    <div class="flex justify-center">
      <bounce-loader
        :loading="isLoading"
        :color="'#68d391'"
        :size="100"
      ></bounce-loader>
    </div>
    <px-assets-table v-if="!isLoading" v-bind:assets="assets"></px-assets-table>
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
      isLoading: false,
    };
  },

  async created() {
    this.isLoading = true;
    try {
      this.assets = await CoinCap.getAssets();
    } catch (error) {
      this.$router.push({
        name: "error",
      });
    }

    this.isLoading = false;
  },
};
</script>
