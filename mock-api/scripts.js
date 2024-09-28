/**
 * generate.ts
 *
 * Generates fake data using faker-js to populate an initial data for the mock API
 */

import fs from "fs";

import { faker } from "@faker-js/faker";

const createMockUser = () => {
    const id = faker.string.uuid();

    const gender = faker.helpers.arrayElement(["MALE", "FEMALE"]);

    const firstName = faker.person.firstName(gender.toLowerCase());
    const lastName = faker.person.lastName();
    const age = faker.number.int({ min: 18, max: gender === gender ? 112 : 117 });
    const createdAt = new Date();
    const updatedAt = new Date();
    // Extra
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();

    return { id, firstName, lastName, gender, age, email, createdAt, updatedAt };
};

const generateMockUsers = (count = 10000) => {
    const users = Array.from({ length: count }).map(() => createMockUser());
    return users;
};

const args = process.argv;
if(args.length >= 2) {
    const count = parseInt(args[2] || "1000");

    if (isNaN(count) || count <= 0 || count >= 15000) {
        console.error("Provide a valid positive number between 1 and 15,000");
    } else {
        console.log(`Generating ${count} users....`);
        const users = generateMockUsers(count);

        const jsonData = { users };

        fs.writeFile("mock-api/db.json", JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                console.error("Error writing to file", err);
            } else {
                console.log("JSON data successfully written to file");
            }
        });

        console.log("Done!");
    }
}

