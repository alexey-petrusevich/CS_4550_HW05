defmodule FourDigits.Game do

  # returns new game?
  def new() do
    %{
      guesses: MapSet.new(),
      secret: generateSecret(),
      hints: [],
      status: ""
    }
  end


  # replacement for FourDigits.js version of makeGuess
  def makeGuess(state, newGuess) do
    if (isValidInput(newGuess)) do
      newHint = getHint(state.secret)
      state = %{state | hints: state.hints ++ newHint}
      %{state | guesses: MapSet.put(state.guesses, newGuess)}
    else
      %{state | status: "A guess must be a 4-digit unique integer (1-9)"}
    end
  end

  # returns true if input is a valid guess and false otherwise
  defp isValidInput(input) do
    # TODO: implement
    true
  end

  # returns a hint (string) given a guess (string)
  # assumes that secret.length and guess.length are equal
  defp getHint(secret, guess) do
    # TODO: implement
    secretList = String.codepoints(secret)
    guessList = String.codePoints(guess)
    hintCounts = %{numA: 0, numB: 0}
    # this call returns a map with hintCounts populated
    hintCounts = getHintHelper(secretList, secretList, guessList, hintCounts)
  end

  # returns a map containing As and Bs for bulls and cows game
  # assumes secretList, and guessList have same length
  def getHintHelper(secretListOriginal, secretList, guessList, hintCounts) do
    if (length(secretList) > 0) do
      cond do
        # A - places match
        hd(secretList) == hd(guessList) ->
          getHintHelper(
            secretListOriginal,
            tl(secretList),
            tl(guessList),
            %{hintCounts | numA: hintCounts.numA + 1}
          )
        # B - secret contains a guess character
        Enum.member?(secretListOriginal, hd(guessList)) ->
          getHintHelper(
            secretListOriginal,
            tl(secretList),
            tl(guessList),
            %{hintCounts | numB: hintCounts.numB + 1}
          )
        true -> # nothing found, check rest
          getHintHelper(
            secretListOriginal,
            tl(secretList),
            tl(guessList),
            hintCounts
          )
      end
    else
      hintCounts
    end
  end

  # returns true if the game has ended and false otherwise
  def hasGameEnded(guesses, secret) do
    (length(guesses) >= 8 || Enum.member?(guesses, secret))
  end


  # returns a view to the user (what the user should see)
  def view(state) do
    # return a map with guesses, hints, and status
    %{
      guesses: MapSet.toList(state.guesses),
      hints: state.hints,
      status: state.status
    }
  end

  # generates a random 4-digit integer
  def generateSecret() do
    temp = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    # result here contains a map of four integers
    result = generateSecretHelp(temp, MapSet.new, 4)
    # translate map into 4-character string
    mapToString(MapSet.to_list(result), "");
  end

  # returns a string representation of the list
  def mapToString(list, result) do
    if (length(list) > 0) do
      result = result <> to_string(hd(list))
      mapToString(tl(list), result)
    else
      result
    end
  end

  # returns a mapSet containing 4 unique integers
  def generateSecretHelp(list, mapSet, count) do
    if (count > 0) do
      el = Enum.random(list)
      mapSet = MapSet.put(mapSet, el)
      list = List.delete(list, el)
      generateSecretHelp(list, mapSet, count - 1)
    else
      mapSet
    end
  end

end