export type Automation = { id: string; name: string; when: string; who: string; channels: string; active: boolean; revenue30d: number; roi: number; lastRunISO: string; };
export type Audience = { id: string; name: string; desc: string; type: 'Automática diária' | 'Fixa (snapshot)'; size: number; updated: string; };
export type WaTemplate = { id: string; name: string; body: string; cta: string };
export type EmailTemplate = { id: string; name: string; subj: string; pre: string; body: string };
export type Funnel = { label: string; sent: number; delivered: number; clicks: number; conversions: number; };
export type KPI = { activeAutomations: number; revenue30d: number; roiAvg30d: number };
