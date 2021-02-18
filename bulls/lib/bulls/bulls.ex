defmodule FourDigits.Game do

  # returns new game
  def new() do
    %{
      guesses: MapSet.new(),
      guess: "",
      secret: generateSecret(),
      hints: [],
      status: ""
    }
  end


  # replacement for FourDigits.js version of makeGuess
  def makeGuess(state, guess) do
    # TODO: do stuff
  end


  # returns a view to the user (what the user should see)
  def view(state) do
    # TODO: implement
  end

  # generates a random 4-digit integer
  def generateSecret() do
    temp = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    result = generateSecretHelp(temp, MapSet.new, 4)
    # TODO: translate map into 4-character string
    result
  end

  def generateSecretHelp(list, set, count) do
    if (count > 0) do
      el = Enum.random(temp)
      set.put(el)
      temp = temp -- el
      generateSecretHelp(temp, set, count - 1)
    else
      set
    end
  end

end