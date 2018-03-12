<template>
	<v-ons-page>
    <page-toolbar :title="'Create Income'"></page-toolbar>
			<v-ons-card style="margin-top:63px">
				<v-ons-row class="mg-top-10">
					<v-ons-col>
						<v-ons-input placeholder="Date" v-model="form.date" float style="width:100%"> </v-ons-input>
						<v-ons-text class="text__danger" v-if="error.date">{{ error.date[0] }}
						</v-ons-text>
					</v-ons-col>
				</v-ons-row>
				<v-ons-row class="mg-top-10">
					<v-ons-col>
						<v-ons-input placeholder="Name" v-focus="infocus" @focus="infocus = true" @blur="infocus = false" v-model="form.name" float style="width:100%"> </v-ons-input>
						<v-ons-text class="text__danger" v-if="error.name">{{ error.name[0] }}
						</v-ons-text>
					</v-ons-col>
				</v-ons-row>
				<v-ons-row class="mg-top-10">
					<v-ons-col>
						<div class="input-group mb-3" v-if="!addInHead">
							<select class="custom-select" id="inputGroupSelect02" v-model="form.in_head_id">
								<option value="" disabled selected><label>Select ...</label></option>
								<option v-for="inhead in inheads" :value="inhead.id">
									{{inhead.name}}
								</option>
							</select>
							<div class="input-group-append" @click="newInHead">
								<label class="input-group-text" for="inputGroupSelect02">
									<v-ons-icon icon="md-plus" v-if="!addInHead"></v-ons-icon>
								</label>
							</div>
						</div>

						<div class="input-group mb-3" v-if="addInHead">
								<input type="text" class="form-control" placeholder="Income Title" v-focus="inheadfocus" @focus="inheadfocus = true" @blur="inheadfocus = false" v-model="inhead.name"> </input>

								<v-ons-text class="text__danger" v-if="error.name">{{ error.name[0] }}
								</v-ons-text>
							<div class="input-group-append" @click="saveInHead">
								<label class="input-group-text" for="inputGroupSelect02">
									<v-ons-icon icon="md-check" v-if="addInHead"></v-ons-icon>
								</label>
							</div>
						</div>
					</v-ons-col>
				</v-ons-row>
				<v-ons-row class="mg-top-10">
					<v-ons-col>
						<v-ons-input placeholder="Amount" v-model="form.amount" float style="width:100%"> </v-ons-input>
						<v-ons-text class="text__danger" v-if="error.amount">{{ error.amount[0] }}
						</v-ons-text>
					</v-ons-col>
				</v-ons-row>
				<v-ons-row class="mg-top-10">
					<v-ons-col>
						<textarea class="textarea" rows="2" style="width:100%" placeholder="Description" float v-model="form.description"></textarea>
						<v-ons-text class="text__danger" v-if="error.description">{{ error.description[0] }}
						</v-ons-text>
					</v-ons-col>
				</v-ons-row>
				<v-ons-row class="mg-top-10">
					<v-ons-col>
						<textarea class="textarea" rows="2" style="width:100%" placeholder="Remark" float v-model="form.remark"></textarea>
						<v-ons-text class="text__danger" v-if="error.remark">{{ error.remark[0] }}
						</v-ons-text>
					</v-ons-col>
				</v-ons-row>
				<v-ons-row class="mg-top-10">
					<v-ons-col>
						<label>Voucher</label>
						<image-upload v-model="form.image"></image-upload>
						<v-ons-text class="text__danger" v-if="error.image">{{"ပံု ထည့္ပါ"}}</v-ons-text>
					</v-ons-col>
				</v-ons-row>
				<v-ons-row class="mg-top-10">
				</v-ons-row>
				<template slot="footer">
					<div class="alert-dialog-button" @click="addIncome = false">Cancel</div>
					<div class="alert-dialog-button"  @click="saveIncome" :disabled="isProcessing">Save</div>
				</template>
			</v-ons-card>
	</v-ons-page>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	// import Flash from '../../../helpers/flash'
	import { get, post, apiDomain } from '../../../helpers/api'
	import { toMulipartedForm } from '../../../helpers/form'

	export default {
		data() {
			return {
				form: {},
				modalVisible: false,
				monthForm: true,
				monthList: {
					'January': 'January',
					'February': 'February',
					'March': 'March',
					'April': 'April',
					'May': 'May',
					'June': 'June',
					'July': 'July',
					'August': 'August',
					'September': 'September',
					'Outober': 'Outober',
					'November': 'November',
					'December': 'December'
				},
				months: [],
				error: {},
				isProcessing: false,
				initializeURL: apiDomain + `/months/create`,
				storeURL: apiDomain + `/months`,
				action: 'Create'
			}
		},
		created() {
			if(this.$route.meta.mode === 'edit') {
				this.initializeURL = apiDomain + `/months/${this.$route.params.year}/edit/${this.$route.params.id}`
				this.storeURL = apiDomain + `/months/${this.$route.params.id}?_method=PUT`
				this.action = 'Update'
			}
			get(this.initializeURL)
				.then((res) => {
					Vue.set(this.$data, 'form', res.data.form)
					Vue.set(this.$data, 'months', res.data.months)
				})
		},
		methods: {
			showModal() {
				this.modalVisible = true
			},
			save() {
				const form = toMulipartedForm(this.form, this.$route.meta.mode)
				post(this.storeURL, form)
				    .then((res) => {
				        if(res.data.saved) {
				            // Flash.setSuccess(res.data.message)
				            // this.$router.push(`/months/${res.data.id}`)
										this.$router.back()
				        }
				        this.isProcessing = false
				    })
				    .catch((err) => {
				        if(err.response.status === 422) {
				            this.error = err.response.data
				        }
				        this.isProcessing = false
				    })
			}
		}
	}
</script>
