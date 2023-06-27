import { Request } from "express";

export interface MetaTags {
    [key: string]: string;
}

export interface URLRequest extends Request {
    websiteURL?: string;
}