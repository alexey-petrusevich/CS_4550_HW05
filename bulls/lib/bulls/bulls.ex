defmodule FourDigits.Game do

  # returns new game
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
    # update state (map) with new value of guesses
    # put new guess into state.guesses
    %{state | guesses: MapSet.put(state.guesses, newGuess)}
  end


  # returns a view to the user (what the user should see)
  def view(state) do
    # TODO: implement
    # guesses, hints, status
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
  defp mapToString(list, result) do
    if (Enum.size(list) > 0) do
      result = result <> to_string(hd(list))
      mapToString(tl(list), result)
    else
      result
    end
  end

  # returns a mapSet containing 4 unique integers
  defp generateSecretHelp(list, mapSet, count) do
    if (count > 0) do
      el = Enum.random(list)
      mapSet.put(el)
      list = list -- el
      generateSecretHelp(list, mapSet, count - 1)
    else
      mapSet
    end
  end

end