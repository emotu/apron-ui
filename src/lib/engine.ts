/**
 * engine.ts
 * 
 * An reusable `Engine` class that can be instantiated based on specific REST URL patterns to allow for reusablilty of functionality.
 * The `Engine` class will carry all action specific functionality available via API REST based API calls.
 * 
 */
import _ from "lodash";
import { v4 as uuidv4 } from "uuid"


const API_URL = "/api" // this can also be pulled from environment variables.
const DEFAULT_HEADERS = { "content-type": "application/json" }

export default class Engine<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }


    async list({ params = {} }: { params?: Record<string, string> } = {}): Promise<T[]> {

        const path = [API_URL, this.endpoint].join("/");

        const queryParams = !_.isEmpty(params) ? new URLSearchParams(params) : null;
        const url = _.compact([path, queryParams]).join("?");
        const response = await fetch(url, {
            method: "GET",
            headers: { ...DEFAULT_HEADERS }, // incase you need to add other headers
        });

        if (!response.ok) throw new Error("Resource not found");
        const results = await response.json();

        return results;
    }


    async fetch({ id, params = {} }: { id: string, params?: Record<string, string> }): Promise<T> {

        const path = [API_URL, this.endpoint, id].join("/");

        const queryParams = !_.isEmpty(params) ? new URLSearchParams(params) : null;
        const url = _.compact([path, queryParams]).join("?");

        const response = await fetch(url, {
            method: "GET",
            headers: { ...DEFAULT_HEADERS }, // incase you need to add other headers
        });

        if (!response.ok) throw new Error("Resource not found");
        const obj = await response.json();

        return obj;
    }

    async create({ data }: { data: T }): Promise<T> {
        const path = [API_URL, this.endpoint].join("/");

        const payload = { ...data, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() }
        const response = await fetch(path, {
            method: "POST",
            headers: { ...DEFAULT_HEADERS }, // incase you need to add other headers
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Resource not found");
        const obj = await response.json();

        return obj;

    }
    
    async update({ id, data }: { id: string, data: T }): Promise<T> {
        const path = [API_URL, this.endpoint, id].join("/");

        const payload = { ...data }
        console.log("inside engine --->", data, payload)
        const response = await fetch(path, {
            method: "PATCH",
            headers: { ...DEFAULT_HEADERS }, // incase you need to add other headers
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Resource not found");
        const obj = await response.json();

        return obj;

    }

    async delete({ id }: { id: string }): Promise<{ status: string }> {

        const path = [API_URL, this.endpoint, id].join("/");;

        const response = await fetch(path, {
            method: "DELETE",
            headers: { ...DEFAULT_HEADERS }, // incase you need to add other headers
        });

        if (!response.ok) throw new Error("Resource not found");
        const obj = { status: response.statusText };

        return obj;
    }

}