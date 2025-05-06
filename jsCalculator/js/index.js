function load() {
  console.log("called")
  var $btns = $("#calculator span");
  var operators = ["+", "-", "x", "÷"];
  var $inputScreen = $("#screen");
  var btnValue;
  var input;

  $btns.on("click", function() {
    btnValue = $(this).html();
    input = $inputScreen.html();
    var decimalAdded = $inputScreen.data("decimalAdded") || false; // Retrieve decimalAdded from data

    switch (btnValue) {
      case "C":
        $inputScreen.html("");
        $inputScreen.data("decimalAdded", false); // Store decimalAdded in data
        decimalAdded = false;
        break;
      case "=":
        var lastChar = input[input.length - 1];
        input = input.replace(/x/g, "*").replace(/÷/g, "/");

        if (operators.indexOf(lastChar) > -1 || lastChar == ".") {
          input = input.replace(/.$/, "");
        }

        if (input) {
          try {
            $inputScreen.html(eval(input));
          } catch (error) {
            $inputScreen.html("Error"); // Handle potential errors from eval
          }
        }
        $inputScreen.data("decimalAdded", false);
        decimalAdded = false;
        break;
      case ".":
        if (!decimalAdded) {
          $inputScreen.html(input + btnValue);
          $inputScreen.data("decimalAdded", true);
          decimalAdded = true;
        }
        break;
      case "+":
      case "-":
      case "x":
      case "÷":
        var lastChar = input[input.length - 1];

        if (input !== "" && operators.indexOf(lastChar) === -1) {
          $inputScreen.html(input + btnValue);
        } else if (input === "" && btnValue === "-") {
          $inputScreen.html(input + btnValue);
        }

        if (operators.indexOf(lastChar) > -1 && input.length > 1) {
          $inputScreen.html(input.slice(0, -1) + btnValue);
        }
        $inputScreen.data("decimalAdded", false);
        decimalAdded = false;
        break;
      default:
        $inputScreen.html(input + btnValue);
        $inputScreen.data("decimalAdded", false);
        decimalAdded = false;
        break;
    }
  });
}

$(document).ready(function() {
  load();
});
