<template>
  <v-ons-page>
    <v-ons-card @click="customerPush(animation, customers)"
    >
      <div class="title">Customer List</div>
      <div class="content">Customer details</div>
    </v-ons-card>
    <v-ons-card @click="supplierPush(animation, suppliers)"
    >
      <div class="title">Supplier List</div>
      <div class="content">Supplier details</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import CustomerIndex from '../views/POS/Customer/Index.vue';
import SupplierIndex from '../views/POS/Supplier/Index.vue';
// import CustomerIndex from '../views/POS/Customer/Index.vue';
import { get, apiDomain, imgUrl } from '../helpers/api';

export default {
  data () {
    return {
      animation: 'default',
      customers: [],
      suppliers: [],
    };
  },
  created() {
    get( apiDomain + `/customers`)
      .then((res) => {
        this.customers = res.data.customers
      })
    get( apiDomain + `/suppliers`)
      .then((res) => {
        this.suppliers = res.data.suppliers
      })
  },
  methods: {
    customerPush(name, data) {
      this.$store.commit('navigator/options', {
        // Sets animations
        animation: name,
        customers: data,
        // Resets default options
        callback: () => this.$store.commit('navigator/options', {})
      });

      this.$store.commit('navigator/push', {
        extends: CustomerIndex,
        data() {
          return {
            animation: name,
            customers: data,
            title: "Customer List"
          }
        }
      });
    },
    supplierPush(name, data) {
      this.$store.commit('navigator/options', {
        // Sets animations
        animation: name,
        suppliers: data,
        // Resets default options
        callback: () => this.$store.commit('navigator/options', {})
      });

      this.$store.commit('navigator/push', {
        extends: SupplierIndex,
        data() {
          return {
            animation: name,
            suppliers: data,
            title: "Supplier List"
          }
        }
      });
    }
  }
};
</script>

<style>
.intro {
  text-align: left;
  padding: 0 22px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(0, 0, 0, .54);
}

ons-card {
  cursor: pointer;
  color: #333;
}

.card__title, .card--material__title {
  font-size: 20px;
}
</style>
