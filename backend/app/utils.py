from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash(password: str):
    return pwd_context.hash(password)


def verify(password_plain: str, password_hash: str):
    return pwd_context.verify(password_plain, password_hash)