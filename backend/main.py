from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO
from datetime import datetime
import shutil
import os
import json
import logging
import uuid
from datetime import datetime
import cv2
import matplotlib.pyplot as plt
from reportlab.platypus import Image as RLImage
from reportlab.lib.units import inch
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
)
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet
from fastapi import Body
import json
from auth import (
    hash_password,
    verify_password,
    create_access_token
)

# ------------------ APP ------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ FOLDERS ------------------
UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app.mount("/files", StaticFiles(directory=OUTPUT_FOLDER), name="files")

# ------------------ STORAGE ------------------
JOBS = {}
HISTORY_FILE = "history.json"

if not os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, "w") as f:
        json.dump([], f)

# ------------------ MODEL ------------------
models = {}

def get_model(model_key):
    if model_key not in models:
        print("Loading model:", model_key)

        if model_key == "nano":
            models[model_key] = YOLO("yolov8n.pt")

        elif model_key == "small":
            models[model_key] = YOLO("yolov8s.pt")

        elif model_key == "custom":
            models[model_key] = YOLO("runs/detect/train-5/weights/best.pt")

        else:
            models[model_key] = YOLO("yolov8n.pt")

    return models[model_key]

# ------------------ ROUTES ------------------
@app.get("/")
def home():
    return {"message": "Backend running"}

@app.get("/status/{job_id}")
def get_status(job_id: str):
    return JOBS.get(job_id, {"error": "Invalid job id"})

@app.get("/history")
def get_history():
    with open(HISTORY_FILE, "r") as f:
        return json.load(f)
    
@app.post("/signup")
async def signup(data: dict = Body(...)):
    with open("users.json", "r") as f:
        users = json.load(f)

    email = data["email"]

    existing = next(
        (u for u in users if u["email"] == email),
        None
    )

    if existing:
        return {"error": "User already exists"}

    user = {
        "email": email,
        "password": hash_password(data["password"])
    }

    users.append(user)

    with open("users.json", "w") as f:
        json.dump(users, f)

    token = create_access_token({
        "email": email
    })

    return {
        "token": token,
        "email": email
    }


@app.post("/login")
async def login(data: dict = Body(...)):
    with open("users.json", "r") as f:
        users = json.load(f)

    user = next(
        (u for u in users if u["email"] == data["email"]),
        None
    )

    if not user:
        return {"error": "Invalid credentials"}

    if not verify_password(
        data["password"],
        user["password"]
    ):
        return {"error": "Invalid credentials"}

    token = create_access_token({
        "email": user["email"]
    })

    return {
        "token": token,
        "email": user["email"]
    }    
    

# ------------------ PDF ------------------

def generate_severity_chart(results, chart_path):
    severity_count = {"HIGH": 0, "MEDIUM": 0, "LOW": 0}

    for r in results:
        sev = r["severity"]
        if sev in severity_count:
            severity_count[sev] += 1

    labels = list(severity_count.keys())
    values = list(severity_count.values())

    plt.figure()
    plt.pie(values, labels=labels, autopct="%1.1f%%")
    plt.title("Severity Distribution")

    plt.savefig(chart_path)
    plt.close()

def generate_pdf(image_path, detections, defects, alerts, severity, output_path):
    doc = SimpleDocTemplate(output_path, pagesize=A4)
    styles = getSampleStyleSheet()

    elements = []

    # ---------------- HEADER ----------------
    elements.append(Paragraph("<b>AeroInspect AI - Structural Inspection Report</b>", styles["Title"]))
    elements.append(Spacer(1, 12))

    # ---------------- META INFO ----------------
    elements.append(Paragraph(f"<b>Date:</b> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", styles["Normal"]))
    elements.append(Paragraph("<b>Inspector:</b> AI Vision System", styles["Normal"]))
    elements.append(Spacer(1, 12))

    # ---------------- SUMMARY TABLE ----------------
    total = len(detections)

    summary_data = [
        ["Metric", "Value"],
        ["Severity", severity],
        ["Total Detections", str(total)],
        ["Defects Found", ", ".join(defects)]
    ]

    summary_table = Table(summary_data, colWidths=[200, 250])
    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ]))

    elements.append(summary_table)
    elements.append(Spacer(1, 15))

    # ---------------- SEVERITY BADGE ----------------
    color = colors.green
    if severity == "HIGH":
        color = colors.red
    elif severity == "MEDIUM":
        color = colors.orange

    severity_box = Table([[f"SEVERITY: {severity}"]], colWidths=[450])
    severity_box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), color),
        ("TEXTCOLOR", (0, 0), (-1, -1), colors.white),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("FONTSIZE", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))

    elements.append(severity_box)
    elements.append(Spacer(1, 20))

    # ---------------- DETECTIONS TABLE ----------------
    elements.append(Paragraph("<b>Detected Objects</b>", styles["Heading2"]))
    elements.append(Spacer(1, 6))

    table_data = [["Label", "Confidence"]]
    for d in detections:
        table_data.append([d["label"], str(d["confidence"])])

    det_table = Table(table_data, colWidths=[200, 150])
    det_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
    ]))

    elements.append(det_table)
    elements.append(Spacer(1, 20))

    # ---------------- IMAGE SECTION ----------------
    elements.append(Paragraph("<b>Inspection Image</b>", styles["Heading2"]))
    elements.append(Spacer(1, 8))

    elements.append(Image(image_path, width=5 * inch, height=3 * inch))
    elements.append(Spacer(1, 20))

    # ---------------- ALERTS ----------------
    if alerts:
        elements.append(Paragraph("<b>System Alerts</b>", styles["Heading2"]))
        for a in alerts:
            elements.append(Paragraph(f"• {a}", styles["Normal"]))
        elements.append(Spacer(1, 15))

    # ---------------- RECOMMENDATIONS ----------------
    elements.append(Paragraph("<b>Recommendations</b>", styles["Heading2"]))

    if severity == "HIGH":
        msg = "Immediate structural repair required. Risk of failure is high."
    elif severity == "MEDIUM":
        msg = "Monitor condition and schedule maintenance."
    else:
        msg = "No immediate action required."

    elements.append(Paragraph(msg, styles["Normal"]))
    elements.append(Spacer(1, 25))

    # ---------------- FOOTER ----------------
    elements.append(Paragraph(
        "Generated by AeroInspect AI System | Confidential Report",
        styles["Italic"]
    ))

    doc.build(elements)
 

def generate_batch_pdf(results, output_path, model_name):
    doc = SimpleDocTemplate(output_path, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    # ---------------- HEADER ----------------
    elements.append(Paragraph("<b>AeroInspect AI - Batch Inspection Report</b>", styles["Title"]))
    elements.append(Spacer(1, 12))

    elements.append(Paragraph(f"<b>Model Used:</b> {model_name}", styles["Normal"]))
    elements.append(Paragraph(f"<b>Date:</b> {datetime.now()}", styles["Normal"]))
    elements.append(Spacer(1, 12))

    # ---------------- SUMMARY ----------------
    total_images = len(results)
    total_cracks = sum(len(r["defects"]) for r in results)

    elements.append(Paragraph("<b>Inspection Summary</b>", styles["Heading2"]))
    elements.append(Paragraph(f"Total Images: {total_images}", styles["Normal"]))
    elements.append(Paragraph(f"Total Defects Detected: {total_cracks}", styles["Normal"]))
    elements.append(Spacer(1, 12))

    # ---------------- CHART ----------------
    chart_path = "outputs/chart.png"
    generate_severity_chart(results, chart_path)

    elements.append(Paragraph("<b>Severity Distribution</b>", styles["Heading2"]))
    elements.append(RLImage(chart_path, width=4*inch, height=3*inch))
    elements.append(Spacer(1, 20))

    # ---------------- EACH IMAGE ----------------
    for r in results:
        elements.append(Paragraph(f"<b>{r['name']}</b>", styles["Heading3"]))
        elements.append(Spacer(1, 5))

        elements.append(RLImage(r["image_path"], width=4*inch, height=3*inch))

        elements.append(Paragraph(f"Severity: {r['severity']}", styles["Normal"]))
        elements.append(Paragraph(f"Defects: {', '.join(r['defects'])}", styles["Normal"]))

        elements.append(Spacer(1, 20))

    # ---------------- FOOTER ----------------
    elements.append(Paragraph("Generated by AeroInspect AI System", styles["Italic"]))

    doc.build(elements)    

# ------------------ UPLOAD ------------------
@app.post("/upload")
async def upload(request: Request, file: UploadFile = File(...)):
    job_id = str(uuid.uuid4())

    batch_results = []

    try:
        JOBS[job_id] = {
            "state": "processing",
            "progress": 0,
            "message": "Starting..."
        }

        model_key = request.query_params.get("model", "nano")
        model = get_model(model_key)

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        # SAVE FILE
        JOBS[job_id].update({"progress": 20, "message": "Saving file..."})
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # RUN MODEL
        JOBS[job_id].update({"progress": 50, "message": "Running AI model..."})
        results = model(file_path)

        detections = []
        crack_count = 0

        for r in results:
            if r.boxes is None:
                continue

            for box in r.boxes:
                cls = int(box.cls[0])
                conf = float(box.conf[0])
                label = model.names[cls]

                detections.append({
                    "label": label,
                    "confidence": round(conf, 2)
                })

                if label == "crack":
                    crack_count += 1

        # SAVE IMAGE
        result_filename = f"output_{file.filename}"
        result_path = os.path.join(OUTPUT_FOLDER, result_filename)

        annotated = results[0].plot()
        cv2.imwrite(result_path, annotated)

        # LOGIC
        defects = []
        alerts = []
        severity = "LOW"
  
        if crack_count > 0:
            defects.append(f"{crack_count} cracks detected")
            alerts.append("Structural crack detected")
            severity = "HIGH"

        elif detections:
            defects.append("Other defects detected")
            severity = "MEDIUM"

        else:
            defects.append("No issues detected")

        # ---------------- FIXED BATCH ----------------
        batch_results.append({
            "name": file.filename,
            "image_path": result_path,   # ✅ FIXED
            "defects": defects,
            "severity": severity
        })

        # PDF
        JOBS[job_id].update({"progress": 80, "message": "Generating report..."})
        pdf_filename = f"report_{file.filename}.pdf"
        pdf_path = os.path.join(OUTPUT_FOLDER, pdf_filename)

        generate_pdf(result_path, detections, defects, alerts, severity, pdf_path)
        # ✅ CORRECT PLACE FOR BATCH PDF
        batch_pdf_filename = f"batch_{file.filename}.pdf"
        batch_pdf_path = os.path.join(OUTPUT_FOLDER, batch_pdf_filename)

        generate_batch_pdf(batch_results, batch_pdf_path, model_key)

        # HISTORY
        image_url = f"http://127.0.0.1:8000/files/{result_filename}"

        with open(HISTORY_FILE, "r") as f:
            history = json.load(f)

        history.append({
            "image": image_url,
            "severity": severity,
            "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "model": model_key
        })

        with open(HISTORY_FILE, "w") as f:
            json.dump(history, f, indent=4)

        # DONE
        JOBS[job_id] = {
            "state": "completed",
            "progress": 100,
            "message": "Completed successfully"
        }

        return {
            "job_id": job_id,
            "result": {
                "image": image_url,
                "detections": detections,
                "defects": defects,
                "alerts": alerts,
                "severity": severity
            },
            "report": f"http://127.0.0.1:8000/files/{pdf_filename}"
        }

    except Exception as e:
        logging.error(str(e))
        JOBS[job_id] = {
            "state": "error",
            "progress": 0,
            "message": str(e)
        }
        return {"error": str(e)}