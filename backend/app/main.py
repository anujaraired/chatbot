from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Model (data structure)
class Item(BaseModel):
    name: str
    price: int

# Fake DB
items = []

# CREATE
@app.post("/items")
def create_item(item: Item):
    items.append(item)
    return {"message": "Item added", "data": item}

# READ ALL
@app.get("/items")
def get_items():
    return items

# READ ONE
@app.get("/items/{item_id}")
def get_item(item_id: int):
    return items[item_id]

# UPDATE
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    items[item_id] = item
    return {"message": "Item updated", "data": item}

# DELETE
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    deleted = items.pop(item_id)
    return {"message": "Item deleted", "data": deleted}