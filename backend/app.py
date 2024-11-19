# backend/app.py

from flask import Flask, jsonify, request

app = Flask(__name__)

# This will represent the game state
game_state = {
    "board": [["", "", ""], ["", "", ""], ["", "", ""]],
    "current_player": "X",
    "winner": None
}

@app.route("/start", methods=["GET"])
def start_game():
    global game_state
    game_state = {
        "board": [["", "", ""], ["", "", ""], ["", "", ""]],
        "current_player": "X",
        "winner": None
    }
    return jsonify(game_state)

@app.route("/move", methods=["POST"])
def make_move():
    global game_state
    move = request.json
    row, col = move['row'], move['col']
    
    if game_state["board"][row][col] != "":
        return jsonify({"error": "Cell already filled!"}), 400
    
    game_state["board"][row][col] = game_state["current_player"]
    
    # Check for winner
    if check_winner():
        game_state["winner"] = game_state["current_player"]
    else:
        game_state["current_player"] = "O" if game_state["current_player"] == "X" else "X"
    
    return jsonify(game_state)

def check_winner():
    for row in game_state["board"]:
        if row[0] == row[1] == row[2] != "":
            return True
    for col in range(3):
        if game_state["board"][0][col] == game_state["board"][1][col] == game_state["board"][2][col] != "":
            return True
    if game_state["board"][0][0] == game_state["board"][1][1] == game_state["board"][2][2] != "":
        return True
    if game_state["board"][0][2] == game_state["board"][1][1] == game_state["board"][2][0] != "":
        return True
    return False

if __name__ == "__main__":
    app.run(debug=True)
