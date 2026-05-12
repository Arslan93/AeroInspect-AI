import os
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT = os.path.join(BASE_DIR, "dataset")

DATASETS = [
    "Crack Detection.v2.yolov8",
    "Corrosion.v1.yolov8",
    "leakage.v1.yolov8",
    "dust.v1.yolov8",
    "Spalling.v1.yolov8"
]

def ensure_dirs():
    for split in ["train", "valid", "test"]:
        img_dir = os.path.join(OUTPUT, split, "images")
        lbl_dir = os.path.join(OUTPUT, split, "labels")

        os.makedirs(img_dir, exist_ok=True)
        os.makedirs(lbl_dir, exist_ok=True)

def copy_data():
    counter = 0

    for dataset in DATASETS:
        dataset_path = os.path.join(BASE_DIR, dataset)
        print(f"\n📦 Merging: {dataset}")

        for split in ["train", "valid", "test"]:
            img_src = os.path.join(dataset_path, split, "images")
            lbl_src = os.path.join(dataset_path, split, "labels")

            if not os.path.exists(img_src):
                print(f"⚠️ Skipping {dataset}/{split} (no images)")
                continue

            for file in os.listdir(img_src):
                if not (file.endswith(".jpg") or file.endswith(".png")):
                    continue

                name, ext = os.path.splitext(file)

                new_name = f"{dataset}_{counter}{ext}"

                img_dest = os.path.join(OUTPUT, split, "images", new_name)
                lbl_dest = os.path.join(OUTPUT, split, "labels", new_name.replace(ext, ".txt"))

                # Copy image
                shutil.copy(os.path.join(img_src, file), img_dest)

                # Copy label (if exists)
                label_file = os.path.join(lbl_src, name + ".txt")
                if os.path.exists(label_file):
                    shutil.copy(label_file, lbl_dest)

                counter += 1

    print("\n✅ MERGE COMPLETE")


if __name__ == "__main__":
    print("📁 Creating output folders...")
    ensure_dirs()

    print("🚀 Starting merge...")
    copy_data()