# New Blog Setup Script
# This script helps you set up a new blog instance quickly

Write-Host "🚀 New Blog Setup Wizard" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Get blog name
$blogName = Read-Host "Enter your new blog name (e.g., my-awesome-blog)"
if ([string]::IsNullOrWhiteSpace($blogName)) {
    Write-Host "❌ Blog name is required!" -ForegroundColor Red
    exit 1
}

# Get destination path
$defaultPath = "d:\KDP\12\YT\German\$blogName"
$destinationPath = Read-Host "Enter destination path (press Enter for: $defaultPath)"
if ([string]::IsNullOrWhiteSpace($destinationPath)) {
    $destinationPath = $defaultPath
}

Write-Host ""
Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "  Blog Name: $blogName" -ForegroundColor White
Write-Host "  Destination: $destinationPath" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Continue? (y/n)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "❌ Setup cancelled" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🔧 Setting up your new blog..." -ForegroundColor Cyan

# Create destination directory
Write-Host "📁 Creating directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $destinationPath | Out-Null

# Get current directory (source)
$sourcePath = $PSScriptRoot

# Copy files (excluding specific directories and files)
Write-Host "📦 Copying files..." -ForegroundColor Yellow
$excludeDirs = @('.git', '.next', 'node_modules')
$excludeFiles = @('.env.local')

Get-ChildItem -Path $sourcePath -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Substring($sourcePath.Length)
    $shouldExclude = $false
    
    # Check if path contains excluded directories
    foreach ($dir in $excludeDirs) {
        if ($relativePath -like "*\$dir\*" -or $relativePath -like "*\$dir") {
            $shouldExclude = $true
            break
        }
    }
    
    # Check if file is in excluded files
    foreach ($file in $excludeFiles) {
        if ($_.Name -eq $file) {
            $shouldExclude = $true
            break
        }
    }
    
    if (-not $shouldExclude) {
        $destPath = Join-Path $destinationPath $relativePath
        
        if ($_.PSIsContainer) {
            New-Item -ItemType Directory -Force -Path $destPath | Out-Null
        } else {
            Copy-Item -Path $_.FullName -Destination $destPath -Force
        }
    }
}

Write-Host "✅ Files copied successfully!" -ForegroundColor Green
Write-Host ""

# Create .env.local template
Write-Host "📝 Creating .env.local template..." -ForegroundColor Yellow
$envContent = @"
# Supabase Configuration
# Get these from: https://supabase.com/dashboard/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
"@

$envPath = Join-Path $destinationPath ".env.local"
Set-Content -Path $envPath -Value $envContent

Write-Host "✅ .env.local template created!" -ForegroundColor Green
Write-Host ""

# Initialize git
Write-Host "🔧 Initializing Git repository..." -ForegroundColor Yellow
Set-Location $destinationPath
git init | Out-Null
git add . | Out-Null
git commit -m "Initial commit - $blogName" | Out-Null
Write-Host "✅ Git repository initialized!" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Your new blog is located at:" -ForegroundColor Cyan
Write-Host "   $destinationPath" -ForegroundColor White
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Create a Supabase project:" -ForegroundColor White
Write-Host "   → Go to https://supabase.com/dashboard" -ForegroundColor Gray
Write-Host "   → Create a new project" -ForegroundColor Gray
Write-Host "   → Run the SQL from 'supabase-schema.sql'" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Update .env.local with your Supabase credentials:" -ForegroundColor White
Write-Host "   → Open: $destinationPath\.env.local" -ForegroundColor Gray
Write-Host "   → Add your Supabase URL and keys" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Install dependencies and run:" -ForegroundColor White
Write-Host "   cd `"$destinationPath`"" -ForegroundColor Gray
Write-Host "   npm install" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Create your admin user:" -ForegroundColor White
Write-Host "   → Visit http://localhost:3000/admin/login" -ForegroundColor Gray
Write-Host "   → Sign up with your email" -ForegroundColor Gray
Write-Host "   → Set role to 'admin' in Supabase" -ForegroundColor Gray
Write-Host ""
Write-Host "5️⃣  Push to GitHub and deploy to Vercel" -ForegroundColor White
Write-Host ""
Write-Host "📚 For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "   → NEW_BLOG_DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host "   → DEPLOYMENT_CHECKLIST.md" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Happy blogging!" -ForegroundColor Cyan

# Ask if user wants to open the directory
Write-Host ""
$openDir = Read-Host "Open the new blog directory? (y/n)"
if ($openDir -eq 'y' -or $openDir -eq 'Y') {
    explorer $destinationPath
}

# Ask if user wants to open VS Code
Write-Host ""
$openVSCode = Read-Host "Open in VS Code? (y/n)"
if ($openVSCode -eq 'y' -or $openVSCode -eq 'Y') {
    code $destinationPath
}
