import environ

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

env = environ.Env()
environ.Env.read_env(env.str('ENV_FILE', '.env'))

# Create your views here.

def qrcode(request):
    return render(request, 'apps/qrcode.html')

def quote_generator(request):
    return render(request, 'apps/quote.html')

def weather(request):
    api_key = env('WEATHER_API_KEY')
    return render(request, 'apps/weather.html', {'api_key': api_key})

def cipher(request):
    result = None  # To store the result of the encryption/decryption
    error = None   # To store any errors

    if request.method == 'POST':
        text = request.POST.get('text')
        shift = int(request.POST.get('shift', 0))
        keyword = request.POST.get('keyword', '')
        operation = request.POST.get('operation')

        if not text:
            error = 'Text is required'
        else:
            # Perform the encryption or decryption based on the operation
            if operation == 'encrypt':
                if keyword:
                    result = vigenereEncrypt(text, keyword)
                else:
                    result = cesarEncrypt(text, shift)
            elif operation == 'decrypt':
                if keyword:
                    result = vigenereDecrypt(text, keyword)
                else:
                    result = cesarDecrypt(text, shift)
            else:
                error = 'Invalid operation'

    # Render the template with the result and error
    return render(request, 'apps/cipher.html', {'result': result, 'error': error})

def cesarEncrypt(text, shift):
    result = ""
    for caractere in text:
        if caractere.isalpha():
            ascii_offset = 65 if caractere.isupper() else 97
            result += chr((ord(caractere) - ascii_offset + shift) % 26 + ascii_offset)
        else:
            result += caractere
    return result

def vigenereEncrypt(text, keyword):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    grid_size = 26
    grid = []
    for i in range(grid_size):
        row = []
        for j in range(grid_size):
            row.append(alphabet[(i + j) % grid_size])
        grid.append(row)
    result = ""
    cle_index = 0
    for caractere in text.upper():
        if caractere.isalpha():
            cle_caractere = keyword[cle_index % len(keyword)].upper()
            pos = find_position(grid, caractere)
            if pos is None:
                result += caractere
            else:
                x, y = pos
                kx, ky = find_position(grid, cle_caractere)
                result += grid[(x + kx) % 26][(y + ky) % 26]
            cle_index += 1
        else:
            result += caractere
    return result

def cesarDecrypt(text, shift):
    result = ""
    for caractere in text:
        if caractere.isalpha():
            ascii_offset = 65 if caractere.isupper() else 97
            result += chr((ord(caractere) - ascii_offset - shift) % 26 + ascii_offset)
        else:
            result += caractere
    return result

def vigenereDecrypt(text, keyword):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    grid_size = 26
    grid = []
    for i in range(grid_size):
        row = []
        for j in range(grid_size):
            row.append(alphabet[(i + j) % grid_size])
        grid.append(row)
    result = ""
    cle_index = 0
    for caractere in text.upper():
        if caractere.isalpha():
            cle_caractere = keyword[cle_index % len(keyword)].upper()
            pos = find_position(grid, caractere)
            if pos is None:
                result += caractere
            else:
                x, y = pos
                kx, ky = find_position(grid, cle_caractere)
                result += grid[(x - kx + 26) % 26][(y - ky + 26) % 26]
            cle_index += 1
        else:
            result += caractere
    return result

def find_position(grid, caractere):
    for i, row in enumerate(grid):
        for j, cell in enumerate(row):
            if cell == caractere:
                return i, j
    raise ValueError(f"Character '{caractere}' not found in grid")
