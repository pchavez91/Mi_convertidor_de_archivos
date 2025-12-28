@echo off
echo Actualizando pip...
py -m pip install --upgrade pip

echo.
echo Instalando dependencias del backend...
py -m pip install -r requirements.txt

echo.
echo Instalacion completada!
pause

