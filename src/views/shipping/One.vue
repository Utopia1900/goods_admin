<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card v-if="shippingList.length === 0">
          <span class="fa fa-info">
           暂无数据!
          </span>
        </b-card>
        <b-card v-else >
          <div style="padding-bottom: 8px;">
            <date-picker :date="paidDate" :option="option" :limit="limit" style="border-bottom: 1px solid #000;"></date-picker>
            <b-button variant="outline-primary">导出</b-button>
          </div>
          <b-table hover :items="shippingList" :fields="fields" class="responsive">
            <template slot="paidTime" slot-scope="row">{{formatDate(row.value)}}</template>
            <template slot="action" slot-scope="row">
              <span><b-button variant = "primary" @click = "delivery(row.item.id)">发货</b-button></span>
            </template>
          </b-table>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import moment from 'moment'
import myDatePicker from 'vue-datepicker/vue-datepicker-es6'
export default {
  name: 'one',
  components: {
    'date-picker': myDatePicker
  },
  data: ()=>{
    return {
      shippingList: [],
      totalRows: 0,
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: 'name',
          label: '收件人',
          class: 'name'
        },
        {
          key: 'id',
          label: '订单号',
          class: 'id'
        },
        {
          key: 'products',
          label: '购买信息',
          class: 'products'
        },
        {
          key: 'mobile',
          label: '电话',
          class: 'mobile',
        },
        {
          key: 'address',
          label: '地址',
          class: 'addresss'
        },
        {
          key: 'amount',
          label: '总金额',
          class: 'amount'
        },
        {
          key: 'paidTime',
          label: '下单时间',
          class: 'paidTime'
        },
        {
          key: 'action',
          label: '操作',
          class: 'action'
        }
      ],
      paidDate: {
        time: moment().format('YYYY-MM-DD')
      },
      limit: [{
        type:'fromto',
        from:'',
        to:moment().format('YYYY-MM-DD')
      }],
      option: {
        type: 'day',
        week: ['一', '二', '三', '四', '五', '六', '日'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD',
        placeholder: '选择支付日期',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '15px',
          'border': '0',
          'border-radius': '0',
          'color': '#666',
          'width': '85%'
        },
        color: {
          checkedDay: '#33a8d8',
          header: '#33a8d8',
          headerText: 'white'
        },
        buttons: {
          ok: '确定',
          cancel: '取消'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      }
    }
  },
  methods: {
    getShippingList () {
      this.shippingList = [
        {id: '111111', name: '张山', products:'dddd', mobile: '13476175050',address:'湖北省武汉市南山区', amount: 300, paidTime:'2019-01-23' },
        {id: '222222', name: '张山', products:'dddd', mobile: '13476175050',address:'湖北省武汉市南山区', amount: 300, paidTime:'2019-01-23' },
        {id: '333333', name: '张山', products:'dddd', mobile: '13476175050',address:'湖北省武汉市南山区', amount: 300, paidTime:'2019-01-23' },
        {id: '444444', name: '张山', products:'dddd', mobile: '13476175050',address:'湖北省武汉市南山区', amount: 300, paidTime:'2019-01-23' },
        {id: '555555', name: '张山', products:'dddd', mobile: '13476175050',address:'湖北省武汉市南山区', amount: 300, paidTime:'2019-01-23' }
        ]
      this.totalRows = 1
    },
    formatDate (date) {
      let parseDate = Date.parse(date)
      let reqDate = (new Date(parseDate)).FormatDate('yyyy-MM-dd hh:mm:ss')
      return reqDate
    },
    delivery (id) {
      console.log('delivery id', id)
    }
  },
  created() {
    this.getShippingList()
  },
  watch: {
    currentPage: function (val) {
      // code here with page change
    }
  }
}
</script>
<style>
  table.responsive{
    width: 100%;
    margin: 0 auto;
    border: 1px solid #cccccc;
    border-collapse:collapse;
    /**
    box-shadow: 0 0 10px 0 rgba(0,0,0,5);
    **/
  }
  table.responsive th,table.responsive td{
    border: 1px solid #cccccc;
    padding: .5em 1em;
    text-align: center;
  }
  /*设置表头背景色*/
  table.responsive th{
    background-color: #ffffff;
  }
</style>
