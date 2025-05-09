import type { Node } from "unist";

export interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  __rawstring__?: string;
  properties?: {
    __rawstring__?: string;
    [key: string]: unknown;
  };
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
  data?: {
    meta: string;
  };
}

export interface UnistTree extends UnistNode {
  children: UnistNode[];
}
