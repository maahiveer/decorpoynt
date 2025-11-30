# Subcategory Feature

## Overview
This feature allows you to create hierarchical categories (parent-child relationships) for better content organization.

## Database Migration
Run this SQL in your Supabase SQL Editor:

```sql
-- Add parent_id column to categories table to support subcategories
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES categories(id) ON DELETE CASCADE;

-- Add index for faster queries on parent_id
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);

-- Add a comment explaining the feature
COMMENT ON COLUMN categories.parent_id IS 'Reference to parent category for creating subcategories. NULL means this is a top-level category.';
```

## How to Use

### Creating a Parent Category
1. Go to `/admin/categories`
2. Click "New Category"
3. Enter category name (e.g., "AI")
4. Leave "Parent Category" as "None (Top Level Category)"
5. Click "Create"

### Creating a Subcategory
1. Go to `/admin/categories`
2. Click "New Category"  
3. Enter category name (e.g., "AI Writing Tools")
4. Select a parent from the "Parent Category" dropdown (e.g., "AI")
5. Click "Create"

### Example Structure
```
AI (parent)
  ├─ AI Writing Tools (subcategory)
  ├─ AI Video Tools (subcategory)
  └─ AI Image Tools (subcategory)

Productivity (parent)
  ├─ Task Management (subcategory)
  └─ Time Tracking (subcategory)
```

### Features
- **Hierarchical Display**: Categories are displayed with visual indentation to show parent-child relationships
- **Parent Selection**: When creating/editing a category, you can select a parent category from a dropdown
- **Delete Protection**: You cannot delete a parent category that has subcategories (must delete children first)
- **Article Assignment**: Articles can be assigned to both parent categories and subcategories

### Visual Indicators
- Parent categories have a purple-pink gradient icon
- Subcategories have a blue-cyan gradient icon
- Subcategories are indented to show hierarchy
- Chevron icon (→) appears next to parent categories

## Implementation Details
- `parent_id` column in `categories` table stores the relationship
- NULL `parent_id` means top-level category
- Cascade delete ensures subcategories are deleted if parent is deleted
- Category manager displays hierarchical tree structure
