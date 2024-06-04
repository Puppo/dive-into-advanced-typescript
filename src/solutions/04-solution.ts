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

const person = {
	type: "person",
	name: "Mario",
	surname: "Rossi",
	fiscalCode: "DRLFOR92M21M087R",
	birthDate: new Date("1992-01-01"),
} as const satisfies Person;

const company = {
	type: "company",
	name: "Best Company ever",
	vatCode: "0987654321",
	creationDate: new Date("2021-01-01"),
} as const satisfies Company;

const newPerson = {
	...person,
	birthDate: new Date("1992-08-21"),
};

function printPerson(person: Person): void {
	console.log(
		`Hi ${person.name} ${person.surname}, your fiscal code is ${person.fiscalCode}`,
	);
}

function printCompany(company: Company): void {
	console.log(`Hi ${company.name}, your vat code is ${company.vatCode}`);
}

const isPerson = (user: User): user is Person => user.type === "person";
const isCompany = (user: User): user is Company => user.type === "company";

function print(user: User): void {
	if (isPerson(user)) {
		printPerson(user);
		return;
	}
	if (isCompany(user)) {
		printCompany(user);
		return;
	}
	const shouldNotHappen: never = user;
	throw new Error(
		`print called with invalid user: ${JSON.stringify(shouldNotHappen)}`,
	);
}
print(person);
print(company);
print(newPerson);

function calculateAgePerson(person: Person): number {
	const currentYear = new Date().getFullYear();
	const birthYear = person.birthDate.getFullYear();
	return currentYear - birthYear;
}

function calculateAgeCompany(company: Company): number {
	const currentYear = new Date().getFullYear();
	const creationYear = company.creationDate.getFullYear();
	return currentYear - creationYear;
}

function calculateAge(user: User): number {
	switch (user.type) {
		case "person":
			return calculateAgePerson(user);
		case "company":
			return calculateAgeCompany(user);
		default: {
			const shouldNotHappen: never = user;
			throw new Error(
				`calculateAge called with invalid user: ${JSON.stringify(shouldNotHappen)}`,
			);
		}
	}
}

console.log(calculateAge(person));
console.log(calculateAge(company));

expectTypeOf(print).parameter(0).toMatchTypeOf<User>();
expectTypeOf(print).returns.toMatchTypeOf<void>();

const users: User[] = [person, company, newPerson];
expectTypeOf(users).toMatchTypeOf<User[]>();

const persons = users.filter(isPerson);
expectTypeOf(persons).toMatchTypeOf<Person[]>();
expectTypeOf(persons).toMatchTypeOf<User[]>();

const persons2 = users.filter((user) => user.type === "person");
expectTypeOf(persons2).toMatchTypeOf<Person[]>();
expectTypeOf(persons2).toMatchTypeOf<User[]>();

const list: Array<number | string> = [1, "2", 3, "4"];

const numbers = list.filter((el) => typeof el === "number");
expectTypeOf(numbers).toMatchTypeOf<number[]>();

const strings = list.filter((el) => typeof el === "string");
expectTypeOf(strings).toMatchTypeOf<string[]>();
