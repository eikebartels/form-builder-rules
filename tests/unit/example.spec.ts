import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

import { Group, Schema, VisibilityRule } from "@/schema";
import { Engine, Rule } from "js-rules-engine";
describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const engine: Engine = new Engine();
    const ruleObject = {
      and: [
        {
          fact: "homeWorld.name",
          operator: "equals",
          value: "Tatooine",
        },
        {
          or: [
            {
              fact: "name",
              operator: "contains",
              value: "Skywalker",
            },
            {
              fact: "eyeColor",
              operator: "equals",
              value: "green",
            },
          ],
        },
      ],
    };
    // const rule: VisibilityRule = new VisibilityRule(ruleJson, engine);
    const rule = new Rule(ruleObject, engine);
    const group: Group = {
      id: "12123",
      name: "first group",
      description: "",
      visibilityRules: rule,
      fields: [],
    };
    const schema: Schema = {
      id: "id",
      name: "Schema",
      description: "bla",
      groups: [group],
    };

    const facts = {
      eyeColor: "blue",
      homeWorld: {
        name: "Tatooine",
      },
      name: "Luke Skywalker",
    };

    console.log(JSON.stringify(schema));

    expect(rule.evaluate(facts)).toBeTruthy();

    // const msg = "new message";
    // const wrapper = shallowMount(HelloWorld, {
    //   propsData: { msg }
    // });
    // expect(wrapper.text()).toMatch(msg);
  });
});
