"""add foreign key post_users_fk to posts table

Revision ID: ba25bd4e6d15
Revises: 4f014b9c0fcd
Create Date: 2024-05-06 13:17:32.234005

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ba25bd4e6d15'
down_revision: Union[str, None] = '4f014b9c0fcd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_foreign_key("post_users_fk",source_table="posts",referent_table="users",local_cols=["owner_id"],remote_cols=['id'],ondelete="CASCADE")


def downgrade() -> None:
    op.drop_constraint(constraint_name="post_users_fk",table_name="posts") 
