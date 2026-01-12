const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function fixCategorySlugs() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.log('Supabase env vars missing')
        return
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: categories, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .or('slug.eq.,slug.is.null')

    if (error) {
        console.error('Error fetching categories:', error)
        return
    }

    console.log(`Found ${categories.length} categories with empty/null slugs.`)

    for (const category of categories) {
        const newSlug = category.name
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-')

        console.log(`Updating category "${category.name}" -> "${newSlug}"`)

        const { error: updateError } = await supabase
            .from('categories')
            .update({ slug: newSlug })
            .eq('id', category.id)

        if (updateError) {
            console.error(`Error updating category ${category.id}:`, updateError)
        }
    }

    console.log('Finished fixing category slugs.')
}

fixCategorySlugs()
