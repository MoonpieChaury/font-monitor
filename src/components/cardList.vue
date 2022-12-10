<template>
  <div class="card-list">
    <div v-for="(item, index) in cardList" :key="index" class="card">
      <p>{{ item.title }}</p>
      <p class="card-value">{{ item.value }}</p>
      <p>
        较昨日 <span :class=" item.rate[0] === '-' ?  'card-rate3' :
        item.rate[0] === '+' ?  'card-rate2' : ''" class="card-rate"
      >{{ item.rate }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardList",
  props: {
    cardList: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.card-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  width: 100%;
  //background-color: @comp-back;
  .card {
    background-color: @comp-back;
    width: 320px;
    height: 130px;
    border-radius: 8px;
    color: @tit-color;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .card-value {
      padding: 15px 0;
      font-size: 35px;
      font-weight: 600;
      color: @font-color;
    }

    .card-rate {
      color: @font-color;
      font-weight: 600;
    }

    .card-rate3 {
      color: @high-light-green;
    }

    .card-rate2 {
      color: @high-light-pink;
      //font-weight: 600;
    }
  }
}
</style>
