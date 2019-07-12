# Sight Reading Piano Quiz

## Purpose
This React Native app will help you to learn your music notes to improve sight reading.


## What it is
It will display a note on the staff and you can press a key on the octave section of the piano shown. The goal is to show you notes you need practice on more often than the ones you know really well. Two metrics will be used: 1. time to perss a key (whether it was right or wrong) 2. If the note was incorrect

## Notes
note to self: Come up with a snappy name for this

-> As of Jul 10th, 2019: This app is incomplete, more spare time needed (the limiting factor in my life)

## TODO
- [ ] Show some sort of nice feedback to the user that they got it correct?
- [ ] Banner when they get runs of 5x correct in a row (Maybe 5 first then multiples of 10)
- [ ] Banner when they get one wrong after a good run ("Good job, that was XX correct in a row!")
- [ ] Randomly change it up from treble to base cleff when the user selects a specific mode
- [ ] Add sharps and flats into the quiz
- [ ] Allow the user to just use buttons with the key names on them instead of the piano keys (the user may not be learning the piano, but a different instrument)
- [ ] Deal with landscape mode?
- [ ] Add linter, duh
- [ ] Does it even need a header?
- [ ] Settings panel updates:
  - [ ] Change to cog icon
  - [ ] Style like an index card
- [ ] Show future notes greyed out (like tetris next pieces)
- [ ] Onboarding to explain to users what to do?
- [ ] Make the touch colour "a touch" darker
- [x] Move score to the top to allow the keyboard to be within easier reach of the user's thumbs
- [ ] Show the score as "correct: x" and "incorrect: y", and maybe a percentage
- [ ] Easy mode where the C notes are shown on the staff in another colour?
- [ ] If the user presses the wrong note, show on the staff the note they just pressed
- [x] Add application state to store the user's current progress
  - [x] Store the current run (number of correct and incorrect notes in current session)
  - [x] Store notes the user took a "long" (figure out what long means) time to select
  - [x] Store notes the user got incorrect
- [x] Show the user the notes they need to see "more often" (What does this mean? Still want to show some other random notes, but weigh the flagged notes more heavily)
- [x] Don't show the user the same note they just got (can be local state, doesn't need to persist on app closing)
- [x] Add the bass cleff
- [x] Add the notes above and below the main staff lines (the ledger line notes)
- [x] Add the treble cleff and base cleff images to the staff
- [x] Show a new note to the user once they have guessed the current note and have been provided feedback
- [x] Remove double border on the adjacent white keys
- [x] Size the piano key octave and the staff appropriately to the current screen dimensions
- [x] Style note itself to either be a whole note (with no stem) or a quarter note (add a stem), currently is not really a real note
