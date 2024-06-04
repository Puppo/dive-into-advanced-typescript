import { expectTypeOf } from "expect-type";

type Colors = string;

const RED: Colors = "red";
const GREEN: Colors = "green";
const BLUE: Colors = "blu";

expectTypeOf<typeof RED>().toMatchTypeOf<Colors>();
expectTypeOf<typeof RED>().toMatchTypeOf<"red">();
expectTypeOf<typeof GREEN>().toMatchTypeOf<Colors>();
expectTypeOf<typeof GREEN>().toMatchTypeOf<"green">();
expectTypeOf<typeof BLUE>().toMatchTypeOf<Colors>();
expectTypeOf<typeof BLUE>().toMatchTypeOf<"blue">();
