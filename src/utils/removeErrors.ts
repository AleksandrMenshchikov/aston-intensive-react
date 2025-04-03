import removeProperty from './removeProperty';

export default function removeError<ErrorsList extends Record<string, string>>(
  errorsList: ErrorsList,
  errorName: keyof ErrorsList
) {
  const result = removeProperty(errorsList, errorName);
  delete result.server;
  return result;
}
