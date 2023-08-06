$token = "EwCQA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAbEFiUZWfF7M4RtT6pwBK4I+GBjOWFBB0PDzO4a55qB5lLOVGeHDdZFeIn142+jEDLHMXEOHJJhHqRL1VXEyri10UOHG4H7PSLU7JMcPqQeVp8ypAUV73RdjnbiNESiR/lcHnBiyvMFCsCUq2GUDerPaOhH8pIRINRZW8whQ0vRHXLx3R7Y0S9hwjtJ0a8+8fspklvrzrvhGKb1DA+6O61dDQaZzEwYy3rT2/ptbSyFap3dEHhJey4zwfBmzX2o3M0dNrDD/JwB078Pp6fur2LABsQ0VLOug7kS6biGl7j5k1z3VLwHG/ivusD5+rjNX/Gvhuzpcm4rG7vXbdwtaTAQDZgAACIxo7cpDxZoXYAKrNiqg3aCrceqCdHQTOmhdYoiz8jlKTn44HkA1u3r5MrpvPv/YGiyQ7ZCSIffBLMIRL9QX4I85ZBPbiTnwkdieeoL125aQGuVMwrzzIWwzFx2FnflxJSwXqxgLHDSPiFDXSrgYVJmvm64F1u1iZGNQY5WL562m93hqTsudCjnLrem2Ld6H7tXz2RwwwtXR+3JuJQQcKbv6EQcgGfZ76XI4xS7XCn7bbItKElZej9Ofc3BNgoMlNljqle7lY0VX7hlA/3e4YSoL04dTobkBm19O0CPJAYJvR4nsQ6zF/8YqYnDIB+hNyDJTlFBQ8Hh9tQKewQ2VRCzv4poOKnDTmkNPEnkEk8B9eKpRiuYVQMpW487mugXQnuSraigEz8BXeYwzy05pxwtnaWtKEJa+e0mDClAThK1vXU8g9n0hZg0XVE3eAu9+QAlfnQfqKufffu9aUnK/FU/y+M6nHt4ilZnK/nXRCOwfG1p30iDiVFcHVw0Cx7nytZoOx43c/C/jnXS+YAKFSPTem6dfGsaIHlRdM5F27yqYi1nzVZeJ+JQKqWnkXoBXgRQ2GDJ62Yz8OqAzpvF78UW1X85adhVgM7eUp74ZaP8dMLqtoMsa6DUBAJAXzC7nUO+GlsOv7ynuEXqgonyU4rTfdG4R/4hEIFObAetabKxYLiHhbOkUmcy547Qw2Zlu8fseWcB/yOSyxLBr+JOpwIFL2pyQg6hzkg6E5f51uM9amCVHnXd4rIEZGCtrLSejp0xLwgMOph9toML1TcItqZlcl8nzySj/rwVEYtRlvWaoQXxiJ1X7kRVSeHkC"

function GetNootbooks {
    param (
    )
    # 获取notebooks
    Invoke-WebRequest -Uri "https://graph.microsoft.com/v1.0/me/onenote/notebooks" -Headers @{Authorization = "Bearer $token" } | Select-Object -ExpandProperty Content    
}

function GetSections {
    param (
        [string]$noteBookId = "0-48A286C26FFBF20E!1211"
    )
    # 获取笔记本分区
    Invoke-WebRequest -Uri "https://graph.microsoft.com/v1.0/users/me/onenote/notebooks/$noteBookId/sections" -Headers @{Authorization = "Bearer $token" } | Select-Object -ExpandProperty Content    
}

function GetPages {
    param (
        [string]$sectionId = "0-48A286C26FFBF20E!2922"
    )
    # 获取section pages
    Invoke-WebRequest -Uri "https://graph.microsoft.com/v1.0/users/me/onenote/sections/$sectionId/pages" -Headers @{Authorization = "Bearer $token" } | Select-Object -ExpandProperty Content    
}

function GetContent {
    param (
        [string]$pageId = "0-9119a58f528b5d4a934b4657bf127a4e!1-48A286C26FFBF20E!2922"
    )
    Invoke-WebRequest -Uri "https://graph.microsoft.com/v1.0/users/me/onenote/pages/$pageId/content" -Headers @{Authorization = "Bearer $token" } | Select-Object -ExpandProperty Content
}

function CreatePage {
    param (
        [string]$sectionId = "0-48A286C26FFBF20E!2922"
    )
    $header = @{
        Authorization = "Bearer $token" 
    }
    Invoke-WebRequest -Uri "https://graph.microsoft.com/v1.0/me/onenote/sections/$sectionId/pages" -Headers $header `
        -ContentType "text/html" -Body '<!DOCTYPE html><html><head><title>测试创建页面</title><meta name="created" content="2023-08-06T17:03:00.0000000" /></head><body><p>测试一下能不能创建</p></body></html>' `
        -Method Post
}

CreatePage