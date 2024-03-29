document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');

  // declare variables
  var wins = 0;
  var losses = 0;
  var tries = 10;
  var triesLeft = 10;
  var guesses = [];
  var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  // set CSS styles
  document.getElementById('Guess').style.alignItems = 'space-between';
  document.getElementById('country').style.padding = 0;
  document.getElementById('country').style.display = 'flex';
  document.getElementById('country').style.alignItems = 'space-between';
  document.getElementById('country').style.justifyContent = 'center';

  // list of countries the user can guess
  countries = ['Afghanistan', 'Australia', 'Bangladesh', 'India','Newzeland','Pakistan','Southafrica','Srilanka'].map(x =>
    x.toUpperCase()
  );

  // function to randomly select a country
  function chooseCountry() {
    return countries[Math.round(Math.random() * (countries.length - 1))];
  }

  // function to display lines for placeholders for letters of different countries
  function displayCountryLines(country) {
    // remove previous children dispatchEventvar
    myNode = document.getElementById('country');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    for (let i = 0; i < country.length; i++) {
      var newDiv = document.createElement('div');
      size = myNode.offsetWidth / country.length;

      // add CSS to new div
      newDiv.style.width = size + 'px';
      newDiv.style.height = 0.8 * size + 'px';
      newDiv.style.borderBottom = 'thick solid black';
      newDiv.style.marginRight = '10px';
      newDiv.style.textAlign = 'center';

      // add id to each div
      newDiv.classList.add(country[i]);

      myNode.appendChild(newDiv);
    }
  }

  // function to identify unique letters in strings
  function unique_char(str1) {
    var str = str1;
    var uniql = '';
    for (var x = 0; x < str.length; x++) {
      if (uniql.indexOf(str.charAt(x)) == -1) {
        uniql += str[x];
      }
    }
    return uniql;
  }

  // function to display game summary information
  function displayInfo(wins, losses, triesLeft, guesses) {
    myNode = document.getElementById('summary');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }

    // add wins to summary section
    var winsPara = document.createElement('p');
    var winsText = document.createTextNode(`Wins: ${wins}`);
    winsPara.appendChild(winsText);
    myNode.appendChild(winsPara);

    // add lossess to summary section
    var lossesPara = document.createElement('p');
    var lossesText = document.createTextNode(`Losses: ${losses}`);
    lossesPara.appendChild(lossesText);
    myNode.appendChild(lossesPara);

    // display guesses letters
    var guessesPara = document.createElement('p');
    var guessesText = document.createTextNode(
      `Letters already guessed: ${guesses.join()}`
    );
    guessesPara.appendChild(guessesText);
    myNode.appendChild(guessesPara);

    // number of guesses remaining
    var remainingGuessesPara = document.createElement('p');
    var remainingGuessesText = document.createTextNode(
      `Number of guesses remaining: ${triesLeft}`
    );
    remainingGuessesPara.appendChild(remainingGuessesText);
    myNode.appendChild(remainingGuessesPara);
  }

  // check guesses
  function checkGuess(input, country) {
    if (country.indexOf(input) === -1) {
      // displayletters used
    } else {
      // displayletters on lines
      var letterDiv = document
        .getElementById('country')
        .querySelectorAll('.' + input);
      for (let i = 0; i < letterDiv.length; i++) {
        letterDiv[i].innerHTML = input;
      }
    }
  }

  // initial Hangman game
  var country = chooseCountry();
  displayCountryLines(country);
  displayInfo(wins, losses, triesLeft, guesses);

  // add steps to excecute upon when alphabet letter keys are pressed
  document.onkeyup = function(e) {
    input = e.key.toUpperCase();
    // alphabet.includes(input)
    if (alphabet.indexOf(input) === -1) {
      alert('Not a valid entry. Please only use letters of the alphabet!');
    }

    // only add input to guesses if letter has not been previously guessed
    if (guesses.indexOf(input) === -1 && alphabet.indexOf(input) !== -1) {
      guesses.push(input);
      triesLeft = tries - guesses.length;
    }

    // check if user won!
    var win = guesses.filter(function(e) {
      return unique_char(country).indexOf(e) > -1;
    });

    checkGuess(input, country);

    if (win.length === unique_char(country).length) {
      document
        .getElementById('flag')
        .setAttribute('src', `assets/images/${country}.png`);
      guesses = [];
      country = chooseCountry();
      displayCountryLines(country);
      wins++;
      tries = 9;
      triesLeft = 9;
    } else if (guesses.length < tries) {
      document.getElementById('flag').setAttribute('src', '');
    } else {
      document.getElementById('flag').setAttribute('src', '');
      document
        .getElementById('flag')
        .setAttribute(
          'src','assets/images/doit.png'
        );
      country = chooseCountry();
      displayCountryLines(country);
      guesses = [];
      losses++;
      tries = 10;
      triesLeft = 10;
    }

    displayInfo(wins, losses, triesLeft, guesses);
  };
});
