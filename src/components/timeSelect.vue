<template>
  <div class="chart-timeSelect">
    <div>
      <span class="chart-showTime">时间范围 : {{ dateRange }} 天</span>
      <span class="chart-showTime">{{ dateStart }} - {{ dateEnd }}</span>
    </div>
    <DatePicker :options="dateOptions" :placeholder="date"
                format="yyyy/MM/dd" placement="bottom-end"
                style="width: 200px" type="daterange"
                @on-change="pickDate">
    </DatePicker>
  </div>
</template>

<script>
import { DatePicker } from "view-design";

export default {
  name: "timeSelect",
  components: { DatePicker },
  data() {
    return {
      dateRange: 1,
      dateStart: "2022/12/10",
      dateEnd: "2022/12/10",
      //datePicker datas
      date: new Date().toLocaleDateString(),
      dateOptions: {
        disabledDate(date) {
          return date.valueOf() >= Date.now();
        }
      }
    };
  },
  methods: {

    pickDate(date) {
      let start = date[0].split("/")[2];
      let end = date[1].split("/")[2];
      this.dateRange = parseInt(end) - parseInt(start) + 1;
      //sign up the date changing event
      this.$emit("changeDate", this.dateRange);
      this.dateStart = date[0];
      this.dateEnd = date[1];
    }
  }
};
</script>

<style lang="less" scoped>
.chart-timeSelect {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .chart-showTime {
    color: @tit-color;
    font-weight: 600;
    font-size: 18px;
    margin-right: 50px;
  }
}
</style>
<style lang="less">
.ivu-select-dropdown {
  font-size: 12px;
}
</style>
