<template>
  <div id="alert" v-if="alertDialog">
    <div>
      <v-alert id="alertMessage"
        color="#9C9BBF"
        dense
        outlined
        text
        type="success"
      >
        {{ $t("" + alertMessage) }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Alert',
  computed: {
    ...mapState(['alertMessage', 'alertDialog']),
  }
}
</script>

<style>

</style>