// import { State } from "./state";
// import { Diagnosis, Patient } from "../types";
//
// export type Action =
//     | {
//     type: "SET_PATIENT_LIST";
//     payload: Patient[];
// }
//     | {
//     type: "ADD_PATIENT";
//     payload: Patient;
// }
//     | {
//     type: "UPDATE_PATIENT_INFO";
//     payload: Patient;
// }
//     | {
//     type: "SED_DIAGNOSIS_LIST";
//     payload: Diagnosis[];
// };
//
// export const setPatientList = (data: Patient[]): Action => {
//     return {
//         type: "SET_PATIENT_LIST",
//         payload: data,
//     };
// };
//
// export const addPatient = (data: Patient): Action => {
//     return {
//         type: "ADD_PATIENT",
//         payload: data,
//     };
// };
//
// export const updatePatientInfo = (data: Patient): Action => {
//     return {
//         type: "UPDATE_PATIENT_INFO",
//         payload: data,
//     };
// };
//
// export const setDiagnosisList = (data: Diagnosis[]): Action => {
//     return {
//         type: "SED_DIAGNOSIS_LIST",
//         payload: data,
//     };
// };
//
// export const reducer = (state: State, action: Action): State => {
//     switch (action.type) {
//         case "SET_PATIENT_LIST":
//             return {
//                 ...state,
//                 users: {
//                     ...action.payload.reduce(
//                         (memo, patient) => ({ ...memo, [patient.id]: patient }),
//                         {}
//                     ),
//                     ...state.users,
//                 },
//             };
//         case "UPDATE_PATIENT_INFO":
//             return {
//                 ...state,
//                 users: {
//                     ...state.users,
//                     [action.payload.id]: action.payload,
//                 },
//             };
//         case "ADD_PATIENT":
//             return {
//                 ...state,
//                 users: {
//                     ...state.users,
//                     [action.payload.id]: action.payload,
//                 },
//             };
//
//         default:
//             return state;
//     }
// };

export {}