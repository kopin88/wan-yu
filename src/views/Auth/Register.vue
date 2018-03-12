<template>

    <div class="content">
        <div class="row">
          <div class="col-md-6 col-sm-12 col-md-offset-3">
            <div class="card">
              <div class="card-header card-chart" data-background-color="green">
                <div class="user">
                  <!-- <div class="photo text-center"><br>
                      <img src="/uploads/images/logo.jpg" alt="" style="width:150px; height:150px; border-radius:50%;" />
                  </div> -->
                  <div class="info text-center">
                    <h4>ZEROS</h4><small>Softwares & Games</small>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <form @submit.prevent="register">
                  <h3 class="form__title">Create an Account</h3>
                  <div class="form__group">
                    <label>Name</label>
                    <input type="text" class="form__control" v-model="form.name">
                    <small class="error__control" v-if="error.name">{{error.name[0]}}</small>
                  </div>
                  <div class="form__group">
                    <label>Email</label>
                    <input type="text" class="form__control" v-model="form.email">
                    <small class="error__control" v-if="error.email">{{error.email[0]}}</small>
                  </div>
                  <div class="form__group">
                    <label>Password</label>
                    <input type="password" class="form__control" v-model="form.password">
                    <small class="error__control" v-if="error.password">{{error.password[0]}}</small>
                  </div>
                  <div class="form__group">
                    <label>Confirm Password</label>
                    <input type="password" class="form__control" v-model="form.password_confirmation">
                  </div>
                  <div class="form__group text-center">
                    <button :disabled="isProcessing" class="btn btn-success btn-round btn-sm">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import Flash from '../../helpers/flash'
    import { post } from '../../helpers/api'
    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                error: {},
                isProcessing: false
            }
        },
        methods: {
            register() {
                this.isProcessing = true
                this.error = {}
                post('api/register', this.form)
                    .then((res) => {
                        if(res.data.registered) {
                            Flash.setSuccess('Congratulations! You have now successfully registered.')
                            // this.$router.push('/login')
                            this.form = ''
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
