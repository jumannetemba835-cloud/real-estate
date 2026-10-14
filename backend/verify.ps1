$base = "http://127.0.0.1:8000"

$r = Invoke-WebRequest -Uri "$base/api/properties/" -TimeoutSec 30
$list = $r.Content | ConvertFrom-Json
Write-Output ("LIST count=" + $list.count + " first=" + $list.results[0].id)

$r = Invoke-WebRequest -Uri "$base/api/properties/demo-masaki-01/" -TimeoutSec 30
$d = $r.Content | ConvertFrom-Json
Write-Output ("DETAIL id=" + $d.id + " price=" + $d.price + " availability=" + $d.availability)

$r = Invoke-WebRequest -Uri "$base/api/properties/?purpose=rent" -TimeoutSec 30
$f = $r.Content | ConvertFrom-Json
Write-Output ("FILTER purpose=rent count=" + $f.count)

try {
  Invoke-WebRequest -Uri "$base/api/enquiries/" -Method POST -ContentType "application/json" -Body '{"name":"Amina Juma","contact":"+255700000000","message":"Hello","consent":false}' -TimeoutSec 30 | Out-Null
  Write-Output "ENQUIRY no-consent: UNEXPECTED 2xx"
} catch {
  Write-Output ("ENQUIRY no-consent status=" + [int]$_.Exception.Response.StatusCode)
}

$r = Invoke-WebRequest -Uri "$base/api/enquiries/" -Method POST -ContentType "application/json" -Body '{"name":"Amina Juma","contact":"+255700000000","message":"Hello, verify test.","consent":true}' -TimeoutSec 30
Write-Output ("ENQUIRY valid status=" + $r.StatusCode)

$r = Invoke-WebRequest -Uri "$base/api/submissions/" -Method POST -ContentType "application/json" -Body '{"title":"Verify test flat","purpose":"rent","property_type":"apartment","neighbourhood":"Sinza","price":900000,"bedrooms":2,"contact":"+255700000000"}' -TimeoutSec 30
$s = $r.Content | ConvertFrom-Json
Write-Output ("SUBMISSION status=" + $r.StatusCode + " row-status=" + $s.status)
