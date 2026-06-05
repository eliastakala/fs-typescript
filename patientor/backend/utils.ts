import { type NewPatient, Gender } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (inputText: unknown): string => {
  if (!inputText || !isString(inputText)) {
    throw new Error('Incorrect or missing input');
  }

  return inputText;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender;
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
      gender: parseGender(object.gender),
      occupation: parseText(object.occupation),
    };

    return patient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatient;