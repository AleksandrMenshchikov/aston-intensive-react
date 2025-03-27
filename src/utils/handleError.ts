export default function handleError(err: ExpectedError) {
  console.error(err);
  if (typeof err === 'string') {
    alert(err);
  } else if (err.message && typeof err.message === 'string') {
    alert(err.message);
  } else {
    alert('Произошла ошибка, вы можете увидеть её в консоле');
  }
}

export type ExpectedError = { message: string; reason: string };
