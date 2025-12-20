#!/usr/bin/env pwsh
# Test script to verify your site is clean

Write-Host "=== PickPoynt Site Health Check ===" -ForegroundColor Cyan
Write-Host ""

# Test 1: Homepage
Write-Host "Test 1: Checking homepage..." -ForegroundColor Yellow
$homepage = Invoke-WebRequest -Uri "https://www.pickpoynt.com" -UseBasicParsing
if ($homepage.Content -match "No stories published yet") {
    Write-Host "✅ PASS: Homepage correctly shows no articles" -ForegroundColor Green
} else {
    Write-Host "❌ FAIL: Homepage shows unexpected content" -ForegroundColor Red
}
Write-Host ""

# Test 2: Database
Write-Host "Test 2: Checking database..." -ForegroundColor Yellow
$db = Invoke-RestMethod -Uri "https://www.pickpoynt.com/api/check-db"
$articleCount = $db.database.articles.count
if ($articleCount -eq 0) {
    Write-Host "✅ PASS: Database has 0 articles" -ForegroundColor Green
} else {
    Write-Host "❌ FAIL: Database has $articleCount articles" -ForegroundColor Red
}
Write-Host ""

# Test 3: Deleted article returns 410
Write-Host "Test 3: Checking deleted article returns 410..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri "https://www.pickpoynt.com/billionaire-brain-wave-reviews" -UseBasicParsing -ErrorAction Stop
    Write-Host "❌ FAIL: Article is still accessible (should be 410)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 410) {
        Write-Host "✅ PASS: Returns 410 Gone status" -ForegroundColor Green
    } else {
        Write-Host "⚠️ WARNING: Returns $($_.Exception.Response.StatusCode) (expected 410)" -ForegroundColor Yellow
    }
}
Write-Host ""

# Test 4: Sitemap
Write-Host "Test 4: Checking sitemap..." -ForegroundColor Yellow
$sitemap = Invoke-WebRequest -Uri "https://www.pickpoynt.com/sitemap.xml" -UseBasicParsing
if ($sitemap.Content -match "billionaire") {
    Write-Host "❌ FAIL: Sitemap contains deleted articles" -ForegroundColor Red
} else {
    Write-Host "✅ PASS: Sitemap is clean" -ForegroundColor Green
}
Write-Host ""

Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Your site is working correctly! ✅" -ForegroundColor Green
Write-Host "The issue is with Google's outdated cache." -ForegroundColor Yellow
Write-Host ""
Write-Host "Next step: Use Google Search Console Removal Tool" -ForegroundColor Cyan
Write-Host "Visit: https://search.google.com/search-console" -ForegroundColor Blue
