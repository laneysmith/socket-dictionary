# Socket Dictionary

### Installation:
* Fork & clone repo, cd into root & `npm i` & `bower i`
* To run using ionic, `ionic serve`

### Screenshots:
Game room options:
![Game rooms screenshot](/screenshots/socket-dictionary-screenshot1.png "Game rooms")
Randomly generated word:
![Random word screenshot](/screenshots/socket-dictionary-screenshot1.png "Random word")

### Game rules:
Players join a room, after 4 players have joined the game is started. The first person to enter the room is assigned the role of "picker" & given a randomly generated word. The picker can choose to accept the word, or generate a new one. The goal is to choose a word difficult enough that they think the other players won't know the true definition.

After the first player chooses a word, the word is rendered on all players' screens. All other players then have to enter a made up but plausible definition. After the last player has submitted a fake definition, the definitions (including the true one) are shuffled & rendered on the page for all players to see. Each player then selects the definition they think is true (they are not allowed to select their own).

For each player who chooses your definition, you get 1 point. For each player who does *not* choose the correct definition, the picker gets 1 point.

### Built with:
* Node.js
* Express
* AngularJS
* [Ioinic.io](http://ionic.io/)
* [Socket.io](http://socket.io/)
* [Word Quiz API](https://www.twinword.com/api/word-quiz.php) - used to generate random words:
* [Word Dictionary API](https://www.twinword.com/api/word-graph-dictionary.php) - used get the actual definition of the chosen word
