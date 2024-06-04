import { expectTypeOf } from "expect-type";
import { type ZodSchema, z } from "zod";

const PasswordSchema = z
	.string()
	.min(8)
	.max(32)
	.refine((value) => {
		return value.match(/[a-z]/) !== null;
	}, "Password must contain at least one lowercase letter")
	.refine((value) => {
		return value.match(/[A-Z]/) !== null;
	}, "Password must contain at least one uppercase letter")
	.refine((value) => {
		return value.match(/[0-9]/) !== null;
	}, "Password must contain at least one number")
	.brand("Password");
const IntegerSchema = z.number().int().brand("Integer");
const FiscalCodeSchema = z.string().min(16).max(16).brand("FiscalCode");

type Password = z.infer<typeof PasswordSchema>;
type Integer = z.infer<typeof IntegerSchema>;

const PersonIdSchema = z.number().int().positive().brand("PersonId");

const PersonSchema = z.object({
	id: PersonIdSchema,
	type: z.literal("person"),
	name: z.string(),
	surname: z.string(),
	fiscalCode: FiscalCodeSchema,
});
type Person = z.infer<typeof PersonSchema>;

const PASSWORD = "Password12345";
const INTEGER = 1;
const PERSON = {
	id: 1,
	type: "person",
	name: "Mario",
	surname: "Rossi",
	fiscalCode: "DRLFOR92M21M087R",
};

expectTypeOf<typeof PASSWORD>().not.toMatchTypeOf<Password>();
expectTypeOf<typeof INTEGER>().not.toMatchTypeOf<Integer>();
expectTypeOf<typeof PERSON>().not.toMatchTypeOf<Person>();

const parseSchema = <TSchema extends ZodSchema>(
	schema: TSchema,
	value: unknown,
): z.infer<TSchema> => schema.parse(value);

const password = parseSchema(PasswordSchema, PASSWORD);
const integer = parseSchema(IntegerSchema, INTEGER);
const person = parseSchema(PersonSchema, PERSON);

expectTypeOf<typeof password>().toMatchTypeOf<Password>();
expectTypeOf<typeof integer>().toMatchTypeOf<Integer>();
expectTypeOf<typeof person>().toMatchTypeOf<Person>();

type SafeResult<TSchema extends ZodSchema> =
	| { success: true; data: z.infer<TSchema> }
	| { success: false; error: Error };

const safeParse = <TSchema extends ZodSchema>(
	schema: TSchema,
	value: unknown,
): SafeResult<TSchema> => schema.safeParse(value);

const safePassword = safeParse(PasswordSchema, PASSWORD);
const safeInteger = safeParse(IntegerSchema, INTEGER);
const safePerson = safeParse(PersonSchema, PERSON);

if (safePassword.success) {
	expectTypeOf<typeof safePassword>().toMatchTypeOf<{
		success: true;
		data: Password;
	}>();
} else {
	expectTypeOf<typeof safePassword>().toMatchTypeOf<{
		success: false;
		error: Error;
	}>();
}

if (safeInteger.success) {
	expectTypeOf<typeof safeInteger>().toMatchTypeOf<{
		success: true;
		data: Integer;
	}>();
} else {
	expectTypeOf<typeof safeInteger>().toMatchTypeOf<{
		success: false;
		error: Error;
	}>();
}

if (safePerson.success) {
	expectTypeOf<typeof safePerson>().toMatchTypeOf<{
		success: true;
		data: Person;
	}>();
} else {
	expectTypeOf<typeof safePerson>().toMatchTypeOf<{
		success: false;
		error: Error;
	}>();
}
