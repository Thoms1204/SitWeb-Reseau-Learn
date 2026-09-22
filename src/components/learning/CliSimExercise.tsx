"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, CheckCircle2, XCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface CliSimExerciseProps {
  exercise: {
    id: number;
    questionData: Record<string, unknown>;
  };
  onSubmit: (answer: string[]) => void;
}

export function CliSimExercise({ exercise, onSubmit }: CliSimExerciseProps) {
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const data = exercise.questionData as {
    scenario: string;
    expectedCommands: string[];
    simulatedOutputs: Record<string, string>;
  };

  useEffect(() => {
    // Focus terminal input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Scroll to bottom on history change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const cmd = currentCommand.trim();
    const output = data.simulatedOutputs[cmd] || `Command not found or not supported in this simulation: ${cmd}`;
    
    setHistory((prev) => [...prev, { command: cmd, output }]);
    setCurrentCommand("");
    
    // Check if expected commands are met
    const enteredCommands = [...history.map(h => h.command), cmd];
    const isComplete = data.expectedCommands.every(expectedCmd => 
      enteredCommands.includes(expectedCmd)
    );

    if (isComplete) {
      setTimeout(() => {
        onSubmit(enteredCommands);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
        <h3 className="mb-2 font-semibold">Terminal Cisco IOS (Simulation)</h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          {data.scenario}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl bg-slate-900 shadow-inner">
        <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-2">
          <Terminal className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-mono text-slate-400">Router#</span>
          <div className="ml-auto flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="h-64 overflow-y-auto p-4 font-mono text-sm text-slate-300"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="mb-4 text-slate-500">
            Cisco IOS Software, C2960 Software, Version 15.0(2)SE
            <br />
            Copyright (c) 1986-2023 by Cisco Systems, Inc.
          </div>

          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              <div className="flex gap-2">
                <span className="text-primary-400">Router#</span>
                <span>{entry.command}</span>
              </div>
              <div className="mt-1 whitespace-pre-wrap text-slate-400">
                {entry.output}
              </div>
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex gap-2">
            <span className="text-primary-400">Router#</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              className="flex-1 bg-transparent outline-none focus:ring-0"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => onSubmit(history.map(h => h.command))}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--muted)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--border)]"
        >
          <Send className="h-4 w-4" />
          Soumettre la séquence
        </button>
      </div>
    </div>
  );
}
