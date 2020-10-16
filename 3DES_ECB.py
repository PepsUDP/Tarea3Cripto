from base64 import b64encode
from Crypto.Cipher import DES3
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes
import webbrowser

data = b'password'
while True:
    try:
        #Se obtiene llave aleatoria (en concordancia con los requisitos de 3DES
        #en bytes "y" hexadecimal
        key = DES3.adjust_key_parity(get_random_bytes(24))
        print(key)
        #Llave en ASCII para que sea de fácil uso en JavaScript
        keyASCII = b64encode(key).decode('utf-8')
        print(keyASCII)
        break
    except ValueError:
        pass

#Se establece el algoritmo y modo a utilizar
cipher = DES3.new(key, DES3.MODE_ECB)
#Se agrega padding al mensaje y se cifra con los parámetros establecidos 
#(Al ser ECB no necesitamos salt, IV, etc.). Se obtiene el mensaje cifrado en bytes.
ct_bytes = cipher.encrypt(pad(data,DES3.block_size))
#El mensaje cifrado se transforma a base64 para poder integrar con TamperMonkey
ct = b64encode(ct_bytes).decode('utf-8')
print(ct_bytes)
print(ct)

#Se abre el contacto con el archivo .html
f = open('3DES_ECB.html','w')
#Se escribe en el archivo
mensaje0 = """
<html>
<head></head>
<body>
<p>Mensaje Secreto</p>
<div class="key" id=\""""
f.write(mensaje0)
f.write(keyASCII)
mensaje1 = """\">
<p></p>
</div>
<div class="pad" id=\""""
f.write(mensaje1)
#Pkcs7 es el padding default para esta librería y algoritmo por lo que no es necesario enviarlo
#pero sigue siendo una variable al momento de cifrar, por lo que no está de más
f.write("pkcs7")
mensaje2 = """\">
<p></p>
</div>
<div class="3DES" id=\""""
f.write(mensaje2)
f.write(ct)
mensaje3 = """">
<p></p>
</div>
</body>
</html>"""
f.write(mensaje3)

#Se cierra el canal de comunicación
f.close()

#Comando para abrir el archivo .html en una nueva pestaña
webbrowser.open_new_tab('3DES_ECB.html')