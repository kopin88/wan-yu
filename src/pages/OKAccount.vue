<template>
  <v-ons-page>
    <data-viewer  :source="source" :thead="thead" :filter="filter" :create="create" :title="title">
      <template slot-scope="props">
        <tr @click="financialYear(animation, props.item)" :key="props.item.id">
          <td class="text-center">{{props.item.name}}</td>
          <td class="text-right"><span style="padding-right:40px">{{props.item.open_balance}}</span></td>
          <td class="text-right"><span style="padding-right:40px">{{props.item.balance}}</span></td>
        </tr>
      </template>
    </data-viewer>

      <v-ons-fab position="bottom right" @click="createFinancialYear = true">
        <v-ons-icon icon="md-plus"></v-ons-icon>
      </v-ons-fab>

      <v-ons-alert-dialog modifier="rowfooter" :visible.sync="createFinancialYear">
        <span slot="title">Create Financial Year</span>
        <v-ons-input float placeholder="Financial Year Name" v-model="year.name" style="width:100%">
        </v-ons-input>
        <template slot="footer">
          <div class="alert-dialog-button" @click="createFinancialYear = false">Cancel</div>
          <div class="alert-dialog-button"  @click="saveFinancialYear" :disabled="isProcessingYear">Save</div>
        </template>
      </v-ons-alert-dialog>
  </v-ons-page>
</template>
<script>
    import DataViewer from '../components/FinancialDataViewer.vue'
    import { get, post, apiDomain } from '../helpers/api'
  	import { toMulipartedForm } from '../helpers/form'
  	import YearShow from '../views/Account/Year/Show.vue'
    export default {
        data() {
            return {
                animation: 'default',
                title: 'Financial Year List',
                create: '/years/create',
                source: apiDomain + '/years',
                thead: [
                    {title: 'FinancialYear', key: 'name', sort: true},
                    {title: 'Opening', key: 'open_balance', sort: true},
                    {title: 'Balance', key: 'balance', sort: true},
                    // {title: 'Remark', key: 'remark', sort: true},
                ],
                filter: [
                  'name', 'open_balance', 'balance'
                ],

                // Create Financial Years
                createFinancialYear: false,
        				year: { name: '' },
        				error: {},
        				isProcessingYear: false,
                yearURL: apiDomain + `/years`,

            }
        },
    		methods: {
          saveFinancialYear() {
            const year = toMulipartedForm(this.year, this.$route.meta.mode)
            post(this.yearURL, year)
              .then((res) => {
                if (res.data.saved) {
                  // Flash.setSuccess(res.data.message)
                }
                location.reload(true);
                this.year.name = "",
                this.createFinancialYear = false
                // this.option.years.push(res.data.year)
                this.isProcessingYear = false
              })
          },
          financialYear(name, data) {
            this.$store.commit('navigator/options', {
              // Sets animations
              animation: name,
              year: data,
              // Resets default options
              callback: () => this.$store.commit('navigator/options', {})
            });

            this.$store.commit('navigator/push', {
              extends: YearShow,
              data() {
                return {
                  animation: name,
                  year: data,
                  title: data.name + "  (ဘ႑ာေရးႏွစ္)"
                }
              }
            });
          }
    		},
        components: { DataViewer }
    }
</script>
