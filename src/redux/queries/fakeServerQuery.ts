import fakeServer, { FakeServer } from "../../backend/api/fakeServer";

export async function fakeServerQuery(
  method: keyof FakeServer,
  arg1: string,
  arg2: string,
) {
  try {
    if (typeof fakeServer[method] !== 'function') {
      throw new Error(`Метод ${method} не найден`);
    }

    const result = await fakeServer.signUp(arg1, arg2);

    return { data: result };
  }
  catch (error: unknown) {
    console.error('FAKE SERVER QUERY ERROR:', error);

    return {
      error: {
        status: 'CUSTOM_ERROR',
        message: error,
      },
    };
  }
};


// export async function fakeServerQuery<MethodArgs extends keyof FakeServer>(
//   method: keyof FakeServer,
//   ...methodArgs: FakeServer[MethodArgs][]
// ) {
//   try {
//     if (typeof fakeServer[method] !== 'function') {
//       throw new Error(`Метод ${method} не найден`);
//     }

//     const result = await fakeServer[method](...methodArgs);

//     return { data: result };
//   }
//   catch (error: unknown) {
//     console.error('FAKE SERVER QUERY ERROR:', error);

//     return {
//       error: {
//         status: 'CUSTOM_ERROR',
//         message: error,
//       },
//     };
//   }
// };
