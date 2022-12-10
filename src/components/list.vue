<template>
  <div class="com-list-container">
    <div class="errorList-container">
      <div class="error-frequent">
        <div>
          <Table :columns="tableHead" :data="tableData">
            <!--        api overview list show-->
            <!--                      <div v-show="true">-->
            <template slot="status" slot-scope="{ row }">
            <span
              :class="row.status[0] === 404 ? 'not-found' : row.status[0] === 500 ? 'http' : row.status[0] === 200 ? 'suc' : row.status[0] === 400? 'bad-req':''"
              class="first-code"
            >
              {{ row.status[0] }}
            </span>

              <span
                :class="row.status[1] === 404 ? 'not-found' : row.status[1] === 500 ? 'http' : row.status[1] === 200 ? 'suc' : row.status[1] === 400? 'bad-req':''"
              >
              {{ row.status[1] }}
            </span>
            </template>
            <!--                      </div>-->
            <template slot="action" slot-scope="{ row, index }">
              <Button
                size="small"
                style="margin-right: 5px"
                type="primary"
                @click="selectRow(index)"
              >{{ selected }}
              </Button
              >
              <Button size="small" type="error" @click="checkLog"
              >查看
              </Button
              >
            </template>
          </Table>
        </div>
      </div>
    </div>
    <Page :total="pageTotal" show-sizer />
    <Dialog v-if="visi" ref="dialog1" :type="'apiDetailData'"></Dialog>
  </div>
</template>

<script>
import { Table, Page, Button } from "view-design";
import Dialog from "@/components/dialog";

export default {
  name: "list",
  components: {
    Table,
    Page,
    Button,
    Dialog
  },
  props: ["head", "data", "pageFrom"],
  data() {
    return {
      selected: "筛选",
      pageTotal: 100,
      //apiOverview datas
      tableHead: [],
      tableData: [],

      //api datas
      tableHeadAE: [],
      tableDataAE: [],

      // showPage:'apiOverview',
      visi: false
    };
  },
  watch: {
    "pageFrom": function(o, n) {
      // this.showPage = n;
      this.init();
    },
    "data": function(o, n) {
      this.init();
    }
  },
  methods: {
    init() {
      this.tableHead = this.head;
      this.tableData = this.data;
      // if(this.pageFrom !='apiOverview'){
      //   for()
      // }
      // this.showPage = this.pageFrom;
      // console.log(this.showPage);
    },
    selectRow(index) {
      if (this.selected === "取消筛选") {
        this.tableData = this.data;
        this.selected = "筛选";
        this.pageTotal = 100;
      } else {
        let data = this.tableData[index];
        this.tableData = [data];
        this.selected = "取消筛选";
        this.pageTotal = 1;
      }
    },
    checkLog() {
      // this.checkDia = true;
      // console.log(this.checkDia);
      this.visi = true;
      this.$nextTick(() => {
        //init调用的是dialog组件里面的init方法
        this.$refs.dialog1.init();
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.errorList-container {
  span {
    color: @font-color;
    border-radius: 4px;
    font-size: 14px;
    padding: 3px;
    font-weight: bold;
    opacity: 0.9;
  }

  .first-code {
    margin-right: 6px;
  }

  .not-found {
    background-color: @high-light-pink;
  }

  .http {
    background-color: @high-light-blue;
  }

  .suc {
    background-color: @high-light-green;
  }

  .bad-req {
    background-color: @high-light-orange;
  }
}
</style>

<style lang="less">
.com-list-container {
  //width: inherit;
  background-color: @body-back;
  //position: relative;
  .errorList-container {
    margin-top: 26px;
    color: @tit-color;
    //ive-table stuff
    .ivu-table-header {
      background-color: @comp-back;
    }

    .ivu-table th {
      background-color: @comp-back;
      border-bottom: 2px solid @high-light-blue;
    }

    .ivu-table-header thead tr th {
      //border-bottom: 2px solid @high-light-blue;
      background-color: @comp-back;
      color: @font-color;
      font-weight: bolder;
      font-size: 18px;
    }

    .ivu-table-column:first-child {
      width: 900px;
    }

    .ivu-table td {
      background-color: @comp-back;
      //border: 1px solid transparent;
      border: none;
      border-bottom: 1px solid @body-back;
    }

    .ivu-table {
      border: 1px solid @comp-back;
    }

    .ivu-table::before {
      height: 0;
    }

    .ivu-table {
      .ivu-table-tbody tr:last-child td {
        border: 1px solid transparent;
      }

      .ivu-table-overflowX {
        overflow-x: hidden;
        overflow-y: hidden;
      }
    }

    .ivu-table-header {
      colgroup {
        display: flex;
        justify-content: space-between;
      }

      colgroup col:first-child {
        flex: 1;
      }

      colgroup col {
      }

      tr {
        display: flex;
        justify-content: space-between;

        th:first-child {
          flex: 1;
          text-align: left;
          //padding-left: 20px;
        }

        th {
          width: 10% !important;
          text-align: center;
          font-size: 18px;
          font-weight: 800;
          padding-left: 0;
          padding-right: 0;
        }

        //th:last-child {
        //  width: 19% !important;
        //}
      }
    }

    .ivu-table-body {
      colgroup {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      colgroup col:first-child {
        flex: 1;
      }

      .ivu-table-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        td:first-child {
          flex: 1;
          text-align: left;
          padding-left: 20px;
        }

        td {
          width: 10% !important;
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          color: @tit-color;
          height: 50px;
          padding-left: 0;
          padding-right: 0;
        }

        //td:last-child {
        //  width: 19% !important;
        //}
      }

      .ivu-table-cell {
        line-height: 50px;
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

  //ivu-page stuff
  .ivu-page {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    color: @tit-color;

    .ivu-page-prev,
    .ivu-page-next,
    .ivu-select-selection {
      background-color: @comp-back;
      border: none;
      color: @font-color;

      a {
        color: @font-color;
      }
    }

    .ivu-page-item {
      background-color: @comp-back;
      border: none;

      a {
        font-size: 14px;
        color: @font-color;
      }
    }

    .ivu-page-item-active {
      background-color: @high-light-blue;
      //border: none;
      a {
        color: @comp-back;
        font-weight: bold;
      }
    }

    .ivu-select-dropdown {
      background-color: @comp-back;
      border: 1px solid @body-back;
      padding-top: 0;
      padding-bottom: 0;

      .ivu-select-item {
        color: @tit-color;
        border-bottom: 1px solid @body-back;
      }

      .ivu-select-item-selected {
        color: @high-light-blue;
      }
    }
  }
}
</style>
