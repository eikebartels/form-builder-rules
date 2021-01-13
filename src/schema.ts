import { Rule } from "js-rules-engine";

type Facts = { [name: string]: number };

export enum FieldType {
  TEXT,
  CURRENCY,
}

export class VisibilityRule extends Rule {}

export interface Field {
  id: string;
  type: FieldType;
  label: string | null;
  visibilityRules: VisibilityRule | null;

  toDom: () => Element;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  visibilityRules: VisibilityRule | null;
  fields: Field[];
}

type FormBaseSchema = any;
export class Schema {
  id: string;
  name: string;
  description: string;
  // groups: Group[];
  fields: Field[];
  constructor(id: string, name: string, description: string, fields: Field[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.fields = fields;
  }

  toVFormBaseSchema(facts: Facts): FormBaseSchema {
    const fields: { [name: string]: any } = {};
    for (const f of this.fields) {
      console.log("Field: ", f.id, f.visibilityRules?.evaluate(facts));

      fields[f.id] = {
        type: "text",
        label: f.id,
        hidden: this.evaluate(f.visibilityRules, facts),
      };
    }
    return fields;
  }

  evaluate(rule: Rule | null, facts: Facts): boolean {
    if (!rule) return false;
    return !rule.evaluate(facts);
  }
}

function buildGroup(group: Group, facts: Facts): Element[] {
  const fieldElements: Element[] = [];
  for (const field of group.fields) {
    if (field.visibilityRules?.evaluate(facts)) {
      const element = document.createElement("input");
      fieldElements.push(element);
    }
  }
  return fieldElements;
}
