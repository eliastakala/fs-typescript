import { type NewPatient } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (inputText: unknown): string => {
  if (!inputText || !isString(inputText)) {
    throw new Error('Incorrect or missing input');
  }

  return inputText;
};

const parseNewPatient = (object: unknown): NewPatient => {
   if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const patient: NewPatient = {
      name: parseText(object.name),
      dateOfBirth: parseText(object.dateOfBirth),
      ssn: parseText(object.ssn),
      gender: parseText(object.gender),
      occupation: parseText(object.occupation),
    };

    return patient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatient;