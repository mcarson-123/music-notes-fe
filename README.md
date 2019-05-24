# Sight Reading Piano Quiz

## Purpose
This React Native app will help you to learn your music notes to improve sight reading.


## What it is
It will display a note on the staff and you can press a key on the octave section of the piano shown. The goal is to show you notes you need practice on more often than the ones you know really well. Two metrics will be used: 1. time to perss a key (whether it was right or wrong) 2. If the note was incorrect

## Notes
note to self: Come up with a snappy name for this

-> As of May 12th, 2019: This app is incomplete, more spare time needed (the limiting factor in my life)

## TODO
- [x] Add application state to store the user's current progress
  - [x] Store the current run (number of correct and incorrect notes in current session)
  - [x] Store notes the user took a "long" (figure out what long means) time to select
  - [x] Store notes the user got incorrect
- [x] Show the user the notes they need to see "more often" (What does this mean? Still want to show some other random notes, but weigh the flagged notes more heavily)
- [x] Don't show the user the same note they just got (can be local state, doesn't need to persist on app closing)
- [x] Show a new note to the user once they have guessed the current note and have been provided feedback
- [ ] Show some sort of nice feedback to the user that they got it correct?
- [ ] Add the bass cleff
- [ ] Add the notes above and below the main staff lines (the ledger line notes)
- [ ] Add the treble cleff and base cleff images to the staff
- [ ] Add sharps and flats into the quiz
- [x] Remove double border on the adjacent white keys
- [x] Size the piano key octave and the staff appropriately to the current screen dimensions
- [ ] Allow the user to just use buttons with the key names on them instead of the piano keys (the user may not be learning the piano, but a different instrument)
- [ ] Style note itself to either be a whole note (with no stem) or a quarter note (add a stem), currently is not really a real note
- [ ] Deal with landscape mode?
- [ ] Add linter, duh
- [ ] Add nice styling
- [ ] Do any required refactoring to make sure the various methods are happening in the components that should contain the responsibility (important as when I'm making an app for fun not work, I can get carried away hacking it together, also my time spent is disparate, here and there)
