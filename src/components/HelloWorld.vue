<template>
  <v-container>
    <v-form class="border-frame">
      <v-form-base :model="facts" :schema="mySchema" :col="6" @input="log" />
    </v-form>
  </v-container>
</template>

<script lang="ts">
import VFormBase from "vuetify-form-base";

// More Info to Mask https://vuejs-tips.github.io/vue-the-mask/
const mask = "####-####-####-####";
// Accept only Images Files
const accept = "image/*";

import { Engine, Rule } from "js-rules-engine";
import { Component, Vue } from "vue-property-decorator";
import { Schema, FieldType, Field } from "@/schema";

@Component({
  components: { VFormBase },
})
export default class HelloWorld extends Vue {
  engine: Engine = new Engine();
  ruleObject = {
    and: [
      {
        fact: "first",
        operator: "equals",
        value: "hans",
      },
    ],
  };
  // const rule: VisibilityRule = new VisibilityRule(ruleJson, engine);
  rule = new Rule(this.ruleObject, this.engine);
  fields = [
    { id: "first", type: FieldType.TEXT },
    { id: "second", type: FieldType.TEXT, visibilityRules: this.rule },
  ];
  schema = new Schema("id", "name", "desc", this.fields);
  facts = {};
  mySchema = {};

  log(msg) {
    console.log(msg);
    this.mySchema = this.schema.toVFormBaseSchema(this.facts);
  }

  async mounted() {
    this.mySchema = this.schema.toVFormBaseSchema(this.facts);
    this.mySchema.second.hidden = true;
  }

  verifyRules() {
    /// check all fields with rules
    // and update schema
  }
}
</script>

<style scoped></style>
