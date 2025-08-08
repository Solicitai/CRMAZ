export type Order = { id:string; date:string; customer:string; email:string; total:number; status:'pago'|'pendente'|'cancelado'; source:'Shopify'|'Yampi'; };
export type Cart = { id:string; started:string; customer:string; email:string; value:number; items:number; status:'abandonado'|'recuperado'; source:'Shopify'|'Yampi'; };
export type KPI = { activeAutomations:number; revenue30d:number; roiAvg30d:number };
