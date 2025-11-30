-- Add parent_id column to categories table to support subcategories
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES categories(id) ON DELETE CASCADE;

-- Add index for faster queries on parent_id
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);

-- Add a comment explaining the feature
COMMENT ON COLUMN categories.parent_id IS 'Reference to parent category for creating subcategories. NULL means this is a top-level category.';
