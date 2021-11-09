<template>
    <div>
           <div class="form-group">
                <label for="password">Password</label>
                    <input type="password" v-model="password" id="password" name="password" class="form-control" :class="{ 'is-invalid': $v.password.$error }" />
                    <div v-if="$v.password.$error" class="invalid-feedback">
                        <span v-if="!$v.password.required">Password is required</span>
                        <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
                    </div>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                    <input type="password" v-model="confirmPassword" id="confirmPassword" name="confirmPassword" class="form-control" :class="{ 'is-invalid': $v.confirmPassword.$error }" />
                    <div v-if="$v.confirmPassword.$error" class="invalid-feedback">
                        <span v-if="!$v.confirmPassword.required">Confirm Password is required</span>
                        <span v-else-if="!$v.confirmPassword.sameAsPassword">Passwords must match</span>
                </div>
            </div>
        </div>
</template>

<script>

import { required, minLength, sameAs } from "vuelidate/lib/validators"

export default {
    data() {
    return {
       password: "",
       confirmPassword: "",
    }
  },
  validations: {
        password: { required, minLength: minLength(6) },
        confirmPassword: { required, sameAsPassword: sameAs('password') },
  },
  methods: {
    validate() {
      this.$v.$touch();
      var isValid = !this.$v.$invalid
      this.$emit('on-validate', this.$data, isValid)
      return isValid
    }
  }
}
</script>