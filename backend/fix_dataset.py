import os

# 🔥 BASE PATH (VERY IMPORTANT)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 🔥 DATASET CONFIG
DATASETS = {
    "crack": {
        "path": os.path.join(BASE_DIR, "Crack Detection.v2.yolov8"),
        "class_id": 0
    },
    "corrosion": {
        "path": os.path.join(BASE_DIR, "Corrosion.v1.yolov8"),
        "class_id": 1
    },
    "leakage": {
        "path": os.path.join(BASE_DIR, "leakage.v1.yolov8"),
        "class_id": 2
    },
    "dust": {
        "path": os.path.join(BASE_DIR, "dust.v1.yolov8"),
        "class_id": 3
    },
    "spalling": {
        "path": os.path.join(BASE_DIR, "Spalling.v1.yolov8"),
        "class_id": 4
    }
}

def fix_labels(label_folder, class_id):
    if not os.path.exists(label_folder):
        print(f"❌ Folder NOT found: {label_folder}")
        return 0

    files = [f for f in os.listdir(label_folder) if f.endswith(".txt")]
    count = 0

    for file in files:
        file_path = os.path.join(label_folder, file)

        with open(file_path, "r") as f:
            lines = f.readlines()

        new_lines = []
        for line in lines:
            parts = line.strip().split()
            if len(parts) > 0:
                parts[0] = str(class_id)
                new_lines.append(" ".join(parts))

        with open(file_path, "w") as f:
            f.write("\n".join(new_lines))

        count += 1

    return count


def process_dataset(name, info):
    base_path = info["path"]
    class_id = info["class_id"]

    print(f"\n🔧 Processing: {name.upper()} → class {class_id}")
    print(f"📂 Path: {base_path}")

    if not os.path.exists(base_path):
        print("❌ DATASET FOLDER NOT FOUND — CHECK NAME")
        return

    total = 0

    for split in ["train", "valid", "test"]:
        label_path = os.path.join(base_path, split, "labels")
        fixed = fix_labels(label_path, class_id)

        print(f"   {split}: {fixed} files fixed")
        total += fixed

    print(f"✅ Total fixed in {name}: {total}")


# 🚀 RUN ALL
for name, info in DATASETS.items():
    process_dataset(name, info)

print("\n🎯 ALL DATASETS PROCESSED SUCCESSFULLY")