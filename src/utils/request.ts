// import { z } from 'zod';
//
// export const request = <R extends z.ZodTypeAny>(
//   endpoint: string,
//   options?: RequestInit & { responseSchema?: R; validateStatusCode?: boolean },
// ): Promise<z.infer<R>> => {
//   const controller = new AbortController();
//   const signal = controller.signal;
//
//   const f = async () => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
//       ...options,
//       signal,
//       headers: {
//         'Content-type': 'application/json',
//         ...options?.headers,
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error('Response status not succesful');
//     }
//
//     const responseData = response.status === 204 ? null : await response.json();
//
//     if (options?.responseSchema) {
//       return validate(options.responseSchema)(responseData);
//     }
//     return responseData;
//   };
//   let rejectCb: (e: Error) => void;
//   const promise = new Promise((resolve, reject) => {
//     rejectCb = reject;
//     f().then(resolve).catch(reject);
//   }) as any;
//   promise.cancel = () => {
//     controller.abort();
//     if (rejectCb) {
//       rejectCb(new Error('Aborted'));
//     }
//   };
//   return promise;
// };
//
// export const validate =
//   <V extends z.ZodTypeAny>(validator: V): z.infer<V> =>
//   (data: unknown): z.infer<V> =>
//     validator.parse(data);
