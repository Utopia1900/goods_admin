<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card v-if="isNoMyselfOrderRecords">
          <span class="fa fa-info">
           暂无数据！
          </span>
        </b-card>
        <b-card v-else >
          <b-table hover :items="myselfOrderData" :fields="fields" class="responsive">
            <template slot="createdAt" slot-scope="row">{{formatDate(row.value)}}</template>
            <template slot="payArrivalMoney" slot-scope="row">{{row.value == null ? '0' : row.value}}</template>
            <template slot="arriveTime" slot-scope="row">
              <span>{{row.value == null? '无': formatDate(row.value)}}</span>
            </template>
            <template slot="status" slot-scope="row">
              <span v-html="formatStatus(row.value, row.item.respMsg)"></span>
            </template>
            <template slot="action" slot-scope="row">
              <span><b-button variant = "primary" @click = "checkStatus(row.item.id)">查看状态</b-button></span>
            </template>
          </b-table>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalMyselfOrderRows" :per-page="perPage" v-model="currentMyselfOrderPage" class="my-0" />
          </b-col>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="orderStatusModal" :title="modalInfo.title">
      <p>订单({{orderId}})当前状态为：{{result}}</p>
      <div slot="modal-footer" class="w-100">
        <p class="float-left"></p>
        <b-btn size="md" class="float-right" variant="danger" @click="iKnow">
          知道了
        </b-btn>
      </div>
    </b-modal>
  </div>

</template>

<script>
  import config from '@/config/config.js'
  import '@/config/dateFormat.js'
  const url = config.request.url
  const timeout = config.request.timeout
  export default {
    name: 'orderList',
    data () {
      return {
        fields: [
          {
            key: 'id',
            label: '订单号',
            class: 'id'
          },
          // {
          //   key: 'merchantId',
          //   label: '商户ID',
          //   class: 'merchantId'
          // },
          {
            key: 'mName',
            label: '商户名',
            class: 'mName'
          },
          {
            key: 'amount',
            label: '金额(元)',
            class: 'amount'
          },
          {
            key: 'channelName',
            label: '支付方式',
            class: 'channelName'
          },
          {
            key: 'rate',
            label: '费率(%)',
            class: 'rate'
          },
          {
            key: 'withdrawFee',
            label: '手续费(元)',
            class: 'withdrawFee'
          },
          {
            key: 'payArrivalMoney',
            label: '到账金额(元)',
            class: 'payArrivalMoney'
          },
          {
            key: 'status',
            label: '状态',
            class: 'status'
          },
          {
            key: 'createdAt',
            label: '创建时间',
            class: 'createdAt'
          },
          {
            key: 'arriveTime',
            label: '到账时间',
            class: 'arriveTime'
          },
          {
            key: 'action',
            label: '操作',
            class: 'actions'
          }
        ],
        modalInfo: {title: '提示', index: '', content: '', status: ''},
        myselfOrderData: [],
        totalMyselfOrderRows: 0,
        currentMyselfOrderPage: 1,
        isNoMyselfOrderRecords: true,
        myLevelOrderData: [],
        totalMyLevelOrderRows: 0,
        currentMyLevelOrderPage: 1,
        isNoMyLevelOrderRecords: true,
        perPage: 10,
        modalVisible: false,
        ok: true,
        myselfSelected: '0',
        myselfOptions: [
          { text: '全部', value: '0' },
          { text: '成功', value: '1' }
        ],
        myLevelSelected: '0',
        myLevelOptions: [
          { text: '全部', value: '0' },
          { text: '成功', value: '1' }
        ],
        orderId: '',
        result: ''
        // showItem: null,
        // detailModal: {title: '订单详情'}
      }
    },
    methods: {
      getOrderList (type, pageIndex, pageSize, selected) {
        let that = this
        let formData = {
          token: window.sessionStorage.getItem('token'),
          type: type,
          pageIndex: pageIndex,
          pageSize: pageSize
        }
        if (selected === '1') {
          formData.status = 1
        }
        this.modalVisible = true
        this.$http.post(url + 'order/list', formData, {
          'header': {
            'content-type': 'application/json'
          },
          timeout: timeout
        }).then(res => {
          // success cb
          that.modalVisible = false
          return res.json()
        }, res => {
          // fail cb
          that.modalVisible = false
        }).then(res => {
          if (!res.errcode) {
            let rows = res.rows
            switch (type) {
              case 0:
                if (rows.length !== 0) {
                  that.isNoMyselfOrderRecords = false
                  that.myselfOrderData = rows
                  that.totalMyselfOrderRows = res.records
                } else {
                  that.isNoMyselfOrderRecords = true
                }
                break
              case 1:
                if (rows.length !== 0) {
                  that.isNoMyLevelOrderRecords = false
                  that.myLevelOrderData = rows
                  that.totalMyLevelOrderRows = res.records
                } else {
                  that.isNoMyLevelOrderRecords = true
                }
                break
            }
          }
        })
      },
      formatStatus (status, respMsg) {
        if (respMsg) {
          return `<span style="color:darkred;font-size: 10px">「收款失败」：${respMsg}</span>`
        } else {
          switch (status) {
            case '0':
              return "<span style='background-color:#777;color: #fff;padding: 4px;'>等待支付</span>"
            case '1':
              return "<span style='color:#fff;background-color: red;padding: 4px;'>扣款失败</span>"
            case '2':
              return "<span style='color:#fff;background-color: orange;padding: 4px;'>收款失败(已扣款)</span>"
            case '3':
              return "<span style='color:#fff;background-color: #777;padding:4px;'>正在支付...</span>"
            case '4':
              return "<span style='color:#fff;background-color: #5cb85c;padding: 4px;'>收款成功</span>"
            default:
              return "<span style='color:darkred;font-size: 10px'>收款失败</span>"
          }
        }
      },
      formatDate (date) {
        let parseDate = Date.parse(date)
        let reqDate = (new Date(parseDate)).FormatDate('yyyy-MM-dd hh:mm:ss')
        return reqDate
      },
      checkStatus (orderId) {
        let formData = {
          token: window.sessionStorage.getItem('token'),
          orderId: orderId
        }
        this.$http.post(url + 'order/check-status', formData, {
          'header': {
            'content-type': 'application/json'
          },
          timeout: timeout
        }).then(res => {
          let response = res.data
          if (!response.errcode) {
            this.orderId = orderId
            this.result = response.data.result
            this.$root.$emit('bv::show::modal', 'orderStatusModal')
          }
        }, res => {
          // fail cb
        })
      },
      iKnow () {
        this.$root.$emit('bv::hide::modal', 'orderStatusModal')
      }
    },
    mounted () {

    },
    watch: {
      currentMyselfOrderPage: function (val) {
        this.myselfOrderData = this.getOrderList(0, val, this.perPage, this.myselfSelected)
      },
      currentMyLevelOrderPage: function (val) {
        this.myLevelOrderData = this.getOrderList(1, val, this.perPage, this.myLevelSelected)
      },
      myselfSelected: function (val) {
        this.myselfOrderData = this.getOrderList(0, 1, this.perPage, val)
      },
      myLevelSelected: function (val) {
        this.myLevelOrderData = this.getOrderList(1, 1, this.perPage, val)
      }
    }
  }
</script>
<style>
  .ok{
    color: #1eee07;
  }
  /*修改代码块背景色及字体颜色*/
  .theme .editor-preview-side pre, .theme .editor-preview pre{
    color: #abb2bf !important;
    background: #282c34 !important;
  }
  .detailLabel{
    color:#00aced;
    padding-left: 30px;
  }
  .bankListUl {
    height: 200px;
    border: 1px solid #ccc;
    overflow: auto;
    display: block;
    position: absolute;
    width: 200px;
    padding-left: 5px;
  }
  .bankList{
    list-style: none;
    border-bottom:  1px solid #ccc;
  }
  .bankList:hover {
    cursor: pointer;
  }
  .list-group-item {
    padding: 0.25rem 1.0rem;
  }
  h1{
    font-size: 30px;
    text-align: center;
    color:#666666 ;
  }
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
  }
  /*设置表头背景色*/
  table.responsive th{
    background-color: #ffffff;
  }
  /*设置连接颜色*/
  table.responsive .actions a{
    color: #ff5c00;
    text-decoration: none;
    padding: 0 4px;
  }
  /*设置表格内容为居中对齐*/
  table.responsive .number,table.responsive .actions{
    text-align: center;
  }

  @media(max-width:480px) {
    table.responsive {
      box-shadow: none;
      border: none;
    }

    table.responsive thead {
      display: none;
    }

    /*把所有的tr,td进行块状分布*/
    table.responsive tr, table.responsive td {
      display: block;
      border: none;
      position: relative;
    }

    table.responsive tr {
      margin-bottom: 1em;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .2);
    }

    table.responsive .id {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .id::before {
      content: "订单号";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }

    table.responsive .merchantId {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .merchantId::before {
      content: "商户ID";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }

    table.responsive .amount {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .mName::before {
      content: "商户名";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }

    table.responsive .mName {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .amount::before {
      content: "金额";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }

    table.responsive .channelName {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .channelName::before {
      content: "支付方式";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }

    table.responsive .rate {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .rate::before {
      content: "费率(%)";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }

    table.responsive .withdrawFee {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .withdrawFee::before {
      content: "手续费";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }

    table.responsive .payArrivalMoney {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .payArrivalMoney::before {
      content: "到账金额";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }
    table.responsive .status {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .status::before {
      content: "状态";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }
    table.responsive .createdAt {
       font-size: 13px;
       text-align: left;
       padding-left:40%;
     }

    table.responsive .createdAt::before {
      content: "创建时间";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }
    table.responsive .arriveTime {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .arriveTime::before {
      content: "到账时间";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }
    table.responsive .actions {
      font-size: 13px;
      text-align: left;
      padding-left: 40%;
    }

    table.responsive .actions::before {
      content: "操作";
      position: absolute;
      left: .5em;
      top: .5em;
      font-weight: bold;
    }
  }
</style>
