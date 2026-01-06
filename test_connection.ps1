# Script para probar la conexión con el backend
Write-Host "🔍 Probando conexión con el backend..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/" -Method GET -TimeoutSec 5 -UseBasicParsing
    Write-Host "✅ Conexión exitosa!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Contenido:" -ForegroundColor Yellow
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error de conexión:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Message -like "*refused*") {
        Write-Host "`n💡 El backend no está respondiendo en el puerto 8000" -ForegroundColor Yellow
        Write-Host "   Verifica que el backend esté corriendo:" -ForegroundColor Yellow
        Write-Host "   cd backend" -ForegroundColor White
        Write-Host "   py main.py" -ForegroundColor White
    }
}

Write-Host "`n🔍 Verificando procesos en el puerto 8000..." -ForegroundColor Cyan
$netstat = netstat -ano | Select-String ":8000"
if ($netstat) {
    Write-Host "Puerto 8000 está en uso:" -ForegroundColor Yellow
    $netstat | ForEach-Object { Write-Host $_ -ForegroundColor White }
} else {
    Write-Host "⚠️  No hay procesos escuchando en el puerto 8000" -ForegroundColor Red
}
