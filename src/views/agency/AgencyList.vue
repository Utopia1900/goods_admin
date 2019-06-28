<template>
  <div class="animated fadeIn">
    <div style="padding: 10px;">
      <b-col sm="12">
        <div v-if="agencyList.length === 0">
          <span class="fa fa-info">
           暂无数据!
          </span>
        </div>
        <div v-else>
          <b-table hover :items="agencyList" :fields="fields" class="responsive">
            <template slot="action" slot-scope="row">
              <span><b-button variant="success" @click="updateGood(row.item.id)">修改</b-button></span>
              <span><b-button variant="primary" @click="deleteGood(row.item.id)">删除</b-button></span>
            </template>
          </b-table>
        </div>
      </b-col>
    </div>
    <div style="padding: 15px;border-top: 1px solid #a4b7c1">
      <b-button variant="primary" @click="addLevel">添加级别</b-button>
      <b-modal id="level_modal" centered title="填写级别信息">
        <p class="my-4">
          <b-form-group
            label-cols-sm="2"
            label="名称:"
            label-align-sm="center"
            label-for="level_name"
          >
            <b-form-input id="level_name"></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="2"
            label="描述:"
            label-align-sm="center"
            label-for="level_desc"
          >
            <b-form-input id="level_desc"></b-form-input>
          </b-form-group>
        </p>
        <div slot="modal-footer" class="w-100">
          <b-btn size="md" class="float-right" variant="danger" @click="cancel">
            取消
          </b-btn>
          <b-btn size="md" class="float-right" variant="primary" @click="ok">
            确定
          </b-btn>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AgencyList',
    data () {
      return {
        agencyList: [],
        fields: [
          {
            key: 'id',
            label:'级别',
            class: 'id'
          },
          {
            key: 'name',
            label: '名称',
            class: 'name'
          }
        ]
      }
    },
    methods: {
      getAgencyLevel () {
        let _this = this
        const token = window.sessionStorage.getItem('token')
        let options = {
          method: 'POST',
          data: JSON.stringify({ token }),
          url: '/getAgencyLevel'
        }
        this.$http(options).then(res => {
          let data = res.data
          if (!data.errcode) {
            _this.agencyList = data
          } else {
            // error code here
          }
        }).catch(e => {
          console.error(e)
        })

      },
      addLevel () {
        this.$root.$emit('bv::show::modal', 'level_modal')
      },
      ok () {

      },
      cancel () {
        this.$root.$emit('bv::hide::modal', 'level_modal')
      }
    },
    created () {
      this.getAgencyLevel()
    }
  }
</script>

<style scoped>

</style>
