import environ
import os
import PyPDF2
import tempfile

from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template
from django.template import Context
from django.shortcuts import render
from django.conf import settings
from groq import Groq


# env = environ.Env()
# environ.Env.read_env(env.str('ENV_FILE', '.env'))

# Create your views here.

def quirky_hover(request):
    return render(request, 'functionalities/quirky_hover.html')

def fake_error(request):
    return render(request, 'functionalities/fake_error.html')

def revision_sheet_builder(request):
    print("revision_sheet_builder view called")
    if request.method == 'POST':
        print("Received POST request")
        pdf_file = request.FILES['pdf-file']
        print("Received PDF file:", pdf_file.name)
        with tempfile.TemporaryDirectory() as tmp_dir:
            pdf_path = os.path.join(tmp_dir, 'uploaded_pdf.pdf')
            print("Temporary PDF path:", pdf_path)
            with open(pdf_path, 'wb+') as f:
                for chunk in pdf_file.chunks():
                    f.write(chunk)
            print("PDF file saved to temporary location")
            # Parse and tokenize the PDF file
            tokens = tokenize_pdf(pdf_path)
            print("Tokens extracted!")
            # Call Groq API to generate summary
            summary = call_groq_api(tokens)
            print("Summary generated!")
            # Return the summary as a JSON response
            return JsonResponse({'summary': summary})
    return render(request, 'functionalities/revision.html')

def call_groq_api(tokens):
    client = Groq(api_key=settings.GROQ_API_KEY)
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {
                "role": "user",
                "content": "Write me a long revision sheet about this lecture course: " + tokens
            },
            {
                "role": "assistant",
                "content": " "
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )
    summary = ''
    for chunk in completion:
        summary += chunk.choices[0].delta.content or ''
    return summary

def tokenize_pdf(pdf_path):
    with open(pdf_path, 'rb') as f:
        pdf = PyPDF2.PdfReader(f)
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
        tokens = text.split()
        return ' '.join(tokens)
