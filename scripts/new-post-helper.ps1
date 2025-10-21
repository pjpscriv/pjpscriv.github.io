# Hugo helper function for creating posts
function New-Post {
    param(
        [Parameter(ValueFromRemainingArguments=$true)]
        [string[]]$Arguments
    )
    
    # Default values
    $Name = "new-post-$(Get-Date -Format 'yyyy-MM-dd-HHmm')"
    $Kind = "post"
    $Lang = "en"
    
    # Valid values for validation
    $ValidLangs = @("en", "fr")
    $ValidKinds = @("post", "data-viz", "dataviz")
    
    # Process each argument
    foreach ($arg in $Arguments) {
        if ($arg -in $ValidLangs) {
            $Lang = $arg
            Write-Host "Set language to: $Lang" -ForegroundColor Green
        }
        elseif ($arg -in $ValidKinds) {
            if ($arg -eq "dataviz") {
                $Kind = "data-viz"
            } else {
                $Kind = $arg
            }
            Write-Host "Set kind to: $Kind" -ForegroundColor Green
        }
        else {
            # Assume it's the title/name
            $Name = $arg.ToLower() -replace '\s+', '-'
            Write-Host "Set name to: $Name" -ForegroundColor Green
        }
    }
    
    Write-Host "Creating $Kind post '$Name' in $Lang..." -ForegroundColor Yellow
    
    if ($Kind -eq "post") {
        hugo new "content/$Lang/post/$Name.md"
    } else {
        hugo new --kind data-viz "content/$Lang/data-viz/$Name.md"
    }
}

# Alias for shorter command
Set-Alias -Name newpost -Value New-Post

Write-Host "New-Post function and newpost alias loaded!" -ForegroundColor Green
Write-Host "Usage examples:" -ForegroundColor Yellow
Write-Host "  newpost                           # Creates post with auto-generated name"
Write-Host "  newpost 'my-article'              # Creates English post"
Write-Host "  newpost 'my-viz' data-viz         # Creates English data-viz (any order)"
Write-Host "  newpost 'my-viz' dataviz          # Same as above (dataviz alias)"
Write-Host "  newpost fr 'mon-article'          # Creates French post (any order)"
Write-Host "  newpost dataviz fr 'ma-viz'       # Creates French data-viz (any order)"
