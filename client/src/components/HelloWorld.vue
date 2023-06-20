<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">

      <h1 class="text-h4 font-weight-bold py-8">Add an image</h1>

      <v-row class="d-flex align-center justify-center">
        <v-col cols="6">
          <v-file-input accept="image/*" label="image" @update:model-value="value => inputFile = value" />
        </v-col>

      </v-row>
      <v-row no-gutters class="d-flex align-center justify-center">
        <v-col cols="2" class="pr-2">
          <v-text-field label="retention time" v-model="retentionTime" />
        </v-col>
        <v-col cols="2">
          <v-select label="retention units" :items="Object.values(RetentionUnits)" v-model="chosenRetentionUnit" />
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn color="primary" @click="upload" size="x-large" variant="flat" class="mb-6">
            Submit
          </v-btn>


          {{ retentionTime }}
          {{ chosenRetentionUnit }}
          {{ inputFile }}
        </v-col>
      </v-row>


      <v-dialog v-model="showUrlModal" width="550">
        <v-card>
          <v-card-text>
            <v-text-field readonly append-icon="mdi-clipboard" @click:append="copyURL">
              {{ currentURL }}
            </v-text-field>

          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="showUrlModal = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="isUrlCopied" :timeout="snackTimeout">
        URL Copied

        <template v-slot:actions>
          <v-btn color="blue" variant="text" @click="isUrlCopied = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { uploadImage } from '@/apis/imageAPIs'
import { calcRetention, RetentionUnits } from '@/utils/timeCalculation'

const inputFile = ref(undefined as unknown as File[])
const retentionTime = ref(1)
const chosenRetentionUnit = ref(RetentionUnits.Minutes)
const showUrlModal = ref(false)
const currentURL = ref(null)
const isUrlCopied = ref(false)
const snackTimeout = 2000

const upload = async () => {
  const retentionMilli = calcRetention(retentionTime.value, chosenRetentionUnit.value)
  console.log(retentionMilli)
  const uploadUrl = await uploadImage(inputFile.value[0], retentionMilli)
  if (uploadUrl) {
    console.log(uploadUrl)
    currentURL.value = uploadUrl
    showUrlModal.value = true
  }
}

const copyURL = () => {
  navigator.clipboard.writeText(currentURL.value ?? '')
  isUrlCopied.value = true
}
</script>
