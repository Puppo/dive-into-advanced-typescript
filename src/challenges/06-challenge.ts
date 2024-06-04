import { expectTypeOf } from "expect-type";

type Password = string;
type Integer = number;
type FiscalCode = string;

type PersonId = Integer;
type Person = {
	id: PersonId;
	name: string;
	surname: string;
	fiscalCode: FiscalCode;
};

const PASSWORD = "password";
const INTEGER = 1.5;
const PERSON = {
	id: 1,
	name: "Mario",
	surname: "Rossi",
	fiscalCode: "DRLFOR92M21M087R",
};

expectTypeOf<typeof PASSWORD>().not.toMatchTypeOf<Password>();
expectTypeOf<typeof INTEGER>().not.toMatchTypeOf<Integer>();
expectTypeOf<typeof PERSON>().not.toMatchTypeOf<Person>();

assertPassword(PASSWORD);
assertInteger(INTEGER);
assertPerson(PERSON);

expectTypeOf<typeof PASSWORD>().toMatchTypeOf<Password>();
expectTypeOf<typeof INTEGER>().toMatchTypeOf<Integer>();
expectTypeOf<typeof PERSON>().toMatchTypeOf<Person>();

function assertPassword(password: string): asserts password is Password {
	const errors: string[] = [];
	if (password.length < 6) {
		errors.push("Password is too short");
	}
	if (password.length > 20) {
		errors.push("Password is too long");
	}
	if (errors.length) {
		throw new Error(errors.join(", "));
	}
}

function assertInteger(number: number): asserts number is Integer {
	if (!Number.isInteger(number)) {
		throw new Error("Number is not an integer");
	}
}

function assertFiscalCode(
	fiscalCode: unknown,
): asserts fiscalCode is FiscalCode {
	if (typeof fiscalCode !== "string") {
		throw new Error("Fiscal code must be a string");
	}
	if (fiscalCode.length !== 16) {
		throw new Error("Fiscal code must be 16 characters long");
	}
}

function assertPersonId(id: unknown): asserts id is PersonId {
	const errors: string[] = [];
	if (typeof id !== "number") {
		errors.push("Person id must be a number");
	} else {
		if (!Number.isInteger(id)) {
			errors.push("Person id must be an integer");
		}
		if (id < 0) {
			errors.push("Person id must be positive");
		}
	}
	if (errors.length) {
		throw new Error(errors.join(", "));
	}
}

function assertPerson(
	person: Record<string, unknown>,
): asserts person is Person {
	assertPersonId(person.id);
	assertFiscalCode(person.fiscalCode);
}
