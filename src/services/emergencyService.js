import { createEmergency } from "./firestoreService";

export const saveEmergencyRequest = async (data) => {
  return await createEmergency(data);
};
