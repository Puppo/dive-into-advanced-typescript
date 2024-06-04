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
	birthDate: new Date("1992-01-01"),
} as const satisfies Person;

const company = {
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

declare const isPerson: (user: User) => unknown;
declare const isCompany: (user: User) => unknown;

function print(user: User): void {
	if (isPerson(user)) {
		printPerson(user);
	}
	if (isCompany(user)) {
		printCompany(user);
	}
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
	switch (user) {
		case person:
			return calculateAgePerson(user);
		case company:
			return calculateAgeCompany(user);
	}
}

console.log(calculateAge(person));
console.log(calculateAge(company));

expectTypeOf(print).parameter(0).toMatchTypeOf<User>();
expectTypeOf(print).returns.toMatchTypeOf<void>();

const users: User[] = [person, company, newPerson];
expectTypeOf(users).toMatchTypeOf<User[]>();

const people = users.filter(isPerson);

expectTypeOf(people).toMatchTypeOf<Person[]>();
expectTypeOf(people).toMatchTypeOf<User[]>();

const list: Array<number | string> = [1, "2", 3, "4"];

const numbers = list.filter((el) => typeof el === "number");
expectTypeOf(numbers).toMatchTypeOf<number[]>();

const strings = list.filter((el) => typeof el === "string");
expectTypeOf(strings).toMatchTypeOf<string[]>();
