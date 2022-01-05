<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader
        :loading="isLoading"
        :color="'#68d391'"
        :size="100"
      ></bounce-loader>
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            class="w-20 h-20 mr-5"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span># {{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
      <line-chart
        class="my-10"
        :color="['orange']"
        :min="min"
        :max="max"
        :data="charData"
      >
      </line-chart>
    </template>
  </div>
</template>
<script>
import CoinCap from "@/api.js";

export default {
  name: "CoinDetail",

  data() {
    return {
      asset: {},
      history: [],
      historyPrice: [],
      isLoading: false,
    };
  },

  async created() {
    await this.getCoin();
  },

  computed: {
    min() {
      return Math.min(...this.historyPrice);
    },
    max() {
      return Math.max(...this.historyPrice);
    },

    avg() {
      return Math.abs(...this.historyPrice);
    },

    charData() {
      const data = [];
      this.history.map((h) => {
        data.push([h.date, parseFloat(h.priceUsd).toFixed(2)]);
      });
      return data;
    },
  },

  methods: {
    async getCoin() {
      const id = this.$route.params.id;
      this.isLoading = true;

      Promise.all([CoinCap.getAsset(id), CoinCap.getAssetHistory(id)])
        .then(([asset, history]) => {
          this.asset = asset;
          this.historyPrice = history.map((e) =>
            parseFloat(e.priceUsd).toFixed(2)
          );
          this.history = history;
        })
        .catch(() =>
          this.$router.push({
            name: "error",
          })
        )
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
