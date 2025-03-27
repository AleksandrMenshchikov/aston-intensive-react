export default function handleError(err: ExpectedError) {
  if (typeof err.message === 'string') {
    console.error(err.message);
  } else {
    alert('Произошла неожиданная ошибка, вы можете увидеть её в консоле');
    console.error(err);
  }
}

export type ExpectedError = { message: string };
