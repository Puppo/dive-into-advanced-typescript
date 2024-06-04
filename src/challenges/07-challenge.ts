import { expectTypeOf } from "expect-type";

declare const brand: unique symbol;

type Brand<T, B> = T & { [brand]: B };

type Password = Brand<string, "Password">;
type Integer = Brand<number, "Integer">;
type FiscalCode = Brand<string, "FiscalCode">;

type PersonId = Brand<number, "PersonId">;
type Person = {
	id: PersonId;
	type: "person";
	name: string;
	surname: string;
	fiscalCode: FiscalCode;
};

const PASSWORD = "password";
const INTEGER = 1.5;
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

declare const parseSchema: <T>(schema: unknown, value: unknown) => T;

const password = parseSchema({}, PASSWORD);
const integer = parseSchema({}, INTEGER);
const person = parseSchema({}, PERSON);

expectTypeOf<typeof password>().toMatchTypeOf<Password>();
expectTypeOf<typeof integer>().toMatchTypeOf<Integer>();
expectTypeOf<typeof person>().toMatchTypeOf<Person>();

type SafeResult<T> =
	| { success: true; data: T }
	| { success: false; error: Error };

declare function safeParse<T>(schema: unknown, value: unknown): SafeResult<T>;

const safePassword = safeParse({}, PASSWORD);
const safeInteger = safeParse({}, INTEGER);
const safePerson = safeParse({}, PERSON);

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
