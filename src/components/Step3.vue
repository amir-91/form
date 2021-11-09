<template>
    <div>
            <div class="form-group">
                                <label for="image">Attach photo</label>
                                <input type="file" @change="onImageChange" id="image" name="image" class="form-control" :class="{ 'is-invalid': $v.image.$error || imageFlag || imgExt }" />
                                <div v-if="$v.image.$error || imgExt || imageFlag " class="invalid-feedback">
                                    <span v-if="!$v.image.required">Photo is required</span>
                                    <span v-if="imgExt">accept png or jpeg only</span> <br>
                                    <span v-if="imageFlag">5 mega only</span>
                                </div>
                            </div>
                              <div class="form-group">
                                <label for="pdf">Attach file</label>
                                <input type="file" @change="onFileChange" id="pdf" name="pdf" class="form-control" :class="{ 'is-invalid': $v.pdf.$error || pdfFlag || pdfExt }" />
                                <div v-if="$v.pdf.$error || pdfFlag || pdfExt" class="invalid-feedback">
                                    <span v-if="!$v.pdf.required">File is required</span>
                                    <span v-if="pdfExt">accept pdf only</span> <br>
                                    <span v-if="pdfFlag">5 mega only</span>
                                </div>
                            </div> 
                            <div class="form-group">
                                <label for="email">Message</label>
                                <textarea name="textarea" rows="6" v-model="textarea" id="textarea" class="form-control" :class="{ 'is-invalid': $v.textarea.$error }"/>
                                <div v-if="$v.textarea.$error" class="invalid-feedback">
                                    <span v-if="!$v.textarea.required">This field is required</span>
                                </div>
                            </div>
        </div>
</template>

<script>

import { required } from "vuelidate/lib/validators"

export default {
    data() {
    return {
        textarea: "",
        image: "",
        pdf: "",
        imageSize: 0,
        pdfSize: 0,
        imageFlag: false,
        pdfFlag: false,
        imageExtension: "",
        pdfExtension: "",
        imgExt: false,
        pdfExt: false
    }
  },
    validations: {
        textarea: { required },
        image: { required },
        pdf: { required }
  },
  methods: {
    validate() {
      this.$v.$touch();
      var isValid = !this.$v.$invalid
      this.$emit('on-validate', this.$data, isValid)
      return isValid
    },
      onImageChange(e) {
              const files = e.target.files || e.dataTransfer.files;
              this.imageSize =files[0].size
              this.imageExtension=files[0].type.split('/')[1]
              if (!files.length)
                return;
              this.createImage(files[0]);
              if (this.imageSize > 500000) {
                    this.imageFlag = true
                } else {
                    this.imageFlag = false
                }
              if (this.imageExtension !== 'jpeg') {
                  this.imgExt = true
              } else {
                  this.imgExt = false
              }
            },
             onFileChange(e) {
              const files = e.target.files || e.dataTransfer.files;
              this.fileSize =files[0].size
              this.pdfExtension=files[0].type.split('/')[1]
              if (!files.length)
                return;
              this.createFile(files[0]);
              if (this.fileSize > 500000) {
                    this.pdfFlag = true
                } else {
                    this.pdfFlag = false
                }
              if (this.pdfExtension !== 'pdf') {
                  this.pdfExt = true
              } else {
                  this.pdfExt = false
              }
            }, 
            createImage(file) {
              const reader = new FileReader();
              const vm = this;

              reader.onload = (e) => {
                vm.image = e.target.result;
              };
              reader.readAsDataURL(file);
            },
             createFile(file) {
              const reader = new FileReader();
              const vm = this;

              reader.onload = (e) => {
                vm.pdf = e.target.result;
              };
              reader.readAsDataURL(file);
            },
  }
}
</script>