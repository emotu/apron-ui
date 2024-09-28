/**
 * Global types for use on both client and server apps.
 */

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender.MALE | Gender.FEMALE;
    email?: string;
    createdAt?: Date;
    lastUpdated?: Date;
}