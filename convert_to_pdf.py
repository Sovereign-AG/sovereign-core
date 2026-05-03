from weasyprint import HTML
import os

html_path = r"C:\Users\Aditya\Desktop\Sovereign AG\whitepaper_v5.html"
pdf_path = r"C:\Users\Aditya\Downloads\Sovereign-AG-Protocol-Whitepaper-v5.5.0.pdf"

print(f"Converting {html_path} to {pdf_path}...")
HTML(html_path).write_pdf(pdf_path)
print("Conversion successful.")
