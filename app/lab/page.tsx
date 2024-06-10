import { useState } from "react";

export default function LabPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  return <div>Lab Page</div>;
}
