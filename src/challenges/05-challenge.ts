import { expectTypeOf } from "expect-type";

type Person = {
	type: "person";
	name: string;
	surname: string;
	fiscalCode: string;
	birthDate: Date;
};

type Company = {
	type: "company";
	name: string;
	vatCode: string;
	creationDate: Date;
};

type User = Person | Company;

const user = {
	name: "Best Company ever",
	vatCode: "0987654321",
	creationDate: new Date("2021-01-01"),
} as User;

declare function assertCompany(user: User): unknown;

assertCompany(user);

expectTypeOf(user).toMatchTypeOf<Company>();
