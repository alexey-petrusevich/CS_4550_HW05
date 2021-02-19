defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  @impl true
  def join("game:" <> _id, payload, socket) do
    if authorized?(payload) do
      game = FourDigits.Game.new()
      # store value of the new game in the socket
      socket = assign(socket, :game, game)
      # generate view from the initial game
      view = FourDigits.Game.view(game)
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("guess", %{"newGuess" => newGuess}, socket) do
    # load game from the socket
    game0 = socket.assigns[:game]
    # call make guess for the game to get new game state
    game1 = FourDigits.Game.makeGuess(game0, newGuess)
    # store new value of the game in the socket
    socket = assign(socket, :game, game1)
    # generate new view of the game
    view = FourDigits.Game.view(game1)
    {:reply, {:ok, view}, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (game:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
