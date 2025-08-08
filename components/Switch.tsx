export default function Switch({ checked, onChange }: { checked: boolean; onChange: (v:boolean)=>void }) {
  return (
    <button type="button" onClick={()=>onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full border transition ${checked ? 'bg-azure-500 border-azure-500' : 'bg-gray-200 border-gray-300'}`}
      aria-pressed={checked}>
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  );
}
