"""Render every page of credential.pdf in a verify folder to credential-1.png, credential-2.png, ...

Usage (from the project root):
    python tools/render-verify-pdf.py verify/NOC-ARF7-36RY-DHWFZ

Needs PyMuPDF:  pip install pymupdf
"""
import glob
import os
import sys

import fitz  # PyMuPDF

SCALE = 3  # 3x of the PDF's 72-dpi page size, so text stays sharp on high-density screens

folder = sys.argv[1]
pdf_path = os.path.join(folder, "credential.pdf")

for old in glob.glob(os.path.join(folder, "credential-*.png")):
    os.remove(old)

doc = fitz.open(pdf_path)
for i, page in enumerate(doc, start=1):
    pix = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE), alpha=False)  # opaque white background
    out = os.path.join(folder, f"credential-{i}.png")
    pix.save(out)
    print(f"{out}  {pix.width}x{pix.height}")
