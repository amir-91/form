<template>
    <div>
           <div class="form-group">
                                <label for="Name">Name</label>
                                <input v-model.trim="englishName" @input="$v.englishName.$touch()" id="english-name" name="Name" class="form-control" :class="{ 'is-invalid': $v.englishName.$error }" />
                                <div v-if="$v.englishName.$error" class="invalid-feedback">
                                    <span v-if="!$v.englishName.required">Name is required</span>
                                    <span v-if="!$v.englishName.alpha">Must be english letters only</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="Name">الاسم</label>
                                <input v-model="arabicName" @input="$v.arabicName.$touch()" id="arabic-name" name="Name" class="form-control" :class="{ 'is-invalid': $v.arabicName.$error }" />
                                <div v-if="$v.arabicName.$error" class="invalid-feedback">
                                    <span class="help-block " v-if="!$v.arabicName.required">الاسم مطلوب</span>
                                    <span v-if="!$v.arabicName.arabicAlpha">يجب ان يحتوى على حروف عربى فقط</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="mobile">Mobile number</label>
                                <input v-model="mobile" @input="$v.mobile.$touch()" id="mobile" name="mobile" class="form-control" :class="{ 'is-invalid': $v.mobile.$error }" />
                                <div v-if="$v.mobile.$error" class="invalid-feedback">
                                    <span v-if="!$v.mobile.required">Mobile is required</span>
                                    <span v-if="!$v.mobile.numeric">Must be numbers only</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input v-model="email" @input="$v.email.$touch()" id="email" name="email" class="form-control" :class="{ 'is-invalid': $v.email.$error }" />
                                <div v-if="$v.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.email.required">Email is required</span>
                                    <span v-if="!$v.email.email">Email is invalid</span>
                                </div>
                            </div>
                             <div class="form-group">
                                <label for="nationality">Nationality</label>
                                <select name="nationality" @input="reset" v-model="nationality" id="nationality" class="form-control" :class="{ 'is-invalid': $v.nationality.$error }">
                                     <option value="">-- select one --</option>
                                     <option value="afghan">Afghan</option>
                                     <option value="albanian">Albanian</option>
                                     <option value="algerian">Algerian</option>
                                     <option value="american">American</option>
                                     <option value="andorran">Andorran</option>
                                     <option value="angolan">Angolan</option>
                                     <option value="antiguans">Antiguans</option>
                                     <option value="argentinean">Argentinean</option>
                                     <option value="armenian">Armenian</option>
                                     <option value="australian">Australian</option>
                                     <option value="austrian">Austrian</option>
                                     <option value="azerbaijani">Azerbaijani</option>
                                     <option value="bahamian">Bahamian</option>
                                     <option value="bahraini">Bahraini</option>
                                     <option value="bangladeshi">Bangladeshi</option>
                                     <option value="barbadian">Barbadian</option>
                                     <option value="barbudans">Barbudans</option>
                                     <option value="batswana">Batswana</option>
                                     <option value="belarusian">Belarusian</option>
                                     <option value="Egypt">Egypt</option>
                                 </select>
                                <div v-if="$v.nationality.$error" class="invalid-feedback">
                                    <span v-if="!$v.nationality.required">nationality is required</span>
                                </div>
                            </div>
                             <div v-if="nationality === 'Egypt'" class="form-group">
                                <label for="nationalId">National ID</label>
                                <input v-model="nationalId" id="nationalId" name="nationalId" class="form-control" :class="{ 'is-invalid': $v.nationalId.$error }" />
                                <div v-if="$v.nationalId.$error" class="invalid-feedback">
                                    <span v-if="!$v.nationalId.required">national Id is required</span>
                                    <span v-if="!$v.nationalId.numeric">Must be numbers only</span><br>
                                    <span v-if="!$v.nationalId.maxLength || !$v.nationalId.minLength">Must be 14 digits</span>
                                </div>
                            </div>
                             <div v-if="nationality !== 'Egypt' && nationality !== ''" class="form-group">
                                <label for="passportNumber">Passport number</label>
                                <input v-model="passportNumber" id="passportNumber" name="passportNumber" class="form-control" :class="{ 'is-invalid': $v.passportNumber.$error }" />
                                <div v-if="$v.passportNumber.$error" class="invalid-feedback">
                                    <span v-if="!$v.passportNumber.required">Passport number is required</span>
                                    <span v-if="!$v.passportNumber.numeric">Must be numbers only</span>
                                </div>
                            </div>
    </div>
</template>

<script>
import { required, email, alpha, numeric, helpers, requiredIf, minLength, maxLength } from "vuelidate/lib/validators"
const arabicAlpha = helpers.regex('alpha', /^[\u0621-\u064A\040]+$/)


export default {
     data() {
            return {
                englishName: "",
                arabicName: "",
                mobile: "",
                email: "",
                nationality: "",
                nationalId: "",
                passportNumber: "",
                form: ['englishName', 'arabicName','mobile','email']
            };
        },
        validations: {
                englishName: { required, alpha },
                arabicName: { required, arabicAlpha },
                mobile: { required, numeric },
                email: { required, email },
                nationality: { required },
                nationalId: { 
                    required: requiredIf(function () {
                        const req = this.$v.nationality.$model === 'Egypt'
                        return req
                    }),
                    numeric, 
                    minLength: minLength(14), 
                    maxLength: maxLength(14) 
                    },
                passportNumber: { 
                    required: requiredIf(function() {
                        const req = this.$v.nationality.$model !== 'Egypt'
                        return req
                    }),
                    numeric 
                    },
        },
    methods: {
      validate() {
      this.$v.$touch();
      var isValid = !this.$v.$invalid
      this.$emit('on-validate', this.$data, isValid)
      return isValid
    },
    reset() {
      this.passportNumber = "",
      this.nationalId = ""
    },
    }

}
</script>