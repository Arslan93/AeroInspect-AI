import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export function DronesPage() {

  const [drones, setDrones] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("drones") || "[]"
      );

    setDrones(saved);

  }, []);

  const addDrone = () => {

    if (!name || !model || !serial) {
      alert("Fill all fields");
      return;
    }

    const newDrone = {
      id: Date.now(),
      name,
      model,
      serial,
      status: "Active",
    };

    const updated = [...drones, newDrone];

    localStorage.setItem(
      "drones",
      JSON.stringify(updated)
    );

    setDrones(updated);

    setName("");
    setModel("");
    setSerial("");
  };

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Drone Management
        </h1>

        <p className="text-slate-400 mt-2">
          Add and manage inspection drones
        </p>

      </div>

      {/* FORM */}

      <div className="rounded-3xl border border-cyan-500/10 bg-[#071120]/70 p-8 backdrop-blur-xl">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            placeholder="Drone Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none focus:border-cyan-400"
          />

          <input
            placeholder="Drone Model"
            value={model}
            onChange={(e) =>
              setModel(e.target.value)
            }
            className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none focus:border-cyan-400"
          />

          <input
            placeholder="Serial Number"
            value={serial}
            onChange={(e) =>
              setSerial(e.target.value)
            }
            className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white outline-none focus:border-cyan-400"
          />

        </div>

        <button
          onClick={addDrone}
          className="mt-6 flex items-center gap-2 rounded-2xl px-6 py-4 text-black font-semibold"
          style={{
            background:
              "linear-gradient(135deg,#00e5ff,#00bfff)",
          }}
        >

          <Plus className="h-5 w-5" />

          Add Drone

        </button>

      </div>

      {/* DRONE LIST */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {drones.map((drone) => (

          <div
            key={drone.id}
            className="rounded-3xl border border-cyan-500/10 bg-[#071120]/70 p-6 backdrop-blur-xl"
          >

            <div className="flex items-center justify-between">

              <h3 className="text-xl font-semibold text-white">
                {drone.name}
              </h3>

              <span className="text-green-400 text-sm">
                Active
              </span>

            </div>

            <div className="mt-4 space-y-2 text-slate-400">

              <p>
                Model: {drone.model}
              </p>

              <p>
                Serial: {drone.serial}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}