// The numbers represent the octave the notes are in,
// "C1" represents middle C for treble cleff
// export const notes = [
//   "C1", "D1", "E1", "F1", "G1",
//   "A2", "B2", "C2", "D2", "E2", "F2", "G2",
//   "A3", "B3", "C3"
// ];

export const notes = [
  "C1", "B3", "C3"
];

export const trebleNotesWithOffset = {
  "C1": 4.5, // needs ledger line
  "D1": 4,
  "E1": 3.5,
  "F1": 3,
  "G1": 2.5,
  "A2": 2,
  "B2": 1.5,
  "C2": 1,
  "D2": 0.5,
  "E2": 0,
  "F2": -0.5,
  "G2": -1,
  "A3": -1.5, // needs ledger line
  "B3": -2, // needs ledger line
  "C3": -2.5, // needs second ledger line
};

export const bassNotesWithOffset = {
  "C1": 5.5, // needs secondary ledger line
  "D1": 5, // needs ledger line
  "E1": 4.5, // needs ledger line
  "F1": 4,
  "G1": 3.5,
  "A2": 3,
  "B2": 2.5,
  "C2": 2,
  "D2": 1.5,
  "E2": 1,
  "F2": 0.5,
  "G2": 0,
  "A3": -0.5,
  "B3": -1,
  "C3": -1.5, // needs ledger line
};
