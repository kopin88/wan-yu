<template>
    <balance-data-viewer :source="source" :thead="thead" :filter="filter">
        <template scope="props">
            <tr>
            <!-- <tr @click="$router.push('/suppliers/' + props.item.id)"> -->
              <!-- <td>
                <div class="media-objectimg-thumbnail">
                  <img :src="'/images/' + props.item.image" class="img-circle img-thumbnail" style="height:80px; width:80px">

                </div>
              </td> -->
              <td>{{props.item.code}}</td>
              <td>{{props.item.name}}<br>{{props.item.company}}</td>
              <!-- <td>
                <span v-for="(phone, i) in props.item.phones">
                    <span>{{ phone.phone }}</span><br>
                  </span>
                </td> -->
                <td class="text-right"><span style="padding-right:40px">{{props.item.rem_balance}}</span></td>
              </tr>
        </template>
    </balance-data-viewer>
</template>
<script>
    import BalanceDataViewer from '../../components/BalanceDataViewer.vue'

    export default {
        name: 'BalanceSupplier',
        data() {
            return {
                source: '/api/balance/suppliers',
                thead: [
                    // {title: 'Image', key: 'image', sort: false},
                    {title: 'Code', key: 'code', sort: true},
                    {title: 'Name', key: 'name', sort: true},
                    // {title: 'Phone', key: 'phones.phone', sort: false},
                    {title: 'Remaining', key: 'rem_balance', sort: true}
                ],
                filter: [
                  'name','code', 'nrc','company', 'address','email','image', 'rem_balance',
                  // Phone
                  'phones.phone'

                ]
            }
        },
        components: {
            BalanceDataViewer
        }
    }
</script>
