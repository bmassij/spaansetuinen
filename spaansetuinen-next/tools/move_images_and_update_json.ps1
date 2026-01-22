# PowerShell script to move images into thematic folders and update content JSONs
# Location: spaansetuinen-next/tools/move_images_and_update_json.ps1

# Determine project root (spaansetuinen-next)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$root = Resolve-Path -Path (Join-Path $scriptDir '..')
$pub = Join-Path $root 'public'
$imagesRoot = Join-Path $pub 'images'
$contentDir = Join-Path $root 'content'

# Target directories to create under public/images
$dirs = @(
    'home','impressie','bomen\\olijf','bomen\\palm','bomen\\vijg','bomen\\druif',
    'bloembakken','potgrond','voeding','hydrokorrels','boomschors','service','verhuur',
    'plant-en-voedingstips','misc'
)
foreach($d in $dirs){
    $p = Join-Path $imagesRoot $d
    if(-not (Test-Path $p)){
        New-Item -Path $p -ItemType Directory | Out-Null
    }
}

# Helper: move file safely with duplicate avoidance and preserve timestamps
$moved = @()
function Move-Safe([System.IO.FileInfo]$f, [string]$destDir){
    if(-not (Test-Path $destDir)){
        New-Item -Path $destDir -ItemType Directory | Out-Null
    }
    $origCreation = $f.CreationTimeUtc
    $origLastWrite = $f.LastWriteTimeUtc
    $destPath = Join-Path $destDir $f.Name
    if(Test-Path $destPath){
        $base = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
        $ext = [System.IO.Path]::GetExtension($f.Name)
        $n = 1
        do { $candidate = Join-Path $destDir ("{0}-dup-{1}{2}" -f $base, $n, $ext); $n++ } while(Test-Path $candidate)
        $destPath = $candidate
    }
    Move-Item -LiteralPath $f.FullName -Destination $destPath
    try{
        $it = Get-Item $destPath
        $it.CreationTimeUtc = $origCreation
        $it.LastWriteTimeUtc = $origLastWrite
    } catch {}
    $moved += @{ from = $f.FullName; to = $destPath }
}

# Rule a: all files with basename starting 'impressie__' anywhere under public -> images/impressie
Get-ChildItem -Path $pub -Recurse -File | Where-Object { $_.BaseName -like 'impressie__*' } | ForEach-Object {
    Move-Safe $_ (Join-Path $imagesRoot 'impressie')
}

# Rule b: all files in public/foto huur -> images/verhuur
$fotoHuur = Join-Path $pub 'foto huur'
if(Test-Path $fotoHuur){
    Get-ChildItem -Path $fotoHuur -File | ForEach-Object { Move-Safe $_ (Join-Path $imagesRoot 'verhuur') }
}

# Rule c: classify files in public/vanalles
$van = Join-Path $pub 'vanalles'
if(Test-Path $van){
    Get-ChildItem -Path $van -File | ForEach-Object {
        $n = $_.Name.ToLower()
        $dest = 'misc'
        if($n -match 'olijf'){ $dest = 'bomen\\olijf' }
        elseif($n -match 'palm'){ $dest = 'bomen\\palm' }
        elseif($n -match 'vijg|ficus'){ $dest = 'bomen\\vijg' }
        elseif($n -match 'druif'){ $dest = 'bomen\\druif' }
        elseif($n -match 'bloembak|bloembakken'){ $dest = 'bloembakken' }
        elseif($n -match 'potgrond'){ $dest = 'potgrond' }
        elseif($n -match 'voeding'){ $dest = 'voeding' }
        elseif($n -match 'hydrokor|hydrokorrels'){ $dest = 'hydrokorrels' }
        elseif($n -match 'schors|boomschors'){ $dest = 'boomschors' }
        elseif($n -match 'huur'){ $dest = 'verhuur' }
        elseif($n -match 'service|bezorgen'){ $dest = 'service' }
        Move-Safe $_ (Join-Path $imagesRoot $dest)
    }
}

# Rule d: remaining files under public/images top-level (files directly in images root)
if(Test-Path $imagesRoot){
    Get-ChildItem -Path $imagesRoot -File | ForEach-Object {
        $n = $_.Name.ToLower()
        $destSub = 'misc'
        if($n -match '^impressie__'){ $destSub='impressie' }
        elseif($n -match 'olijf'){ $destSub='bomen\\olijf' }
        elseif($n -match 'palm'){ $destSub='bomen\\palm' }
        elseif($n -match 'vijg|ficus'){ $destSub='bomen\\vijg' }
        elseif($n -match 'druif'){ $destSub='bomen\\druif' }
        elseif($n -match 'bloembak|bloembakken'){ $destSub='bloembakken' }
        elseif($n -match 'potgrond'){ $destSub='potgrond' }
        elseif($n -match 'voeding'){ $destSub='voeding' }
        elseif($n -match 'hydrokor|hydrokorrels'){ $destSub='hydrokorrels' }
        elseif($n -match 'schors|boomschors'){ $destSub='boomschors' }
        elseif($n -match 'huur'){ $destSub='verhuur' }
        elseif($n -match 'service|bezorgen'){ $destSub='service' }
        if($destSub -ne 'misc'){ Move-Safe $_ (Join-Path $imagesRoot $destSub) } else { Move-Safe $_ (Join-Path $imagesRoot 'misc') }
    }
}

# Move any remaining files directly under public (not in subfolders) into images/misc or impressie rule
Get-ChildItem -Path $pub -File | ForEach-Object {
    $f = $_
    $n = $f.Name.ToLower()
    if($n -match '^impressie__'){ Move-Safe $f (Join-Path $imagesRoot 'impressie') } else { Move-Safe $f (Join-Path $imagesRoot 'misc') }
}

# Helper: pick images from thematic folder
function Pick-Images([string]$themeDir){
    $d = Join-Path $imagesRoot $themeDir
    if(-not (Test-Path $d)){ return @() }
    $items = Get-ChildItem -Path $d -File | Sort-Object Name
    $out = @()
    foreach($it in $items){
        $rel = '/images/' + ($it.FullName.Substring($pub.Length+1) -replace '\\','/')
        $out += $rel
    }
    return $out
}

# Prepare list of content files to consider
$contentFiles = Get-ChildItem -Path $contentDir -Filter '*.json' -File | ForEach-Object { $_.FullName }
$updatedJsons = @()
$pagesWithIssues = @()

function Update-JsonFile([string]$path, [string[]]$themeDirs){
    try{
        $raw = Get-Content -LiteralPath $path -Raw
        $json = $raw | ConvertFrom-Json -ErrorAction Stop
    } catch {
        return @{ path=$path; updated=$false; reason='json-read-failed' }
    }
    if(-not ($json | Get-Member -Name 'hero')){
        $json | Add-Member -MemberType NoteProperty -Name hero -Value @{ } -Force
    }
    $candidates = @()
    foreach($t in $themeDirs){ $candidates += (Pick-Images $t) }
    $candidates = $candidates | Select-Object -Unique
    if($candidates.Count -eq 0){ $candidates = Pick-Images 'misc' }
    if($candidates.Count -eq 0){ return @{ path=$path; updated=$false; reason='no-images' } }
    $hero = $candidates[0]
    $secondary = if($candidates.Count -ge 2){ $candidates[1] } else { $hero }
    $body = @()
    if($candidates.Count -ge 2){ $body += $candidates[0]; $body += $candidates[1] } else { $body += $hero; $body += $hero }
    $json.hero.image = $hero
    $json.hero.secondaryImage = $secondary
    $json.images = $body
    # write back preserving utf8
    $json | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $path -Encoding UTF8
    return @{ path=$path; updated=$true; hero=$hero; secondary=$secondary; images=$body }
}

# Determine target content files by exact filenames and heuristics
$targets = @()
foreach($f in $contentFiles){
    $name = [System.IO.Path]::GetFileName($f).ToLower()
    if($name -like 'bloembakken*.json'){ $targets += @{ file=$f; themes=@('bloembakken') } ; continue }
    if($name -eq 'plant-en-voedingstips.json'){ $targets += @{ file=$f; themes=@('plant-en-voedingstips') } ; continue }
    if($name -eq 'mediterrane-potgrond.json'){ $targets += @{ file=$f; themes=@('potgrond') } ; continue }
    if($name -eq 'mediterrane-voeding.json'){ $targets += @{ file=$f; themes=@('voeding') } ; continue }
    if($name -eq 'hydrokorrels.json'){ $targets += @{ file=$f; themes=@('hydrokorrels') } ; continue }
    if($name -eq 'boomschors.json'){ $targets += @{ file=$f; themes=@('boomschors') } ; continue }
    if($name -eq 'impressie.json'){ $targets += @{ file=$f; themes=@('impressie') } ; continue }
    if($name -eq 'verhuur.json'){ $targets += @{ file=$f; themes=@('verhuur') } ; continue }
    if($name -eq 'home.json'){ $targets += @{ file=$f; themes=@('home') } ; continue }
    # tree pages heuristics
    if($name -match 'olea|olijf|olijfboom'){ $targets += @{ file=$f; themes=@('bomen\\olijf') } ; continue }
    if($name -match 'ficus|vijg'){ $targets += @{ file=$f; themes=@('bomen\\vijg') } ; continue }
    if($name -match 'trachycarpus|palm|palmen|cycca|cyca'){ $targets += @{ file=$f; themes=@('bomen\\palm') } ; continue }
    if($name -match 'druif'){ $targets += @{ file=$f; themes=@('bomen\\druif') } ; continue }
}

# Process targets
foreach($t in $targets){
    $res = Update-JsonFile $t.file $t.themes
    if($res.updated -eq $true){ $updatedJsons += $res } else { $pagesWithIssues += $res }
}

# Validation: ensure image files exist for updated JSONs
$validationProblems = @()
foreach($u in $updatedJsons){
    $p = $u.path
    $j = Get-Content -LiteralPath $p -Raw | ConvertFrom-Json
    $missing = @()
    foreach($img in @($j.hero.image, $j.images[0], $j.images[1])){
        $disk = Join-Path $pub ($img.TrimStart('/'))
        if(-not (Test-Path $disk)) { $missing += $img }
    }
    if($missing.Count -gt 0){ $validationProblems += @{ file=$p; missing=$missing } }
}

# Produce concise summary to stdout
Write-Output "MOVED_COUNT=$($moved.Count)"
Write-Output "MOVED_LIST:"
foreach($x in $moved){ Write-Output ("  " + $x.from + ' => ' + $x.to) }
Write-Output "JSON_UPDATED_COUNT=$($updatedJsons.Count)"
foreach($u in $updatedJsons){
    Write-Output ("UPDATED: " + $u.path)
    Write-Output ("  hero.image: " + $u.hero)
    Write-Output ("  hero.secondaryImage: " + $u.secondary)
    Write-Output ("  images: " + ($u.images -join ', '))
}
if($pagesWithIssues.Count -gt 0){
    Write-Output "PAGES_WITH_ISSUES:"
    foreach($p in $pagesWithIssues){ Write-Output ("  " + ($p.path) + '  reason=' + ($p.reason)) }
}
if($validationProblems.Count -gt 0){
    Write-Output "VALIDATION_PROBLEMS:"
    foreach($v in $validationProblems){ Write-Output ("  " + $v.file + ' missing: ' + ($v.missing -join ', ')) }
}
Write-Output "DONE."
