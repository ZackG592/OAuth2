export type SetCookie<T> = {
    cookieName:string;
    redirect?:string;
    data:T;
}