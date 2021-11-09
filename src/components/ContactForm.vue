<template>
    <div>
    <form-wizard shape="square" color="#3498db">
      <tab-content title="Personal details" icon="ti ti-user" :before-change="()=>validateStep('Step1')">
        <step1 ref="Step1" @on-validate="mergePartialModels"></step1>
      </tab-content>
      <tab-content title="Account settings" icon="ti ti-settings" :before-change="()=>validateStep('Step2')">
        <step2 ref="Step2" @on-validate="mergePartialModels"></step2>
      </tab-content>
       <tab-content title="Uploads" icon="ti ti-export" :before-change="()=>validateStep('Step3')">
        <step3 ref="Step3" @on-validate="mergePartialModels"></step3>
      </tab-content>
      <tab-content title="Last step" icon="ti ti-check">
        Here is your final model:
       <pre>{{finalModel}}</pre>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
import {FormWizard, TabContent} from 'vue-form-wizard'

export default {
    data () {
       return {
        finalModel: {},
      }
  },
    components: {
        FormWizard,
        TabContent,
        Step1,
        Step2,
        Step3
    },
    methods: {
    validateStep(name) {
      var refToValidate = this.$refs[name];
      return refToValidate.validate();
    },
    mergePartialModels(model, isValid){
      if(isValid){
      // merging each step model into the final model
       this.finalModel = Object.assign({},this.finalModel, model)
      }
    }
  }
}
</script>