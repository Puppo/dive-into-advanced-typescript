import { expectTypeOf } from "expect-type";

type Colors = `#${string}`;

const HEX_RED = "#ff0000" satisfies Colors;
const HEX_GREEN = "#00ff00" satisfies Colors;
const HEX_BLUE = "#0000ff" satisfies Colors;

expectTypeOf<typeof HEX_RED>().toMatchTypeOf<Colors>();
expectTypeOf<typeof HEX_RED>().toMatchTypeOf<"#ff0000">();
expectTypeOf<typeof HEX_GREEN>().toMatchTypeOf<Colors>();
expectTypeOf<typeof HEX_GREEN>().toMatchTypeOf<"#00ff00">();
expectTypeOf<typeof HEX_BLUE>().toMatchTypeOf<Colors>();
expectTypeOf<typeof HEX_BLUE>().toMatchTypeOf<"#0000ff">();
