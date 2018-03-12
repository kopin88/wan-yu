<template>
    <balance-data-viewer :source="source" :thead="thead" :filter="filter">
        <template scope="props">
            <tr>
              <td>{{props.item.code}}</td>
              <td>{{props.item.name}}<br>{{props.item.company}}</td>
                <td class="text-right"><span style="padding-right:40px">{{props.item.rem_balance}}</span></td>
              </tr>
        </template>
    </balance-data-viewer>
</template>
<script>
    import BalanceDataViewer from '../../components/BalanceDataViewer.vue'

    export default {
        name: 'BalanceCustomer',
        data() {
            return {
                source: '/api/balance/customers',
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
