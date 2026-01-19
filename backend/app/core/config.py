from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from pathlib import Path

import os

# Base directory for the backend
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent.parent.parent  # .../RAG

class Settings(BaseSettings):
    # OpenRouter API Key
    OPENROUTER_API_KEY: str

    # RAG Configuration
    DB_DIR: str = str((PROJECT_ROOT / "db").resolve())
    DATA_DIR: str = str((PROJECT_ROOT / "data").resolve())

    COLLECTION_NAME: str = "dataai"
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    LLM_MODEL: str = "openai/gpt-oss-20b"
    EMBEDDING_MODEL: str = "text-embedding-3-small"

    # Security
    ALLOWED_ORIGINS_STR: str = "http://localhost:3000,http://localhost:5173"
    ENABLE_INGEST_ENDPOINT: bool = False

    @property
    def ALLOWED_ORIGINS(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS_STR.split(",")]

    model_config = SettingsConfigDict(
        env_file=os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "..", ".env")),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
