defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  @impl true
  def join("game:" <> name, payload, socket) do
    if authorized?(payload) do
      game = BackupAgent.get(name) || FourDigits.Game.new()
      socket = socket
               |> assign(:game, game)
               |> assign(:name, name)
      BackupAgent.put(name, game)
      {:ok, %{"join" => name, "game" => FourDigits.Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("guess", %{"newGuess" => newGuess}, socket) do
    name = socket.assigns[:name]
    game = FourDigits.Game.guess(socket.assigns[:game], newGuess)
    socket = assign(socket, :game, game)
    BackupAgent.put(name, game)
    {:reply, {:ok, %{ "game" => FourDigits.Game.view(game)}}, socket}
  end


  @impl true
  def handle_in("reset", _, socket) do
    game = FourDigits.Game.new
    socket = assign(socket, :game, game)
    view = FourDigits.Game.view(game)
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
