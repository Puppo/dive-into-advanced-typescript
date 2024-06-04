import { expectTypeOf } from "expect-type";

type Colors = string;

const HEX_RED: Colors = "#ff0000";
const HEX_GREEN: Colors = "#00ff00";
const HEX_BLUE: Colors = "#0000ff";

expectTypeOf<typeof HEX_RED>().toMatchTypeOf<Colors>();
expectTypeOf<typeof HEX_RED>().toMatchTypeOf<"#ff0000">();
expectTypeOf<typeof HEX_GREEN>().toMatchTypeOf<Colors>();
expectTypeOf<typeof HEX_GREEN>().toMatchTypeOf<"#00ff00">();
expectTypeOf<typeof HEX_BLUE>().toMatchTypeOf<Colors>();
expectTypeOf<typeof HEX_BLUE>().toMatchTypeOf<"#0000ff">();
