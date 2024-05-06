"""create users table

Revision ID: 4f014b9c0fcd
Revises: b30f3be6a9d5
Create Date: 2024-05-06 13:09:24.751148

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '4f014b9c0fcd'
down_revision: Union[str, None] = 'b30f3be6a9d5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('users',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('email', mysql.VARCHAR(length=200), nullable=False, unique=True),
    sa.Column('password', mysql.VARCHAR(length=200), nullable=False),
    sa.Column('created_at', mysql.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    )


def downgrade() -> None:
    op.drop_table('users')
