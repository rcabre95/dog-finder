import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
    const response = NextResponse.next({
        request: {
            headers: new Headers(req.headers)
        }
    });
    response.cookies.set('isAuthed2', "true");
    // console.log("response: ", response.cookies)
    const cookie = req.cookies.get('auth');
    const cookies = req.cookies.getAll();

    // console.log("isAuth: ", req.cookies.has(`auth`))
    // console.log("cookie: ", cookie)
    response.headers.set('x-custom-auth-header', 'isAuthed')

    return response;
};

const config = {
    matcher: "/"
}