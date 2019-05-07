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
            key: 'name',
            label: '名称',
            class: 'name'
          },
          {
            key: 'desc',
            label: '描述',
            class: 'desc'
          }
        ]
      }
    },
    methods: {
      addLevel () {
        this.$root.$emit('bv::show::modal', 'level_modal')
      },
      ok () {

      },
      cancel () {
        this.$root.$emit('bv::hide::modal', 'level_modal')
      }
    }
  }
</script>

<style scoped>

</style>
