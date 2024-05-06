from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# # from . import models 
# from .database import engine
from .routers import post, user, auth, vote
# from .config import settings

# models.Base.metadata.create_all(bind=engine)
# from Secweb.ContentSecurityPolicy import ContentSecurityPolicy
        
app = FastAPI()




origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


csp_policy = {
    "default-src": ["'self'", "https:", "blob:"],
    "connect-src": ["'self'", "https:", "http://127.0.0.1:8000"],
    "connect-src": ["'self'", "https:", "blob:"]
}

# csp_policy = {
#     "default-src": "'self'",
#     "img-src": [
#         "*",
#     ],
#     "connect-src": "'self'",
#     "script-src": "'self'",
#     "style-src": ["'self'", "'unsafe-inline'"],
# }


@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["Content-Security-Policy"] = "default-src 'self' https: blob:; connect-src 'self' http://127.0.0.1:8000 blob:;"
    return response

app.include_router(user.router)
app.include_router(post.router)
app.include_router(auth.router)
app.include_router(vote.router)

