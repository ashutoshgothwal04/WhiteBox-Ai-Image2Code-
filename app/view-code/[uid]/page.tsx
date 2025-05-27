"use client";
import AppHeader from "@/app/_components/AppHeader";
import Constants from "@/data/Constants";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import SelectionDetail from "../_components/SelectionDetail";
import CodeEditor from "../_components/CodeEditor";
import { toast } from "sonner";

export interface RECORD {
  id: number;
  description: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
  uid: string;
}

function ViewCode() {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const [codeResp, setCodeResp] = useState("");
  const [record, setRecord] = useState<RECORD | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (uid) {
      GetRecordInfo();
    }
  }, [uid]);

  const GetRecordInfo = async (regen = false) => {
    try {
      setIsReady(false);
      setCodeResp("");
      setLoading(true);

      const result = await axios.get("/api/wireframe-to-code?uid=" + uid);
      const resp = result.data;
      setRecord(resp);

      if (!resp?.code || regen) {
        await GenerateCode(resp);
      } else {
        setCodeResp(resp.code.resp);
        setIsReady(true);
      }
    } catch (err) {
      console.error("Failed to fetch record:", err);
      toast.error("Failed to fetch record.");
    } finally {
      setLoading(false);
    }
  };

  const GenerateCode = async (record: RECORD) => {
    try {

      setLoading(true);
 
      console.log("Sending to /api/ai-model:", {
        // description: `${record.description}:${Constants.PROMPT}`,
        description: `${Constants.PROMPT}\n\n${record.description}`,
        model: record.model,
        imageUrl: record.imageUrl,
      });

      console.log("📢 PROMPT = ", Constants.PROMPT);

      
      const res = await fetch("/api/ai-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: `${record.description}:${Constants.PROMPT}`,
          model: record.model,
          imageUrl: record.imageUrl,
        }),
      });

      if (!res.ok || !res.body) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error?.message || "Failed to generate code.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder
        .decode(value)
        .replace(/```(jsx|javascript)?/g, "") // remove markdown code fences
        .replace(/^Here(?:'|’)?s.*?\n+/i, "") // remove intro lines like "Here's a..."
        .replace(/^(.*export\s+default\s+App;)[\s\S]*$/m, "$1"); // remove everything after 'export default App;'
        // .replace(/(export\s+default\s+\w+;)[\s\S]*/g, "$1") // remove everything after 'export default App;'
        // .replace(/export\s+default\s+\w+;\s*/g, ""); // remove 'export default App;'
      

      fullText += text;
      setCodeResp((prev) => prev + text);
      }

      setIsReady(true);
    } catch (error: any) {
      console.error("Streaming error:", error);
      toast.error(error.message || "Error generating code.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (codeResp && record?.uid && isReady && !record?.code) {
      UpdateCodeToDb();
    }
  }, [codeResp, record, isReady]);

  const UpdateCodeToDb = async () => {
    try {
      if (!record?.uid) return;

      const result = await axios.put("/api/wireframe-to-code", {
        uid: record.uid,
        codeResp: { resp: codeResp },
      });

      console.log("Code saved:", result.data);
    } catch (err) {
      console.error("Failed to update DB:", err);
      toast.error("Failed to update database.");
    }
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        <div>
          <SelectionDetail
            record={record}
            regenrateCode={() => GetRecordInfo(true)}
            isReady={isReady}
          />
        </div>
        <div className="col-span-4">
          {loading ? (
            <div className="flex items-center justify-center bg-slate-100 h-[80vh] rounded-xl p-20">
              <h2 className="font-bold text-2xl flex gap-3 items-center">
                <Loader2 className="animate-spin" /> Analyzing the Wireframe...
              </h2>
            </div>
          ) : (
            <CodeEditor codeResp={codeResp} isReady={isReady} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
