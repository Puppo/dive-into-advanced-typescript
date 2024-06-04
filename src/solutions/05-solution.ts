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
	type: "company",
	name: "Best Company ever",
	vatCode: "0987654321",
	creationDate: new Date("2021-01-01"),
} as User;

function assertCompany(user: User): asserts user is Company {
	if (user.type !== "company") {
		throw new Error(`Expected a company, got ${JSON.stringify(user)}`);
	}
}

assertCompany(user);

expectTypeOf(user).toMatchTypeOf<Company>();
