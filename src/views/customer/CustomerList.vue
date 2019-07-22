<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <div style="display:flex; flex-direction:row; padding: 15px;">
          姓名：
          <input type="text" v-model.trim="name" />
          电话：
          <input type="text" v-model.trim="mobile" />
          昵称：
          <input type="text" v-model.trim="nickname" />
          <button @click="getCustomers(1)">点击查询</button>
        </div>
        <b-card v-if="customerList.length===0">
          <span class="fa fa-info">暂无相关客户</span>
        </b-card>
        <b-card v-else>
          <b-table hover :items="customerList" :fields="fields" class="responsive">
            <template
              slot="birthday"
              slot-scope="row"
            >{{row.value ? formatDate(row.value, 'yyyy-MM-dd'): ''}}</template>
            <template slot="curLevel" slot-scope="row">{{formatLevel(row.value)}}</template>
            <template slot="sex" slot-scope="row">{{formatSex(row.value)}}</template>
            <template slot="id" slot-scope="row">
              <span>
                <b-button variant="success" @click="openLevelDialog(row.item)">设置会员级别</b-button>
              </span>
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
    <b-modal id="levelDialog">
      <p v-if="selectedCustomer">
        <b-list-group>
          <b-list-group-item>
            <span class="customer_label">姓名:</span>
            <span style="color:#20a8d8">{{selectedCustomer.name}}</span>
          </b-list-group-item>
          <b-list-group-item>
            <span class="customer_label">微信昵称:</span>
            <span style="color:#20a8d8">{{selectedCustomer.nickname}}</span>
          </b-list-group-item>
          <b-list-group-item>
            <span class="customer_label">当前级别：</span>
            <span style="color:#20a8d8">{{formatLevel(selectedCustomer.curLevel)}}</span>
          </b-list-group-item>
        </b-list-group>
      </p>
      <p>
        <b-form-select v-model="selected" :options="options">{{options.value}}</b-form-select>
      </p>
      <div slot="modal-footer" class="w-100">
        <b-btn size="md" class="float-right" variant="danger" @click="hideLevelDialog">取消</b-btn>
        <b-btn size="md" class="float-right" variant="primary" @click="chooseLevel">提交设置</b-btn>
      </div>
      <b-alert variant="danger" dismissible :show="hasError" @dismissed="hasError=false">{{errmsg}}</b-alert>
      <b-modal id="confirmDialog" size="sm" title="提示">
        <p>确定要提交此设置吗？</p>
        <div slot="modal-footer" class="w-100">
          <b-btn size="md" class="float-right" variant="danger" @click="hideConfirmDialog">取消</b-btn>
          <b-btn size="md" class="float-right" variant="primary" @click="setCustomerLevel()">确定</b-btn>
          <b-alert
            variant="success"
            dismissible
            :show="sucessBox"
            @dismissed="hasError=false"
          >{{successMsg}}</b-alert>
        </div>
      </b-modal>
    </b-modal>
  </div>
</template>

<script>
import "@/config/dateFormat.js";
export default {
  name: "CustomerList",
  data() {
    return {
      name: "",
      mobile: "",
      nickname: "",
      customerList: [],
      perPage: 10,
      total: 1,
      currentPage: 1,
      selectedCustomer: null,
      selected: null,
      hasError: false,
      errmsg: "",
      sucessBox: false,
      successMsg: "",
      fields: [
         {
          key: "nickname",
          label: "微信昵称"
        },
        {
          key: "name",
          label: "姓名"
        },
       {
         key:"mobile",
         label:"电话"
       },
        {
          key: "province",
          label: "所在省份"
        },
        {
          key: "city",
          label: "所在城市"
        },
        {
          key: "sex",
          label: "性别"
        },
        {
          key: "birthday",
          label: "生日"
        },
        {
          key: "curLevel",
          label: "会员级别"
        },
        {
          key: "orderNum",
          label: "购买订单总数"
        },
        {
          key: "orderAmount",
          label: "购买订单总额"
        },
        {
          key: "id",
          label: "操作"
        }
      ]
    };
  },
  computed: {
    options() {
      let agency = sessionStorage["agency"]
        ? JSON.parse(sessionStorage["agency"])
        : undefined;
      let options = [{ value: null, text: "请选择" }];
      if (agency) {
        Object.keys(agency).forEach((item, index) => {
          options.push({ value: item, text: agency[item] });
        });
      }
      return options;
    }
  },
  methods: {
    formatDate(date, rule) {
      let parseDate = Date.parse(date);
      let reqDate = new Date(parseDate).FormatDate(rule);
      return reqDate;
    },
    formatSex(sex) {
      return sex === "0" ? "男" : sex === "1" ? "女" : "";
    },
    formatLevel(curLevel) {
      let agency = sessionStorage["agency"]
        ? JSON.parse(sessionStorage["agency"])
        : undefined;
      if (agency) {
        return agency[curLevel];
      }
    },
    getCustomers(page) {
      const token = window.sessionStorage.getItem("token");
      let formData = { token, page };
      if (this.name !== "") formData.name = this.name;
      if (this.mobile !== "") formData.mobile = this.mobile;
      if (this.nickname !== "") formData.nickname = this.nickname;
      let options = {
        url: "/customer",
        method: "POST",
        data: JSON.stringify(formData)
      };
      this.currentPage = page;
      this.$http(options)
        .then(res => {
          var data = res.data;
          if (!data.errcode) {
            this.customerList = data.rows;
            this.total = data.total;
          } else {
            console.log(data.errmsg);
            alert(data.errmsg);
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    openLevelDialog(item) {
      this.selectedCustomer = item;
      this.$root.$emit("bv::show::modal", "levelDialog");
    },
    hideLevelDialog() {
      this.selected = null;
      this.$root.$emit("bv::hide::modal", "levelDialog");
    },
    chooseLevel() {
      let selected = this.selected;
      if (!selected) {
        this.hasError = true;
        this.errmsg = "请选择要设置的级别！！";
        setTimeout(() => {
          this.hasError = false;
          this.errmsg = "";
        }, 1500);
      } else {
        this.$root.$emit("bv::show::modal", "confirmDialog");
      }
    },
    hideConfirmDialog() {
      this.$root.$emit("bv::hide::modal", "confirmDialog");
    },
    setCustomerLevel() {
      let customerId = this.selectedCustomer.id;
      let level = parseInt(this.selected);
      let token = sessionStorage["token"];
      let options = {
        url: "setCustomerLevel",
        method: "POST",
        data: JSON.stringify({ token, customerId, level })
      };
      this.$http(options).then(res => {
        this.sucessBox = true;
        let data = res.data;
        if (!data.errcode) {
          this.successMsg = "设置成功";
          setTimeout(() => {
            this.hideLevelDialog();
            this.hideConfirmDialog();
            this.sucessBox = false;
            this.customerList.map(item => {
              if (item.id === customerId) {
                item.curLevel = level;
                return;
              }
            });
          }, 1800);
        } else {
          this.sucessMsg = data.errmsg;
        }
      });
    }
  },
  created() {
    this.getCustomers(1);
  },
  watch: {
    currentPage: function(val) {
      this.customerList = this.getCustomers(val);
    }
  }
};
</script>

<style>
.customer_label {
  width: 80px;
  display: inline-block;
}
</style>
