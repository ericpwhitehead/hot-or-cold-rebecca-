var guessedNums = [];
var counter = 0;
var lastGuess = '';

var max = 100;
var min = 1;
var magicNumber = Math.floor(Math.random() * (max - min + 1)) + min;

// Render new game when user click on "+ New Game" link.
$('a.new').click(function() {
  var max = 100;
  var min = 1;
  var magicNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  $("#count").html("<span>0</span>");
  counter = 0;
  $("#guessList").html("");
  $("#feedback").html("Make your guess!");
  guessedNums = [];
  lastGuess = "";
  console.log("magicNumber: " + magicNumber);
  $('div.timer').remove();
  $('#userGuess').val("").focus();
});

//New Guess
$('input#guessButton.button').click(function() {

  //Set the input value to the number entered
  var input = $('#userGuess').val();
  //Display the magicNumber
  console.log("magicNumber: " + magicNumber);

  //VALIDATION
    // See if input has already been entered.
      for (var i = 0; i < guessedNums.length; i++) {
        if (input === guessedNums[i] && guessedNums != null) {
          $("#feedback").html("You've already guessed that number. Try another!");
          return;
        };
       };

     //Check if the value is actually a number
        if (isNaN(input)) {
          $("#feedback").html("Please input only numbers");
          return;
        };

    // Check the value is between 1 and 100
      if (input <= 1 || input >= 100) {
        $("#feedback").html("Please enter a number between 1 and 100.");
        return;
      };

  //stopwatch
  if(guessedNums.length <= 0){   
    console.log('first guess');
    $('.game').append("<div class='timer'><div id='counter' class='counter'>00:00:00</div></div>");
    $('#counter').stopwatch().stopwatch('start');
  };

  //Add number to the guessedList below
    if (input != magicNumber && (input >= 1 && input <= 100)) {
      $("#guessList").append("<li>" + input + "</li>");
    };

    // Add the number guessed to an array
    guessedNums.push(input);
    console.log("guessedNumbers: "+guessedNums);

    // Get the last guess (minus 2 because we already added the guessed number to the array)
    var lastGuess = guessedNums[guessedNums.length - 2];
    console.log("LastGuess: " +lastGuess);

    // Variables to get difference between current input and magicNum.
    var smallerNum = Math.min(input, magicNumber);
    var largerNum = Math.max(input, magicNumber);
    var diff = largerNum - smallerNum;
    console.log("diff: " + diff);

    // Variables to get diff between the last guessed number and magicNum.
    var lastGuessSmallerNum = Math.min(lastGuess, magicNumber);
    var lastGuessLargerNum = Math.max(lastGuess, magicNumber);
    var lastGuessDiff = lastGuessLargerNum - lastGuessSmallerNum;

   // Give feedback on guess.
    if (diff == 0) {
      $("#feedback").html("Sizzling! You got it!");
      $("#celebrate").fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400);
    } else if (diff >= 1 && diff < 10) { 
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html("HOT! You're closing in! Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("HOT! You're closing in! Your guess was closer before.");
      } else {
        $("#feedback").html("HOT! You're closing in!");
      }
    } else if (diff >= 10 && diff < 20) {
      if (diff < lastGuessDiff) {
        $("#feedback").html("Burner's on, getting hot! Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Burner's on, getting hot! Your guess was closer before.");
      } else {
        $("#feedback").html("Burner's on, getting hot!");
      }
    } else if (diff >= 20 && diff < 30) {
      if (diff < lastGuessDiff) { 
        $("#feedback").html("Getting warmer! Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Getting warmer! Your guess was closer before.");
      } else {
        $("#feedback").html("Getting warmer!");
      }
    } else if (diff >= 30 && diff < 40) {
      if (diff < lastGuessDiff) {
        $("#feedback").html("Slowly warming... your guess is closer now!");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Slowly warming... your guess was closer before.");
      } else {
        $("#feedback").html("Slowly warming...");
      }
    } else if (diff >= 40 && diff < 50) {
      if (diff < lastGuessDiff) {
        $("#feedback").html("Still s-sh-shivering. Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Still s-sh-shivering. Your guess was closer before.");
      } else {
        $("#feedback").html("Still s-sh-shivering.");
      }
    } else if (diff >= 50) {
      if (diff < lastGuessDiff) {
        $("#feedback").html("Freezing cold! Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Freezing cold! Your guess was closer before.");
      } else {
        $("#feedback").html("Freezing cold!");
      }
    
  };

  // Increment counter
  if (input != magicNumber && (input >= 1 && input <= 100)) {
    counter++;
    $("#count").html("<span>" + counter + "</span>");
  };

  // clear out last guess and focus in
  $('#userGuess').val("").focus();

});





























// stopwatch
(function( $ ){

    function incrementer(ct, increment) {
        return function() { ct+=increment; return ct; };
    }
    
    function pad2(number) {
         return (number < 10 ? '0' : '') + number;
    }

    function defaultFormatMilliseconds(millis) {
        var x, seconds, minutes, hours;
        x = millis / 1000;
        seconds = Math.floor(x % 60);
        x /= 60;
        minutes = Math.floor(x % 60);
        x /= 60;
        hours = Math.floor(x % 24);
        // x /= 24;
        // days = Math.floor(x);
        return [pad2(hours), pad2(minutes), pad2(seconds)].join(':');
    }

    //NOTE: This is a the 'lazy func def' pattern described at http://michaux.ca/articles/lazy-function-definition-pattern
    function formatMilliseconds(millis, data) {
        // Use jintervals if available, else default formatter
        var formatter;
        if (typeof jintervals == 'function') {
            formatter = function(millis, data){return jintervals(millis/1000, data.format);};
        } else {
            formatter = defaultFormatMilliseconds;
        }
        formatMilliseconds = function(millis, data) {
            return formatter(millis, data);
        };
        return formatMilliseconds(millis, data);
    }

    var methods = {
        
        init: function(options) {
            var defaults = {
                updateInterval: 1000,
                startTime: 0,
                format: '{HH}:{MM}:{SS}',
                formatter: formatMilliseconds
            };
            
            // if (options) { $.extend(settings, options); }
            
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('stopwatch');
                
                // If the plugin hasn't been initialized yet
                if (!data) {
                    // Setup the stopwatch data
                    var settings = $.extend({}, defaults, options);
                    data = settings;
                    data.active = false;
                    data.target = $this;
                    data.elapsed = settings.startTime;
                    // create counter
                    data.incrementer = incrementer(data.startTime, data.updateInterval);
                    data.tick_function = function() {
                        var millis = data.incrementer();
                        data.elapsed = millis;
                        data.target.trigger('tick.stopwatch', [millis]);
                        data.target.stopwatch('render');
                    };
                    $this.data('stopwatch', data);
                }
                
            });
        },
        
        start: function() {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('stopwatch');
                // Mark as active
                data.active = true;
                data.timerID = setInterval(data.tick_function, data.updateInterval);
                $this.data('stopwatch', data);
            });
        },
        
        stop: function() {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('stopwatch');
                clearInterval(data.timerID);
                data.active = false;
                $this.data('stopwatch', data);
            });
        },
        
        destroy: function() {
            return this.each(function(){
                var $this = $(this),
                    data = $this.data('stopwatch');
                $this.stopwatch('stop').unbind('.stopwatch').removeData('stopwatch');
            });
        },
        
        render: function() {
            var $this = $(this),
                data = $this.data('stopwatch');
            $this.html(data.formatter(data.elapsed, data));
        },

        getTime: function() {
            var $this = $(this),
                data = $this.data('stopwatch');
            return data.elapsed;
        },
        
        toggle: function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data('stopwatch');
                if (data.active) {
                    $this.stopwatch('stop');
                } else {
                    $this.stopwatch('start');
                }
            });
        },
        
        reset: function() {
            return this.each(function() {
                var $this = $(this);
                    data = $this.data('stopwatch');
                data.incrementer = incrementer(data.startTime, data.updateInterval);
                data.elapsed = data.startTime;
                $this.data('stopwatch', data);
            });
        }
    };
    
    
    // Define the function
    $.fn.stopwatch = function( method ) {
        if (methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.stopwatch' );
        }
    };

})( jQuery );
