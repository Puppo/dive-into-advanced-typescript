import { expectTypeOf } from "expect-type";

const COLORS = {
	RED: "red",
	GREEN: "green",
	BLUE: "blue",
} as const;

type Colors = (typeof COLORS)[keyof typeof COLORS];

const RED = "red" satisfies Colors;
const GREEN = "green" satisfies Colors;
const BLUE = "blue" satisfies Colors;

expectTypeOf<typeof RED>().toMatchTypeOf<Colors>();
expectTypeOf<typeof RED>().toMatchTypeOf<"red">();
expectTypeOf<typeof RED>().toMatchTypeOf<typeof COLORS.RED>();
expectTypeOf<typeof GREEN>().toMatchTypeOf<Colors>();
expectTypeOf<typeof GREEN>().toMatchTypeOf<"green">();
expectTypeOf<typeof GREEN>().toMatchTypeOf<typeof COLORS.GREEN>();
expectTypeOf<typeof BLUE>().toMatchTypeOf<Colors>();
expectTypeOf<typeof BLUE>().toMatchTypeOf<"blue">();
expectTypeOf<typeof BLUE>().toMatchTypeOf<typeof COLORS.BLUE>();
