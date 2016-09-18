import { HttpMethod, Response } from 'orange.request';
import { IPromise } from 'orange';
import { Request } from './types';
export declare function request(method: HttpMethod, url: string, r?: Request): IPromise<Response>;
export declare function upload(url: string, r: Request, data: any): IPromise<Response>;
