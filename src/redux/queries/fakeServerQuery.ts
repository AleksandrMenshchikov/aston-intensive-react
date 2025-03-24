import { FunctionKeys } from './../../types/utils';
import fakeServer, { FakeServer } from '../../backend/api/fakeServer';

export async function fakeServerQuery<
  MethodName extends FunctionKeys<FakeServer>,
>({
  methodName,
  methodArgs,
}: {
  methodName: MethodName;
  methodArgs: [...Parameters<FakeServer[MethodName]>];
}) {
  try {
    if (typeof fakeServer[methodName] !== 'function') {
      throw new Error(`Метод ${methodName} не найден`);
    }

    const result = await (
      fakeServer[methodName] as (
        ...args: Parameters<FakeServer[MethodName]>
      ) => ReturnType<FakeServer[MethodName]>
    )(...methodArgs);

    return { data: result };
  } catch (error: unknown) {
    console.error('FAKE SERVER QUERY ERROR:', error);

    return {
      error: {
        status: 'CUSTOM_ERROR',
        message: error,
      },
    };
  }
}
