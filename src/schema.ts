import { Rule } from "js-rules-engine";

export enum FieldType {
  TEXT,
  CURRENCY,
}

export class VisibilityRule extends Rule {}

export interface Field {
  id: string;
  type: FieldType;
  visibilityRules: VisibilityRule;

  toDom: () => Element;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  visibilityRules: VisibilityRule | null;
  fields: Field[];
}

export interface Schema {
  id: string;
  name: string;
  description: string;
  groups: Group[];
}

type Facts = { [name: string]: number };

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
