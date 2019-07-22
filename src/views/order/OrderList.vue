<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <div style="display:flex; flex-direction:row; padding: 15px;">
          开始日期：
          <datepicker
            v-model="beginDate"
            :language="language"
            :format="'yyyy-MM-dd'"
            :disabled-dates="disabledDates"
          />结束日期：
          <datepicker
            v-model="endDate"
            :language="language"
            :format="'yyyy-MM-dd'"
            :disabled-dates="disabledDates"
          />
          <span style="font-size:13px;color:#555555">(说明：默认查询当天之前10天的数据)</span>
        </div>
        <div style="padding-left: 15px;">
          <b-form-group label>
            <b-form-radio-group
              id="radios1"
              v-model="selectedStatus"
              :options="options"
              name="radioOpenions1"
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <b-card v-if="orderList.length === 0">
          <span class="fa fa-info">暂无相关订单</span>
        </b-card>
        <b-card v-else>
          <b-table hover :items="orderList" :fields="fields" class="responsive">
            <template
              slot="time"
              slot-scope="row"
            >{{row.value ? formatDate(row.value, 'yyyy-MM-dd hh:mm:ss'): '无'}}</template>
            <template slot="products" slot-scope="row">
              <div v-for="(item, index) in row.value" :key="index">
                <p style="text-align:left">
                  <img :src="item.headImgUrl" alt style="width:30px;" />
                  <span>{{item.name}}</span>
                  <span>价格:￥{{item.price}}</span>
                  <span style="font-size:13px;color:#666666">数量:{{item.num}}</span>
                </p>
              </div>
            </template>
            <template slot="status" slot-scope="row">
              <span v-html="formatStatus(row.value)"></span>
            </template>
          </b-table>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="total"
              :per-page="perPage"
              v-model="currentPage"
              class="my-0"
            />
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import "@/config/dateFormat.js";
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import { zh } from "vuejs-datepicker/dist/locale";

const setBeginDate = (date = new Date(), days = 10) => {
  let tmp = date.setDate(date.getDate() - days);
  return new Date(tmp);
};

export default {
  name: "orderList",
  components: {
    Datepicker
  },
  data() {
    return {
      orderList: [],
      perPage: 10,
      total: 1,
      currentPage: 1,
      selectedStatus: null,
      options: [
        { text: "全部", value: null },
        { text: "已下单", value: "0" },
        { text: "已发货未确认", value: "2" },
        { text: "已完成", value: "3" }
      ],
      fields: [
        {
          key: "id",
          label: "订单号",
          class: "id"
        },
        {
          key: "amount",
          label: "金额(元)",
          class: "amount"
        },
        {
          key: "products",
          label: "购买产品",
          class: "products"
        },
        {
          key: "status",
          label: "状态",
          class: "status"
        },
        {
          key: "time",
          label: "下单时间",
          class: "time"
        }
      ],
      beginDate: setBeginDate(new Date(), 10),
      endDate: new Date(),
      language: zh,
      disabledDates: {
        from: new Date()
      }
    };
  },
  computed: {
    fBeginDate() {
      return this.formatDate(this.beginDate, "yyyyMMdd");
    },
    fEndDate() {
      return this.formatDate(this.endDate, "yyyyMMdd");
    }
  },
  methods: {
    formatDate(date, rule) {
      let parseDate = Date.parse(date);
      let reqDate = new Date(parseDate).FormatDate(rule);
      return reqDate;
    },
    getOrder(status, page) {
      const token = window.sessionStorage.getItem("token");
      let formData = {
        token,
        page,
        beginDate: this.fBeginDate,
        endDate: this.fEndDate
      };
      if (status) formData.status = status;
      let options = {
        url: "/queryOrder",
        method: "post",
        data: JSON.stringify(formData)
      };
      this.currentPage = page;
      this.$http(options)
        .then(res => {
          var data = res.data;
          if (!data.errcode) {
            this.orderList = data.rows;
            this.total = data.records;
          } else {
            alert(data.errmsg);
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    formatStatus(status) {
      switch (status) {
        case "0":
        case "1":
          return "<span style='background-color:#777;color: #fff;padding: 4px;'>待发货</span>";
        case "2":
          return "<span style='color:#fff;background-color:#20a8d8;padding: 4px;'>待收货</span>";
        case "3":
          return "<span style='color:#fff;background-color: #44ca4e;padding:4px;'>已收货</span>";
      }
    }
  },
  created() {
    this.getOrder(null, 1);
  },
  watch: {
    currentPage: function(val) {
      this.orderList = this.getOrder(this.selectedStatus, val);
    },
    selectedStatus: function(val) {
      this.orderList = this.getOrder(val, 1);
    },
    beginDate: function(val) {
      this.orderList = this.getOrder(this.selectedStatus, 1);
    },
    endDate: function(val) {
      this.orderList = this.getOrder(this.selectedStatus, 1);
    }
  }
};
</script>
<style scoped>
span {
  padding-left: 15px;
}
</style>
