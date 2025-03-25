import { FunctionKeys } from './../../types/utils';
import fakeServer, { FakeServer } from '../../backend/api/fakeServer';
import handleError from '../../utils/handleError';

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
    handleError(error);
    return { error };
  }
}
