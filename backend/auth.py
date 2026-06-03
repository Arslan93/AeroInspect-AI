from fastapi import APIRouter
from pydantic import BaseModel
import json
import os

router = APIRouter()

USERS_FILE = "users.json"


class User(BaseModel):
    name: str
    email: str
    password: str


class LoginData(BaseModel):
    email: str
    password: str


def load_users():
    if not os.path.exists(USERS_FILE):
        return []

    with open(USERS_FILE, "r") as f:
        return json.load(f)


def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)


@router.post("/signup")
def signup(user: User):

    users = load_users()

    existing = next(
        (u for u in users if u["email"] == user.email),
        None
    )

    if existing:
        return {
            "success": False,
            "message": "Email already exists"
        }

    users.append(user.dict())

    save_users(users)

    return {
        "success": True,
        "user": {
            "name": user.name,
            "email": user.email
        }
    }


@router.post("/login")
def login(data: LoginData):

    users = load_users()

    user = next(
        (
            u for u in users
            if u["email"] == data.email
            and u["password"] == data.password
        ),
        None
    )

    if not user:
        return {
            "success": False,
            "message": "Invalid credentials"
        }

    return {
        "success": True,
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }