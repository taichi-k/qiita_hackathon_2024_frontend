from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socket
import asyncio
import uvicorn
import json


origins = [
    "http://localhost",
    "http://localhost:3000"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def udp_server(UDP_PORT, UDP_IP = "192.168.11.60"):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((UDP_IP, UDP_PORT))
    print(f"UDPサーバーが {UDP_IP}:{UDP_PORT} で開始されました。")
    while True:
        data, addr = sock.recvfrom(1024)
        # print(f"受信データ: {data.decode('utf-8')} from {addr}")
        with open('zigsim.txt', 'w', encoding='UTF-8') as f:
            f.write(data.decode("utf-8"))            

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/get_json")
async def read_root():
    return [
        {"name": "Taichi", "id": "taichi-k", "age": 28},
        {"name": "Maru", "id": "maru", "age": 27}
    ]

@app.get("/zigsim")
async def read_root():
    with open('zigsim.txt', 'r', encoding='UTF-8') as f:
        data = json.load(f)
    return data

def start_fastapi():
    print(f"FastAPIサーバーが {"127.0.0.1"}:{8000} で開始されました。")
    uvicorn.run(app, host="0.0.0.0", port=8000)

async def main():
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, start_fastapi)

    await udp_server(5001)

if __name__ == "__main__":
    asyncio.run(main())