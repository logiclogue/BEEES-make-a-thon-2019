import socketio

sio = socketio.Server()

app = socketio.WSGIApp(sio)

@sio.on("connect")
def connect(sid, environ):
    print("connect", sid)
