import { validate as isUUID } from 'uuid';

export const validateUuid = (field: string) => {
  if (!field || !isUUID(field)) {
    return false;
  }

  return true;
};
