// import {SignJWT, jwtVerify} from 'jose';

// const key = new TextEncoder().encode(process.env.JWT_SECRET)

// const cookie= {
//     name : 'session',
//     options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         secure: true,
//         path:'/'
//     },
//     duration: 24*60*60*1000
// }
// export async function encrypt(payload : any) {
//     return new SignJWT(payload)
//         .setProtectedHeader({alg: 'HS256'})
//         .setIssuedAt()
//         .setExpirationTime('3h')
//         .sign(key);
// }

// export async function decrypt(session) {
//     try {
//         const {payload} = await jwtVerify(session, key, {
//             algorithms: ['HS256']
//         })
//         return payload;
//     } catch (error) {
//         return null;
//     }
// }

// export async function createSession() {
    
// }