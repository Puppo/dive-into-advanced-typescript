import { expectTypeOf } from "expect-type";

type Person = {
	name: string;
	surname: string;
	fiscalCode: string;
	birthDate: Date;
};

type Company = {
	name: string;
	vatCode: string;
	creationDate: Date;
};

type User = Person | Company;

const person = {
	name: "Mario",
	surname: "Rossi",
	fiscalCode: "DRLFOR92M21M087R",
} as User;

const company = {
	name: "Best Company ever",
	vatCode: "0987654321",
} as User;

expectTypeOf(person).toMatchTypeOf<User>();
expectTypeOf(person).toMatchTypeOf<Person>();

expectTypeOf(company).toMatchTypeOf<User>();
expectTypeOf(company).toMatchTypeOf<Company>();

const newPerson = {
	...person,
	birthDate: new Date("1992-08-21"),
};

expectTypeOf(newPerson).toMatchTypeOf<User>();
expectTypeOf(newPerson).toMatchTypeOf<Person>();
